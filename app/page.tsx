"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, parse, isValid, isAfter, isBefore, addMonths } from "date-fns"
import { CalendarIcon, HelpCircle, AlertTriangle, Clock, ChevronRight, ChevronLeft, Info } from "lucide-react"
import { CountrySelect } from "./country-select"
import { countriesData, getBaseCountryCode } from "./data/countries"
import { calculateDeadlines } from "./utils/date-calculator"
import { CustomCalendar } from "./components/custom-calendar"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import {
  WipoInfoPopup,
  EuipoInfoPopup,
  AripoInfoPopup,
  OapiInfoPopup,
  BoipInfoPopup,
  GccInfoPopup,
  DirectInfoPopup,
} from "./components/info-popups"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  wipoMemberCountries,
  euipoMemberCountries,
  aripoMemberCountries,
  oapiMemberCountries,
  boipMemberCountries,
  gccMemberCountries,
} from "./data/countries/common-rules"

// Importiere die Funktionen aus common-rules.ts
import { getUsageProofRequirement, getUsageDeclarationRequirement } from "./data/countries/common-rules"

export default function TrademarkDeadlineCalculator() {
  // Schritte im Formular
  const [currentStep, setCurrentStep] = useState(1)

  // Länderdaten
  const [countryCode, setCountryCode] = useState("")
  const [country, setCountry] = useState<any>(null)

  // Anmeldungstyp
  const [isFirstFiling, setIsFirstFiling] = useState<string | null>(null)
  const [filingType, setFilingType] = useState<string | null>(null)

  // Datumseingaben
  const [applicationDate, setApplicationDate] = useState<Date | undefined>()
  const [applicationDateInput, setApplicationDateInput] = useState("")
  const [registrationDate, setRegistrationDate] = useState<Date | undefined>()
  const [registrationDateInput, setRegistrationDateInput] = useState("")

  // Datumspicker Status
  const [applicationDateOpen, setApplicationDateOpen] = useState(false)
  const [registrationDateOpen, setRegistrationDateOpen] = useState(false)

  // Warnungen
  const [showApplicationDateWarning, setShowApplicationDateWarning] = useState(false)
  const [showRegistrationDateWarning, setShowRegistrationDateWarning] = useState(false)

  // Ergebnisse
  const [results, setResults] = useState<any>(null)

  // Info-Popups
  const [showWipoPopup, setShowWipoPopup] = useState(false)
  const [showEuipoPopup, setShowEuipoPopup] = useState(false)
  const [showAripoPopup, setShowAripoPopup] = useState(false)
  const [showOapiPopup, setShowOapiPopup] = useState(false)
  const [showBoipInfoPopup, setShowBoipInfoPopup] = useState(false)
  const [showGccPopup, setShowGccPopup] = useState(false)
  const [showDirectPopup, setShowDirectPopup] = useState(false)

  // Wenn Land ausgewählt wird, setze das Land-Objekt
  const handleCountrySelect = (value: string) => {
    setCountryCode(value)
    setCountry(countriesData.find((c) => c.code === value))
    setResults(null)

    // Zurücksetzen der Auswahlen, wenn das Land geändert wird
    setIsFirstFiling(null)
    setFilingType(null)
    setApplicationDate(undefined)
    setApplicationDateInput("")
    setRegistrationDate(undefined)
    setRegistrationDateInput("")
  }

  // Prüfe, ob das Land Mitglied einer Organisation ist
  const isCountryMemberOf = (organization: string) => {
    if (!country) return false

    switch (organization) {
      case "wipo":
        return wipoMemberCountries.includes(country.code)
      case "euipo":
        return euipoMemberCountries.includes(country.code)
      case "aripo":
        return aripoMemberCountries.includes(country.code)
      case "oapi":
        return oapiMemberCountries.includes(country.code)
      case "boip":
        return boipMemberCountries.includes(country.code)
      case "gcc":
        return gccMemberCountries.includes(country.code)
      default:
        return false
    }
  }

  // Verfügbare Organisationen für das ausgewählte Land
  const getAvailableOrganizations = () => {
    if (!country) return []

    const organizations = []

    if (isCountryMemberOf("wipo")) organizations.push({ id: "wipo", name: "WIPO (Internationale Registrierung)" })
    if (isCountryMemberOf("euipo")) organizations.push({ id: "euipo", name: "EUIPO (Unionsmarke)" })
    if (isCountryMemberOf("aripo")) organizations.push({ id: "aripo", name: "ARIPO" })
    if (isCountryMemberOf("oapi")) organizations.push({ id: "oapi", name: "OAPI" })
    if (isCountryMemberOf("boip")) organizations.push({ id: "boip", name: "BOIP (Benelux)" })
    if (isCountryMemberOf("gcc")) organizations.push({ id: "gcc", name: "GCC" })

    return organizations
  }

  const handleApplicationDateInput = (value: string) => {
    // Entferne alle Nicht-Ziffern aus der Eingabe
    const digitsOnly = value.replace(/\D/g, "")

    // Formatiere die Eingabe mit Punkten
    let formattedValue = ""
    if (digitsOnly.length > 0) {
      // Füge die ersten beiden Ziffern hinzu (Tag)
      formattedValue = digitsOnly.substring(0, Math.min(2, digitsOnly.length))

      // Füge einen Punkt und die nächsten beiden Ziffern hinzu (Monat)
      if (digitsOnly.length > 2) {
        formattedValue += "." + digitsOnly.substring(2, Math.min(4, digitsOnly.length))

        // Füge einen weiteren Punkt und die restlichen Ziffern hinzu (Jahr)
        if (digitsOnly.length > 4) {
          formattedValue += "." + digitsOnly.substring(4, Math.min(8, digitsOnly.length))
        }
      }
    }

    // Aktualisiere den Eingabewert
    setApplicationDateInput(formattedValue)

    // Versuche, das Datum zu parsen, wenn es vollständig ist
    if (digitsOnly.length === 8) {
      try {
        const day = digitsOnly.substring(0, 2)
        const month = digitsOnly.substring(2, 4)
        const year = digitsOnly.substring(4, 8)
        const dateString = `${day}.${month}.${year}`

        const parsedDate = parse(dateString, "dd.MM.yyyy", new Date())
        if (isValid(parsedDate)) {
          // Prüfe, ob das Datum in der Zukunft liegt
          if (isAfter(parsedDate, new Date())) {
            setShowApplicationDateWarning(true)
          } else {
            setShowApplicationDateWarning(false)
          }
          setApplicationDate(parsedDate)
        }
      } catch (error) {
        // Ungültiges Datum, nichts tun
      }
    }
  }

  const handleRegistrationDateInput = (value: string) => {
    // Entferne alle Nicht-Ziffern aus der Eingabe
    const digitsOnly = value.replace(/\D/g, "")

    // Formatiere die Eingabe mit Punkten
    let formattedValue = ""
    if (digitsOnly.length > 0) {
      // Füge die ersten beiden Ziffern hinzu (Tag)
      formattedValue = digitsOnly.substring(0, Math.min(2, digitsOnly.length))

      // Füge einen Punkt und die nächsten beiden Ziffern hinzu (Monat)
      if (digitsOnly.length > 2) {
        formattedValue += "." + digitsOnly.substring(2, Math.min(4, digitsOnly.length))

        // Füge einen weiteren Punkt und die restlichen Ziffern hinzu (Jahr)
        if (digitsOnly.length > 4) {
          formattedValue += "." + digitsOnly.substring(4, Math.min(8, digitsOnly.length))
        }
      }
    }

    // Aktualisiere den Eingabewert
    setRegistrationDateInput(formattedValue)

    // Versuche, das Datum zu parsen, wenn es vollständig ist
    if (digitsOnly.length === 8) {
      try {
        const day = digitsOnly.substring(0, 2)
        const month = digitsOnly.substring(2, 4)
        const year = digitsOnly.substring(4, 8)
        const dateString = `${day}.${month}.${year}`

        const parsedDate = parse(dateString, "dd.MM.yyyy", new Date())
        if (isValid(parsedDate)) {
          // Prüfe, ob das Datum in der Zukunft liegt
          if (isAfter(parsedDate, new Date())) {
            setShowRegistrationDateWarning(true)
          } else {
            setShowRegistrationDateWarning(false)
          }
          setRegistrationDate(parsedDate)
        }
      } catch (error) {
        // Ungültiges Datum, nichts tun
      }
    }
  }

  // Ändere die handleCalculate Funktion, um die Funktionen aus common-rules.ts zu verwenden
  const handleCalculate = () => {
    if (!country) {
      alert("Bitte wählen Sie ein Land aus.")
      return
    }

    // Bestimme, welches Datum benötigt wird basierend auf Land und Anmeldungstyp
    if (filingType === "wipo") {
      if (!registrationDate) {
        alert("Bitte geben Sie das Eintragungsdatum ein.")
        return
      }
    } else if (country.calculationBasis === "application" && !applicationDate) {
      alert("Bitte geben Sie das Anmeldedatum ein.")
      return
    } else if (country.calculationBasis === "registration" && !registrationDate) {
      alert("Bitte geben Sie das Eintragungsdatum ein.")
      return
    }

    // Überprüfe, ob Benutzungsnachweise und -erklärungen erforderlich sind
    const usageProofRequirementStatus = getUsageProofRequirement(country.code)
    const usageDeclarationRequirementStatus = getUsageDeclarationRequirement(country.code)

    // Aktualisiere das country-Objekt mit den korrekten Werten
    const updatedCountry = {
      ...country,
      usageProofRequired: usageProofRequirementStatus !== "not_required",
      usageDeclarationRequired: usageDeclarationRequirementStatus !== "not_required",
    }

    const calculationResult = calculateDeadlines(updatedCountry, applicationDate, registrationDate, filingType)

    if (calculationResult) {
      setResults(calculationResult)
    } else {
      alert("Bei der Berechnung ist ein Fehler aufgetreten. Bitte überprüfen Sie Ihre Eingaben.")
    }
  }

  const handleInfoClick = () => {
    if (!country) return

    // Extrahiere den Basistyp aus dem erweiterten Code
    const baseType = country.registrationType

    // Bestimme den Registrierungstyp basierend auf dem Code oder dem Basistyp
    const baseCode = getBaseCountryCode(country.code)

    // Spezielle Fälle für bestimmte Codes
    if (baseCode === "IB" || baseCode === "WIPO") {
      setShowWipoPopup(true)
      return
    }
    if (baseCode === "EM" || baseCode === "EU") {
      setShowEuipoPopup(true)
      return
    }
    if (baseCode === "AP" || baseCode === "ARIPO") {
      setShowAripoPopup(true)
      return
    }
    if (baseCode === "OA" || baseCode === "OAPI") {
      setShowOapiPopup(true)
      return
    }
    if (baseCode === "BX" || baseCode === "BOIP") {
      setShowBoipInfoPopup(true)
      return
    }
    if (baseCode === "GC" || baseCode === "GCC") {
      setShowGccPopup(true)
      return
    }

    // Standardfall basierend auf dem Registrierungstyp
    switch (baseType) {
      case "wipo":
        setShowWipoPopup(true)
        break
      case "euipo":
        setShowEuipoPopup(true)
        break
      case "aripo":
        setShowAripoPopup(true)
        break
      case "oapi":
        setShowOapiPopup(true)
        break
      case "boip":
        setShowBoipInfoPopup(true)
        break
      case "gcc":
        setShowGccPopup(true)
        break
      case "direct":
      default:
        setShowDirectPopup(true)
        break
    }
  }

  // Hilfsfunktion zur Bestimmung des Fristenstatus
  const getDeadlineStatus = (dateString: string) => {
    if (!dateString || dateString === "Nicht erforderlich") return "normal"

    const date = parse(dateString, "dd.MM.yyyy", new Date())
    const today = new Date()
    const threeMonthsFromNow = addMonths(today, 3)
    const sixMonthsFromNow = addMonths(today, 6)

    if (isBefore(date, today)) {
      return "expired" // Frist abgelaufen
    } else if (isBefore(date, threeMonthsFromNow)) {
      return "critical" // Kritisch - weniger als 3 Monate
    } else if (isBefore(date, sixMonthsFromNow)) {
      return "warning" // Warnung - weniger als 6 Monate
    } else {
      return "normal" // mehr als 6 Monate
    }
  }

  // Hilfsfunktion zur Bestimmung der Textfarbe basierend auf dem Status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "expired":
        return "text-red-600 dark:text-red-400 font-bold"
      case "critical":
        return "text-orange-600 dark:text-orange-400 font-bold"
      case "warning":
        return "text-amber-600 dark:text-amber-400"
      default:
        return "text-green-600 dark:text-green-500"
    }
  }

  // Hilfsfunktion zur Bestimmung des Icons basierend auf dem Status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "expired":
        return <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 inline-block mr-1" />
      case "critical":
        return <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400 inline-block mr-1" />
      case "warning":
        return <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 inline-block mr-1" />
      default:
        return null
    }
  }

  // Berechne Prioritätsfrist
  const calculatePriorityDeadline = () => {
    if (!applicationDate || !country) return null

    // Standard-Prioritätsfrist ist 6 Monate
    const priorityMonths = country.priorityDeadlineMonths || 6
    const priorityDeadline = addMonths(applicationDate, priorityMonths)

    return {
      months: priorityMonths,
      date: format(priorityDeadline, "dd.MM.yyyy"),
    }
  }

  // Nächster Schritt
  const goToNextStep = () => {
    // Validierung für jeden Schritt
    if (currentStep === 1 && !country) {
      alert("Bitte wählen Sie ein Land aus.")
      return
    }

    if (currentStep === 2 && isFirstFiling === null) {
      alert("Bitte wählen Sie aus, ob es sich um eine Erstanmeldung handelt.")
      return
    }

    if (currentStep === 3 && filingType === null) {
      alert("Bitte wählen Sie die Art der Anmeldung aus.")
      return
    }

    if (currentStep === 4) {
      if (country?.calculationBasis === "application" && !applicationDate) {
        alert("Bitte geben Sie das Anmeldedatum ein.")
        return
      } else if (country?.calculationBasis === "registration" && !registrationDate) {
        alert("Bitte geben Sie das Eintragungsdatum ein.")
        return
      }

      // Berechne die Fristen
      handleCalculate()
    }

    setCurrentStep(currentStep + 1)
  }

  // Vorheriger Schritt
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  // Funktion zum Abrufen des Anmeldungstyps als Text
  const getFilingTypeText = () => {
    if (!filingType) return "Direkte Anmeldung"

    switch (filingType) {
      case "wipo":
        return "WIPO (Internationale Registrierung)"
      case "euipo":
        return "EUIPO (Unionsmarke)"
      case "aripo":
        return "ARIPO"
      case "oapi":
        return "OAPI"
      case "boip":
        return "BOIP (Benelux)"
      case "gcc":
        return "GCC"
      case "direct":
      default:
        return "Direkte Anmeldung"
    }
  }

  // Rendere den aktuellen Schritt
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Schritt 1: Land auswählen</h2>
            <div className="flex gap-3">
              <CountrySelect value={countryCode} onChange={handleCountrySelect} />
              {country && (
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <HelpCircle className="h-4 w-4" onClick={handleInfoClick} />
                </Button>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Schritt 2: Erstanmeldung?</h2>
            <RadioGroup value={isFirstFiling || ""} onValueChange={setIsFirstFiling} className="mt-4">
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="first-filing-yes" />
                  <Label htmlFor="first-filing-yes">Ja, es ist eine Erstanmeldung</Label>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-3">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-800 text-sm">Erstanmeldung</h3>
                      <p className="text-xs">
                        Eine Erstanmeldung ist die allererste Anmeldung einer Marke. Sie begründet das Prioritätsrecht,
                        das es ermöglicht, innerhalb von 6 Monaten in anderen Ländern unter Wahrung des Anmeldedatums
                        der Erstanmeldung weitere Anmeldungen vorzunehmen.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="first-filing-no" />
                  <Label htmlFor="first-filing-no">Nein, es ist keine Erstanmeldung</Label>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-3">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-800 text-sm">Keine Erstanmeldung</h3>
                      <p className="text-xs">
                        Wenn es sich nicht um eine Erstanmeldung handelt, wurde die Marke bereits zuvor in einem anderen
                        Land angemeldet. In diesem Fall können keine Prioritätsrechte mehr geltend gemacht werden, es
                        sei denn, die Anmeldung erfolgt innerhalb der Prioritätsfrist von 6 Monaten nach der
                        Erstanmeldung.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </RadioGroup>

            {isFirstFiling === "yes" && country?.calculationBasis === "application" && applicationDate && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-800">Prioritätsfrist:</h3>
                <p className="text-blue-700">
                  Die Prioritätsfrist für Anmeldungen in anderen Ländern endet am {calculatePriorityDeadline()?.date}(
                  {calculatePriorityDeadline()?.months} Monate nach Anmeldedatum).
                </p>
                <p className="text-blue-700 mt-2 text-sm">
                  Hinweis: Die Prioritätsfrist ist nur im ersten Schutzzyklus relevant.
                </p>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Schritt 3: Art der Anmeldung</h2>
            <p className="text-gray-600">Wie wurde die Marke angemeldet?</p>
            <RadioGroup value={filingType || ""} onValueChange={setFilingType} className="mt-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="direct" id="filing-direct" />
                <Label htmlFor="filing-direct">Direkte Anmeldung im Land</Label>
              </div>

              {getAvailableOrganizations().map((org) => (
                <div key={org.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={org.id} id={`filing-${org.id}`} />
                  <Label htmlFor={`filing-${org.id}`}>Über {org.name}</Label>
                </div>
              ))}
            </RadioGroup>

            {getAvailableOrganizations().length === 0 && (
              <div className="mt-4 p-4 bg-amber-50 rounded-md">
                <p className="text-amber-700">
                  Für dieses Land sind keine internationalen Organisationen verfügbar. Die Anmeldung erfolgt direkt im
                  Land.
                </p>
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Schritt 4: Datum eingeben</h2>
            {/* Bestimme, welches Datum benötigt wird basierend auf Land und Anmeldungstyp */}
            {country?.calculationBasis === "application" && filingType !== "wipo" ? (
              <div>
                <Label htmlFor="applicationDate" className="mb-3 block font-medium text-lg">
                  Anmeldedatum
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="applicationDate"
                    placeholder="DD.MM.YYYY"
                    value={applicationDateInput}
                    onChange={(e) => handleApplicationDateInput(e.target.value)}
                    className="flex-1 text-lg h-9"
                  />
                  <Popover open={applicationDateOpen} onOpenChange={setApplicationDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-9 w-9 p-0"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <CustomCalendar
                        selected={applicationDate}
                        onSelect={(date) => {
                          setApplicationDate(date)
                          setApplicationDateInput(format(date, "dd.MM.yyyy"))
                          setApplicationDateOpen(false)
                          // Prüfe, ob das Datum in der Zukunft liegt
                          if (isAfter(date, new Date())) {
                            setShowApplicationDateWarning(true)
                          } else {
                            setShowApplicationDateWarning(false)
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="mt-2 text-base text-gray-500">Eingabe mit oder ohne Punkte möglich</div>
                {showApplicationDateWarning && (
                  <Alert variant="destructive" className="mt-3">
                    <AlertDescription className="text-base">
                      Sind Sie sicher, dass Sie ein korrektes Datum eingegeben haben? Das eingegebene Datum liegt in der
                      Zukunft.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <div>
                <Label htmlFor="registrationDate" className="mb-3 block font-medium text-lg">
                  Eintragungsdatum
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="registrationDate"
                    placeholder="DD.MM.YYYY"
                    value={registrationDateInput}
                    onChange={(e) => handleRegistrationDateInput(e.target.value)}
                    className="flex-1 text-lg h-9"
                  />
                  <Popover open={registrationDateOpen} onOpenChange={setRegistrationDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-9 w-9 p-0"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <CustomCalendar
                        selected={registrationDate}
                        onSelect={(date) => {
                          setRegistrationDate(date)
                          setRegistrationDateInput(format(date, "dd.MM.yyyy"))
                          setRegistrationDateOpen(false)
                          // Prüfe, ob das Datum in der Zukunft liegt
                          if (isAfter(date, new Date())) {
                            setShowRegistrationDateWarning(true)
                          } else {
                            setShowRegistrationDateWarning(false)
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="mt-2 text-base text-gray-500">Eingabe mit oder ohne Punkte möglich</div>
                {showRegistrationDateWarning && (
                  <Alert variant="destructive" className="mt-3">
                    <AlertDescription className="text-base">
                      Sind Sie sicher, dass Sie ein korrektes Datum eingegeben haben? Das eingegebene Datum liegt in der
                      Zukunft.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Hinweise zur Anmeldungsart */}
            {filingType && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-800">Hinweis zur Anmeldung über {filingType.toUpperCase()}:</h3>
                <p className="text-blue-700">
                  {filingType === "wipo" &&
                    "Bei einer Anmeldung über WIPO wird das WIPO-Registrierungsdatum für die Berechnung verwendet, auch wenn das Land normalerweise das Anmeldedatum verwendet."}
                  {filingType === "euipo" &&
                    "Bei einer Anmeldung über EUIPO wird das EUIPO-Anmeldedatum für die Berechnung verwendet."}
                  {filingType === "aripo" &&
                    "Bei einer Anmeldung über ARIPO wird das ARIPO-Anmeldedatum für die Berechnung verwendet."}
                  {filingType === "oapi" &&
                    "Bei einer Anmeldung über OAPI wird das OAPI-Anmeldedatum für die Berechnung verwendet."}
                  {filingType === "boip" &&
                    "Bei einer Anmeldung über BOIP wird das BOIP-Anmeldedatum für die Berechnung verwendet."}
                  {filingType === "gcc" &&
                    "Bei einer Anmeldung über GCC wird das GCC-Anmeldedatum für die Berechnung verwendet."}
                  {filingType === "direct" &&
                    `Bei einer direkten Anmeldung wird das ${country?.calculationBasis === "application" ? "Anmeldedatum" : "Eintragungsdatum"} für die Berechnung verwendet.`}
                </p>
              </div>
            )}
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Ergebnisse</h2>

            {/* Neue kompakte Übersicht am Anfang */}
            <Card className="bg-blue-50 dark:bg-blue-900 shadow-md">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Info className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-800">Land:</span>
                    </div>
                    <div className="ml-6 text-blue-700">
                      {country?.country} ({country?.code})
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Info className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-800">Anmeldungsart:</span>
                    </div>
                    <div className="ml-6 text-blue-700">{getFilingTypeText()}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Info className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-800">Berechnungsbasis:</span>
                    </div>
                    <div className="ml-6 text-blue-700">
                      {filingType === "wipo"
                        ? "Eintragungsdatum (WIPO)"
                        : country?.calculationBasis === "application"
                          ? "Anmeldedatum"
                          : "Eintragungsdatum"}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Info className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-800">Datum:</span>
                    </div>
                    <div className="ml-6 text-blue-700">
                      {filingType === "wipo"
                        ? registrationDateInput
                        : country?.calculationBasis === "application"
                          ? applicationDateInput
                          : registrationDateInput}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Aktueller Zyklus */}
            <Card className="bg-gray-50 dark:bg-gray-900 shadow-md">
              <CardContent className="p-4">
                <div className="text-base font-semibold">
                  Aktueller Schutzzyklus <span className="inline-block">{results.currentCycle}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {results.cycleStartDate} - {results.cycleEndDate}
                </p>
                {results.hasDifferentCycles && (
                  <div className="mt-1 text-blue-600 text-xs">
                    Hinweis: Dieses Land hat unterschiedliche Anforderungen in verschiedenen Schutzzyklen.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Prioritätsfrist (nur bei Erstanmeldung und im ersten Zyklus) */}
            {isFirstFiling === "yes" && country?.calculationBasis === "application" && results.currentCycle === 1 && (
              <Card className="bg-blue-50 dark:bg-blue-900 shadow-md">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-base font-semibold text-blue-800 dark:text-blue-200">Prioritätsfrist:</div>
                    <div className="text-base font-bold text-blue-700 dark:text-blue-300">
                      {calculatePriorityDeadline()?.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Verlängerungsfristen */}
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Verlängerungsfristen</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Schutzdauer:</span>
                    <span>{results.protectionPeriod}</span>
                  </div>

                  {/* Verlängerung möglich ab */}
                  {(() => {
                    const status = getDeadlineStatus(results.renewalStartDate)
                    return (
                      <div className="flex justify-between text-sm">
                        <span>Verlängerung möglich ab:</span>
                        <span className={cn(getStatusColor(status))}>
                          {getStatusIcon(status)}
                          {results.renewalStartDate}
                        </span>
                      </div>
                    )
                  })()}

                  {/* Verlängerung regulär bis */}
                  {(() => {
                    const status = getDeadlineStatus(results.renewalDeadlineDate)
                    return (
                      <div className="flex justify-between text-sm">
                        <span>Verlängerung regulär bis:</span>
                        <span className={cn(getStatusColor(status))}>
                          {getStatusIcon(status)}
                          {results.renewalDeadlineDate}
                        </span>
                      </div>
                    )
                  })()}

                  {/* Verlängerung mit Zuschlag bis */}
                  {(() => {
                    const status = getDeadlineStatus(results.lateRenewalDate)
                    return (
                      <div className="flex justify-between text-sm">
                        <span>Verlängerung mit Zuschlag bis:</span>
                        <span className={cn(getStatusColor(status))}>
                          {getStatusIcon(status)}
                          {results.lateRenewalDate}
                        </span>
                      </div>
                    )
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Benutzungsnachweise (nur wenn erforderlich) */}
            {results.usageProofRequired === "Ja" && (
              <Card className="shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Benutzungsnachweise</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Art:</span>
                      <span>{results.usageProofType}</span>
                    </div>

                    {/* Benutzungsnachweis möglich ab */}
                    {results.usageProofStartDate !== "Nicht erforderlich" ? (
                      <>
                        {(() => {
                          const status = getDeadlineStatus(results.usageProofStartDate)
                          return (
                            <div className="flex justify-between text-sm">
                              <span>Einreichung möglich ab:</span>
                              <span className={cn(getStatusColor(status))}>
                                {getStatusIcon(status)}
                                {results.usageProofStartDate}
                              </span>
                            </div>
                          )
                        })()}

                        {/* Benutzungsnachweis regulär bis */}
                        {(() => {
                          const status = getDeadlineStatus(results.usageProofDeadlineDate)
                          return (
                            <div className="flex justify-between text-sm">
                              <span>Einreichung regulär bis:</span>
                              <span className={cn(getStatusColor(status))}>
                                {getStatusIcon(status)}
                                {results.usageProofDeadlineDate}
                              </span>
                            </div>
                          )
                        })()}

                        {/* Benutzungsnachweis mit Zuschlag bis */}
                        {results.usageProofLateDate !== "Nicht erforderlich" &&
                          (() => {
                            const status = getDeadlineStatus(results.usageProofLateDate)
                            return (
                              <div className="flex justify-between text-sm">
                                <span>Einreichung mit Zuschlag bis:</span>
                                <span className={cn(getStatusColor(status))}>
                                  {getStatusIcon(status)}
                                  {results.usageProofLateDate}
                                </span>
                              </div>
                            )
                          })()}
                      </>
                    ) : (
                      <div className="text-amber-600 text-sm">
                        Keine Benutzungsnachweise im aktuellen Zyklus fällig.
                      </div>
                    )}

                    {/* Hinweise für bestimmte Länder */}
                    {country?.code === "US" && (
                      <div className="mt-3 p-2 bg-blue-50 rounded-md text-blue-700 text-xs">
                        <p>
                          In den USA ist ein Benutzungsnachweis bei jeder Verlängerung (10., 20., 30. Jahr usw.)
                          erforderlich.
                        </p>
                      </div>
                    )}
                    {country?.code === "EM" && (
                      <div className="mt-3 p-2 bg-blue-50 rounded-md text-blue-700 text-xs">
                        <p>
                          Bei EU-Marken kann ein Benutzungsnachweis nach 5 Jahren verlangt werden, wenn die Marke
                          angegriffen wird.
                        </p>
                      </div>
                    )}
                    {country?.code === "DE" && (
                      <div className="mt-3 p-2 bg-blue-50 rounded-md text-blue-700 text-xs">
                        <p>
                          In Deutschland muss ein Benutzungsnachweis nur auf Anfrage erbracht werden, wenn die Marke
                          angegriffen wird oder bei einem Widerspruchsverfahren.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benutzungserklärungen (nur wenn erforderlich) */}
            {results.usageDeclarationRequired === "Ja" && (
              <Card className="shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Benutzungserklärungen</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Art:</span>
                      <span>{results.usageDeclarationType}</span>
                    </div>

                    {results.usageDeclarationDates.length === 0 ? (
                      <div className="text-amber-600 text-sm">
                        Keine Benutzungserklärungen im aktuellen Zyklus fällig.
                      </div>
                    ) : (
                      <>
                        <div className="text-sm font-medium mt-2 text-blue-600">
                          Fällige Erklärungen im aktuellen Zyklus ({results.currentCycle}):
                        </div>

                        {/* Wenn es nur eine Erklärung gibt oder wenn es sich um die USA im zweiten oder höheren Zyklus handelt */}
                        {results.usageDeclarationDates.length === 1 ||
                        (country?.code === "US" && results.currentCycle > 1) ? (
                          <div className="space-y-2 mt-2 border-t pt-2">
                            {/* Benutzungserklärung möglich ab */}
                            {(() => {
                              const dateSet = results.usageDeclarationDates[0]
                              const status = getDeadlineStatus(dateSet.startDate)
                              return (
                                <div className="flex justify-between text-sm">
                                  <span>Einreichung möglich ab:</span>
                                  <span className={cn(getStatusColor(status))}>
                                    {getStatusIcon(status)}
                                    {dateSet.startDate}
                                  </span>
                                </div>
                              )
                            })()}

                            {/* Benutzungserklärung regulär bis */}
                            {(() => {
                              const dateSet = results.usageDeclarationDates[0]
                              const status = getDeadlineStatus(dateSet.deadlineDate)
                              return (
                                <div className="flex justify-between text-sm">
                                  <span>Einreichung regulär bis:</span>
                                  <span className={cn(getStatusColor(status))}>
                                    {getStatusIcon(status)}
                                    {dateSet.deadlineDate}
                                  </span>
                                </div>
                              )
                            })()}

                            {/* Benutzungserklärung mit Zuschlag bis */}
                            {(() => {
                              const dateSet = results.usageDeclarationDates[0]
                              const status = getDeadlineStatus(dateSet.lateDate)
                              return (
                                <div className="flex justify-between text-sm">
                                  <span>Einreichung mit Zuschlag bis:</span>
                                  <span className={cn(getStatusColor(status))}>
                                    {getStatusIcon(status)}
                                    {dateSet.lateDate}
                                  </span>
                                </div>
                              )
                            })()}
                          </div>
                        ) : (
                          // Wenn es mehrere unterschiedliche Erklärungen gibt
                          results.usageDeclarationDates.map((dateSet: any, index: number) => (
                            <div key={index} className="space-y-2 mt-2 border-t pt-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Erklärung {index + 1}:</span>
                              </div>

                              {/* Benutzungserklärung möglich ab */}
                              {(() => {
                                const status = getDeadlineStatus(dateSet.startDate)
                                return (
                                  <div className="flex justify-between text-sm">
                                    <span>Einreichung möglich ab:</span>
                                    <span className={cn(getStatusColor(status))}>
                                      {getStatusIcon(status)}
                                      {dateSet.startDate}
                                    </span>
                                  </div>
                                )
                              })()}

                              {/* Benutzungserklärung regulär bis */}
                              {(() => {
                                const status = getDeadlineStatus(dateSet.deadlineDate)
                                return (
                                  <div className="flex justify-between text-sm">
                                    <span>Einreichung regulär bis:</span>
                                    <span className={cn(getStatusColor(status))}>
                                      {getStatusIcon(status)}
                                      {dateSet.deadlineDate}
                                    </span>
                                  </div>
                                )
                              })()}

                              {/* Benutzungserklärung mit Zuschlag bis */}
                              {(() => {
                                const status = getDeadlineStatus(dateSet.lateDate)
                                return (
                                  <div className="flex justify-between text-sm">
                                    <span>Einreichung mit Zuschlag bis:</span>
                                    <span className={cn(getStatusColor(status))}>
                                      {getStatusIcon(status)}
                                      {dateSet.lateDate}
                                    </span>
                                  </div>
                                )
                              })()}
                            </div>
                          ))
                        )}
                      </>
                    )}

                    {/* Hinweise für Länder mit zyklusabhängigen Anforderungen */}
                    {results.hasDifferentCycles && (
                      <div className="mt-3 p-2 bg-blue-50 rounded-md text-blue-700 text-xs">
                        <p className="font-medium">Hinweis zu Benutzungserklärungen:</p>
                        {country?.code === "US" && (
                          <p>
                            In den USA ist eine Benutzungserklärung im 5. Jahr nach Anmeldung und dann bei jeder
                            Verlängerung (10., 20., 30. Jahr usw.) erforderlich.
                          </p>
                        )}
                        {country?.code === "MX" && (
                          <p>
                            In Mexiko ist eine Benutzungserklärung im 3. Jahr nach Anmeldung und dann bei jeder
                            Verlängerung erforderlich.
                          </p>
                        )}
                        {country?.code === "PH" && (
                          <p>
                            Auf den Philippinen ist eine Benutzungserklärung im 3. Jahr nach Anmeldung und dann bei
                            jeder Verlängerung erforderlich.
                          </p>
                        )}
                        {country?.code === "AR" && (
                          <p>
                            In Argentinien ist eine Benutzungserklärung im 5. Jahr nach Anmeldung erforderlich. In
                            Folgezyklen sind keine regelmäßigen Erklärungen nötig.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )

      default:
        return <div className="text-center">Schritt {currentStep} wird gerendert...</div>
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Markenfristenrechner</h1>
        <p className="mt-2 text-base leading-6 text-gray-600 text-center">
          Berechnen Sie wichtige Fristen für Ihre Markenanmeldung in verschiedenen Ländern
        </p>
      </div>

      {/* Fortschrittsanzeige */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                currentStep === step
                  ? "bg-blue-600 text-white"
                  : currentStep > step
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => {
                // Nur zu bereits besuchten Schritten oder dem nächsten Schritt navigieren
                if (step <= currentStep + 1) {
                  setCurrentStep(step)
                }
              }}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full">
          <div
            className="h-1.5 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 25}%` }}
          ></div>
        </div>
      </div>

      <Card className="mb-8 shadow-md">
        <CardContent className="pt-6 p-6">
          {renderStep()}

          <div className="mt-6 flex justify-between">
            {currentStep > 1 && (
              <Button onClick={goToPreviousStep} variant="outline" className="font-medium">
                <ChevronLeft className="mr-2 h-4 w-4" /> Zurück
              </Button>
            )}

            {currentStep < 5 && (
              <Button
                onClick={goToNextStep}
                className={`font-medium ${currentStep === 1 && !currentStep > 1 ? "w-full" : ""}`}
              >
                Weiter <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info-Popups */}
      <WipoInfoPopup
        open={showWipoPopup}
        onOpenChange={setShowWipoPopup}
        countryCode={countryCode}
        onClose={() => setShowWipoPopup(false)}
      />
      <EuipoInfoPopup
        open={showEuipoPopup}
        onOpenChange={setShowEuipoPopup}
        countryCode={countryCode}
        onClose={() => setShowEuipoPopup(false)}
      />
      <AripoInfoPopup
        open={showAripoPopup}
        onOpenChange={setShowAripoPopup}
        countryCode={countryCode}
        onClose={() => setShowAripoPopup(false)}
      />
      <OapiInfoPopup
        open={showOapiPopup}
        onOpenChange={setShowOapiPopup}
        countryCode={countryCode}
        onClose={() => setShowOapiPopup(false)}
      />
      <BoipInfoPopup
        open={showBoipInfoPopup}
        onOpenChange={setShowBoipInfoPopup}
        countryCode={countryCode}
        onClose={() => setShowBoipInfoPopup(false)}
      />
      <GccInfoPopup
        open={showGccPopup}
        onOpenChange={setShowGccPopup}
        countryCode={countryCode}
        onClose={() => setShowGccPopup(false)}
      />
      <DirectInfoPopup
        open={showDirectPopup}
        onOpenChange={setShowDirectPopup}
        countryCode={countryCode}
        onClose={() => setShowDirectPopup(false)}
      />
    </div>
  )
}
