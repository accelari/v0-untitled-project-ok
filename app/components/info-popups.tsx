"use client"

import { countriesData, getBaseCountryCode } from "@/app/data/countries"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { getCountryEmoji } from "@/lib/utils"

interface InfoPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  countryCode: string
  onClose: () => void
}

const getCountryName = (countryCode: string) => {
  const country = countriesData.find((c) => c.code === countryCode)
  return country ? country.country : countryCode
}

// Passe die Größen in den Info-Popups an, damit sie konsistent mit dem Rest der Anwendung sind

// Ändere die WipoInfoPopup-Komponente
export function WipoInfoPopup({ open, onOpenChange, countryCode, onClose }: InfoPopupProps) {
  const country = countriesData.find((c) => c.code === countryCode)
  const baseCountryCode = getBaseCountryCode(countryCode)
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent className="w-[300px] p-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">
            WIPO-Markenanmeldung in {getCountryEmoji(baseCountryCode)} {getCountryName(countryCode)}
          </h3>
          <p className="text-xs">
            Die Internationale Registrierung (IR) über die WIPO bietet Schutz in mehreren Ländern mit einer einzigen
            Anmeldung.
          </p>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>Schutzdauer: 10 Jahre ab Registrierungsdatum</li>
            <li>Verlängerung: 6 Monate vor Ablauf bis 6 Monate nach Ablauf (mit Zuschlag)</li>
            <li>Benutzungsnachweise: Nach den Regeln der designierten Länder</li>
          </ul>
          <Button onClick={onClose} className="mt-2 text-xs h-7 px-2">
            Schließen
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Ändere die EuipoInfoPopup-Komponente
export function EuipoInfoPopup({ open, onOpenChange, countryCode, onClose }: InfoPopupProps) {
  const country = countriesData.find((c) => c.code === countryCode)
  const baseCountryCode = getBaseCountryCode(countryCode)
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent className="w-[300px] p-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">
            EUIPO-Markenanmeldung in {getCountryEmoji(baseCountryCode)} {getCountryName(countryCode)}
          </h3>
          <p className="text-xs">Die Unionsmarke (UM) bietet Schutz in allen Mitgliedstaaten der Europäischen Union.</p>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>Schutzdauer: 10 Jahre ab Anmeldedatum</li>
            <li>Verlängerung: 6 Monate vor Ablauf bis 6 Monate nach Ablauf (mit Zuschlag)</li>
            <li>Benutzungsnachweis: Nach 5 Jahren erforderlich</li>
            <li>Benutzung in einem EU-Land ist ausreichend für den Erhalt des Schutzes in der gesamten EU</li>
          </ul>
          <Button onClick={onClose} className="mt-2 text-xs h-7 px-2">
            Schließen
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Ändere die AripoInfoPopup-Komponente
export function AripoInfoPopup({ open, onOpenChange, countryCode, onClose }: InfoPopupProps) {
  const country = countriesData.find((c) => c.code === countryCode)
  const baseCountryCode = getBaseCountryCode(countryCode)
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent className="w-[300px] p-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">
            ARIPO-Markenanmeldung in {getCountryEmoji(baseCountryCode)} {getCountryName(countryCode)}
          </h3>
          <p className="text-xs">
            Die ARIPO (African Regional Intellectual Property Organization) ermöglicht Markenschutz in mehreren
            afrikanischen Ländern.
          </p>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>
              Mitgliedsländer: Botswana, Eswatini, Gambia, Ghana, Kenia, Lesotho, Liberia, Malawi, Mozambique, Namibia,
              Rwanda, São Tomé und Príncipe, Sierra Leone, Somalia, Sudan, Tansania, Uganda, Sambia, Simbabwe
            </li>
            <li>Schutzdauer: 10 Jahre ab Anmeldedatum</li>
            <li>Verlängerung: 6 Monate vor Ablauf bis 6 Monate nach Ablauf (mit Zuschlag)</li>
            <li>Benutzungsnachweis: Nach 5 Jahren erforderlich</li>
          </ul>
          <Button onClick={onClose} className="mt-2 text-xs h-7 px-2">
            Schließen
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Ändere die OapiInfoPopup-Komponente
export function OapiInfoPopup({ open, onOpenChange, countryCode, onClose }: InfoPopupProps) {
  const country = countriesData.find((c) => c.code === countryCode)
  const baseCountryCode = getBaseCountryCode(countryCode)
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent className="w-[300px] p-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">
            OAPI-Markenanmeldung in {getCountryEmoji(baseCountryCode)} {getCountryName(countryCode)}
          </h3>
          <p className="text-xs">
            Die OAPI (Organisation Africaine de la Propriété Intellectuelle) bietet Markenschutz in 17
            französischsprachigen afrikanischen Ländern.
          </p>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>
              Mitgliedsländer: Benin, Burkina Faso, Kamerun, Zentralafrikanische Republik, Tschad, Komoren, Kongo,
              Elfenbeinküste, Äquatorialguinea, Gabun, Guinea, Guinea-Bissau, Mali, Mauretanien, Niger, Senegal, Togo
            </li>
            <li>Schutzdauer: 10 Jahre ab Anmeldedatum</li>
            <li>Verlängerung: 6 Monate vor Ablauf bis 6 Monate nach Ablauf (mit Zuschlag)</li>
            <li>Benutzungsnachweis: Nach 5 Jahren erforderlich</li>
          </ul>
          <Button onClick={onClose} className="mt-2 text-xs h-7 px-2">
            Schließen
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Ändere die BoipInfoPopup-Komponente
export function BoipInfoPopup({ open, onOpenChange, countryCode, onClose }: InfoPopupProps) {
  const country = countriesData.find((c) => c.code === countryCode)
  const baseCountryCode = getBaseCountryCode(countryCode)
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent className="w-[300px] p-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">
            BOIP-Markenanmeldung in {getCountryEmoji(baseCountryCode)} {getCountryName(countryCode)}
          </h3>
          <p className="text-xs">
            Das Benelux-Markenamt (BOIP) bietet Markenschutz in Belgien, den Niederlanden und Luxemburg.
          </p>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>Schutzdauer: 10 Jahre ab Anmeldedatum</li>
            <li>Verlängerung: 6 Monate vor Ablauf bis 6 Monate nach Ablauf (mit Zuschlag)</li>
            <li>Benutzungsnachweis: Nach 5 Jahren erforderlich</li>
            <li>Benutzung in einem Benelux-Land ist ausreichend für den Erhalt des Schutzes in allen drei Ländern</li>
          </ul>
          <Button onClick={onClose} className="mt-2 text-xs h-7 px-2">
            Schließen
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Ändere die GccInfoPopup-Komponente
export function GccInfoPopup({ open, onOpenChange, countryCode, onClose }: InfoPopupProps) {
  const country = countriesData.find((c) => c.code === countryCode)
  const baseCountryCode = getBaseCountryCode(countryCode)
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent className="w-[300px] p-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">
            GCC-Markenanmeldung in {getCountryEmoji(baseCountryCode)} {getCountryName(countryCode)}
          </h3>
          <p className="text-xs">Der Golf-Kooperationsrat (GCC) bietet Markenschutz in den Golfstaaten.</p>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>Mitgliedsländer: Bahrain, Kuwait, Oman, Katar, Saudi-Arabien, Vereinigte Arabische Emirate</li>
            <li>Schutzdauer: 10 Jahre ab Anmeldedatum</li>
            <li>Verlängerung: 6 Monate vor Ablauf bis 6 Monate nach Ablauf (mit Zuschlag)</li>
            <li>Keine Benutzungsnachweise erforderlich</li>
          </ul>
          <Button onClick={onClose} className="mt-2 text-xs h-7 px-2">
            Schließen
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Ändere die DirectInfoPopup-Komponente
export function DirectInfoPopup({ open, onOpenChange, countryCode, onClose }: InfoPopupProps) {
  const country = countriesData.find((c) => c.code === countryCode)
  const baseCountryCode = getBaseCountryCode(countryCode)
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent className="w-[300px] p-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">
            Direkte Markenanmeldung in {getCountryEmoji(baseCountryCode)} {getCountryName(countryCode)}
          </h3>
          {country && (
            <>
              <p className="text-xs">Informationen zur nationalen Markenanmeldung in {country.country}:</p>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li>
                  Schutzdauer: {country.protectionPeriod} Jahre ab{" "}
                  {country.calculationBasis === "application" ? "Anmeldedatum" : "Eintragungsdatum"}
                </li>
                <li>
                  Verlängerung: {country.renewalStartMonths} Monate vor Ablauf bis {country.lateRenewalMonths} Monate
                  nach Ablauf (mit Zuschlag)
                </li>
                {country.usageProofRequired && (
                  <li>Benutzungsnachweis: Nach {country.usageProofYears} Jahren erforderlich</li>
                )}
                {country.usageDeclarationRequired && country.usageDeclarationYears && (
                  <li>
                    Benutzungserklärung: Nach{" "}
                    {country.usageDeclarationYears.length > 1
                      ? country.usageDeclarationYears.join(" und ")
                      : country.usageDeclarationYears[0]}{" "}
                    Jahren erforderlich
                  </li>
                )}
                {!country.usageProofRequired && !country.usageDeclarationRequired && (
                  <li>Keine Benutzungsnachweise oder -erklärungen erforderlich</li>
                )}
                {/* Neue Felder aus der Tabelle */}
                {country.vertreterRequired && <li>Vertreter erforderlich: {country.vertreterRequired}</li>}
                {country.prufungsumfang && <li>Prüfungsumfang: {country.prufungsumfang}</li>}
                {country.widerspruch && <li>Widerspruchsverfahren: {country.widerspruch}</li>}
              </ul>
            </>
          )}
          <Button onClick={onClose} className="mt-2 text-xs h-7 px-2">
            Schließen
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
