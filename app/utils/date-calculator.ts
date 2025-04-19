import { addMonths, addYears, format, isBefore, isAfter, isSameDay } from "date-fns"
import { de } from "date-fns/locale"
// Verbessere die Implementierung der Benutzungsnachweise und -erklärungen
// Importiere die Funktionen aus common-rules.ts
import {
  getUsageProofRequirement,
  getUsageDeclarationRequirement,
  hasDifferentCycleRequirements,
  getFirstCycleRequirements,
  getSubsequentCyclesRequirements,
  getUsageProofDetails,
  getUsageDeclarationDetails,
} from "../data/countries/common-rules"

export interface CalculationResult {
  country: string
  protectionPeriod: string
  currentCycle: number
  cycleStartDate?: string
  cycleEndDate?: string
  renewalStartDate: string
  renewalDeadlineDate: string
  lateRenewalDate: string
  usageProofRequired: string
  usageProofType: string
  usageProofStartDate: string
  usageProofDeadlineDate: string
  usageProofLateDate: string
  usageDeclarationRequired: string
  usageDeclarationType: string
  usageDeclarationDates: {
    startDate: string
    deadlineDate: string
    lateDate: string
  }[]
  hasDifferentCycles?: boolean
}

// Änderung in der calculateDeadlines-Funktion, um den Anmeldungstyp zu berücksichtigen

export function calculateDeadlines(
  countryData: any,
  applicationDate?: Date,
  registrationDate?: Date,
  filingType?: string | null,
): CalculationResult | null {
  if (!countryData) return null

  // Determine which date to use based on country's calculation basis and filing type
  // Bei WIPO-Anmeldungen immer das Eintragungsdatum verwenden
  const baseDate =
    filingType === "wipo"
      ? registrationDate
      : countryData.calculationBasis === "application"
        ? applicationDate
        : registrationDate

  if (!baseDate) return null

  // Rest der Funktion bleibt unverändert
  // Calculate current protection cycle
  const currentDate = new Date()
  const yearsSinceBase = currentDate.getFullYear() - baseDate.getFullYear()
  const currentCycle = Math.floor(yearsSinceBase / countryData.protectionPeriod) + 1

  // Calculate cycle start and end dates
  const cycleStartDate = addYears(baseDate, (currentCycle - 1) * countryData.protectionPeriod)
  const cycleEndDate = addYears(baseDate, currentCycle * countryData.protectionPeriod)

  // Calculate renewal dates
  const renewalStartDate = addMonths(cycleEndDate, -countryData.renewalStartMonths)
  const renewalDeadlineDate = cycleEndDate
  const lateRenewalDate = addMonths(cycleEndDate, countryData.lateRenewalMonths)

  // Hole die korrekten Informationen zu Benutzungsnachweisen
  const usageProofRequirementStatus = getUsageProofRequirement(countryData.code)
  // Nur wenn der Status "mandatory" ist, setzen wir usageProofRequired auf true
  const usageProofRequired = usageProofRequirementStatus === "mandatory"
  const usageProofDetails = getUsageProofDetails(countryData.code)

  // Hole die korrekten Informationen zu Benutzungserklärungen
  const usageDeclarationRequirementStatus = getUsageDeclarationRequirement(countryData.code)
  // Nur wenn der Status "mandatory" ist, setzen wir usageDeclarationRequired auf true
  const usageDeclarationRequired = usageDeclarationRequirementStatus === "mandatory"
  const usageDeclarationDetails = getUsageDeclarationDetails(countryData.code)

  // Prüfe, ob das Land unterschiedliche Anforderungen in verschiedenen Zyklen hat
  const hasDifferentCycles = hasDifferentCycleRequirements(countryData.code)

  // Calculate usage proof dates if required
  let usageProofStartDate = "Nicht erforderlich"
  let usageProofDeadlineDate = "Nicht erforderlich"
  let usageProofLateDate = "Nicht erforderlich"
  let usageProofType = "Nicht erforderlich"

  if (usageProofRequired) {
    usageProofType = usageProofDetails.type || "Benutzungsnachweis"

    // Spezialfall für die USA: Benutzungsnachweise sind bei jeder Verlängerung fällig
    if (countryData.code === "US") {
      // Verwende die gleichen Daten wie für die Verlängerung
      usageProofStartDate = format(renewalStartDate, "dd.MM.yyyy", { locale: de })
      usageProofDeadlineDate = format(renewalDeadlineDate, "dd.MM.yyyy", { locale: de })
      usageProofLateDate = format(lateRenewalDate, "dd.MM.yyyy", { locale: de })
    } else {
      // Standardlogik für andere Länder
      const proofYear = usageProofDetails.deadlineYears || countryData.usageProofYears || 5

      // Berechne das absolute Jahr vom Basisdatum aus
      const absoluteYear = (currentCycle - 1) * countryData.protectionPeriod + proofYear

      // Prüfe, ob der Benutzungsnachweis in den aktuellen Schutzzyklus fällt
      if (proofYear <= countryData.protectionPeriod) {
        // Standardmäßig 6 Monate vor der Frist beginnen
        const startMonths = 6

        const deadlineDate = addYears(baseDate, absoluteYear)
        const startDate = addMonths(deadlineDate, -startMonths)
        const lateDate = addMonths(deadlineDate, 6) // Standard: 6 Monate Nachfrist

        usageProofStartDate = format(startDate, "dd.MM.yyyy", { locale: de })
        usageProofDeadlineDate = format(deadlineDate, "dd.MM.yyyy", { locale: de })
        usageProofLateDate = format(lateDate, "dd.MM.yyyy", { locale: de })
      }
    }
  }

  // Calculate usage declaration dates if required
  let usageDeclarationDates: { startDate: string; deadlineDate: string; lateDate: string }[] = []
  let usageDeclarationType = "Nicht erforderlich"

  if (usageDeclarationRequired) {
    usageDeclarationType = usageDeclarationDetails.type || "Benutzungserklärung"

    // Spezialfall für Länder mit zyklusabhängigen Anforderungen
    if (hasDifferentCycles) {
      // Hole die Anforderungen für den aktuellen Zyklus
      const cycleRequirements =
        currentCycle === 1
          ? getFirstCycleRequirements(countryData.code)
          : getSubsequentCyclesRequirements(countryData.code)

      if (cycleRequirements && cycleRequirements.years.length > 0) {
        // Berechne die Daten für jedes Jahr in diesem Zyklus
        usageDeclarationDates = cycleRequirements.years
          .filter((year) => {
            // Berechne das absolute Jahr vom Basisdatum aus
            const absoluteYear = (currentCycle - 1) * countryData.protectionPeriod + year

            // Berechne das Datum für diese Erklärung
            const declarationDate = addYears(baseDate, absoluteYear)

            // Prüfe, ob das Datum in den aktuellen Zyklus fällt
            return (
              (isBefore(declarationDate, cycleEndDate) && isAfter(declarationDate, cycleStartDate)) ||
              isSameDay(declarationDate, cycleStartDate) ||
              isSameDay(declarationDate, cycleEndDate)
            )
          })
          .map((year) => {
            // Berechne das absolute Jahr vom Basisdatum aus
            const absoluteYear = (currentCycle - 1) * countryData.protectionPeriod + year

            // Standardmäßig 6 Monate vor der Frist beginnen
            const startMonths = 6

            const deadlineDate = addYears(baseDate, absoluteYear)
            const startDate = addMonths(deadlineDate, -startMonths)
            const lateDate = addMonths(deadlineDate, 6) // Standard: 6 Monate Nachfrist

            return {
              startDate: format(startDate, "dd.MM.yyyy", { locale: de }),
              deadlineDate: format(deadlineDate, "dd.MM.yyyy", { locale: de }),
              lateDate: format(lateDate, "dd.MM.yyyy", { locale: de }),
            }
          })
      }

      // Für die USA im ersten Zyklus: 5-Jahres-Erklärung
      if (countryData.code === "US" && currentCycle === 1) {
        const fifthYear = addYears(baseDate, 5)
        const startDate = addMonths(fifthYear, -6) // 6 Monate vor dem 5. Jahr
        const sixthYear = addYears(baseDate, 6)

        // Prüfe, ob das Datum in den aktuellen Zyklus fällt
        if (
          isBefore(fifthYear, cycleEndDate) &&
          (isAfter(fifthYear, cycleStartDate) || isSameDay(fifthYear, cycleStartDate))
        ) {
          usageDeclarationDates.push({
            startDate: format(startDate, "dd.MM.yyyy", { locale: de }),
            deadlineDate: format(fifthYear, "dd.MM.yyyy", { locale: de }),
            lateDate: format(sixthYear, "dd.MM.yyyy", { locale: de }),
          })
        }
      }

      // Für die USA und andere Länder: Verlängerungsdaten als Benutzungserklärungsdaten
      if ((countryData.code === "US" || countryData.code === "MX" || countryData.code === "PH") && currentCycle > 1) {
        // Prüfe, ob die Verlängerung in den aktuellen Zyklus fällt
        if (isSameDay(renewalDeadlineDate, cycleEndDate)) {
          // Leere das Array, da wir nur eine Erklärung brauchen
          if (countryData.code === "US") {
            usageDeclarationDates = []
          }

          usageDeclarationDates.push({
            startDate: format(renewalStartDate, "dd.MM.yyyy", { locale: de }),
            deadlineDate: format(renewalDeadlineDate, "dd.MM.yyyy", { locale: de }),
            lateDate: format(lateRenewalDate, "dd.MM.yyyy", { locale: de }),
          })
        }
      }
    } else if (usageDeclarationDetails.deadlineYears) {
      // Standardlogik für andere Länder
      // Filter declaration years that fall within the current cycle
      const currentCycleYears = usageDeclarationDetails.deadlineYears.filter((year: number) => {
        // Calculate which cycle this declaration falls into
        const declarationCycle = Math.floor(year / countryData.protectionPeriod) + 1
        // Only include if it's in the current cycle
        return declarationCycle === currentCycle
      })

      // Calculate dates for the filtered years
      usageDeclarationDates = currentCycleYears.map((year: number) => {
        // Standardmäßig 6 Monate vor der Frist beginnen
        const startMonths = 6

        const deadlineDate = addYears(baseDate, year)
        const startDate = addMonths(deadlineDate, -startMonths)
        const lateDate = addMonths(deadlineDate, 6) // Standard: 6 Monate Nachfrist

        return {
          startDate: format(startDate, "dd.MM.yyyy", { locale: de }),
          deadlineDate: format(deadlineDate, "dd.MM.yyyy", { locale: de }),
          lateDate: format(lateDate, "dd.MM.yyyy", { locale: de }),
        }
      })
    }
  }

  return {
    country: countryData.country,
    protectionPeriod: `${countryData.protectionPeriod} Jahre`,
    currentCycle: currentCycle,
    cycleStartDate: format(cycleStartDate, "dd.MM.yyyy", { locale: de }),
    cycleEndDate: format(cycleEndDate, "dd.MM.yyyy", { locale: de }),
    renewalStartDate: format(renewalStartDate, "dd.MM.yyyy", { locale: de }),
    renewalDeadlineDate: format(renewalDeadlineDate, "dd.MM.yyyy", { locale: de }),
    lateRenewalDate: format(lateRenewalDate, "dd.MM.yyyy", { locale: de }),
    usageProofRequired: usageProofRequired ? "Ja" : "Nein",
    usageProofType,
    usageProofStartDate,
    usageProofDeadlineDate,
    usageProofLateDate,
    usageDeclarationRequired: usageDeclarationRequired ? "Ja" : "Nein",
    usageDeclarationType,
    usageDeclarationDates,
    hasDifferentCycles,
  }
}
