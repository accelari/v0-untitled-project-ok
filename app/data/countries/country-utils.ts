// Hilfsfunktion zur Erstellung von erweiterten Ländereinträgen
export function createExtendedCountry(
  code: string,
  country: string,
  region: string,
  registrationType: "direct" | "wipo" | "euipo" | "aripo" | "oapi" | "boip" | "gcc" = "direct",
  additionalProps: Partial<any> = {},
) {
  // Vereinfachte Version, die nur die Basisdaten zurückgibt
  return {
    code,
    country,
    region,
    registrationType,
    ...additionalProps,
  }
}

// Hilfsfunktion zum Extrahieren des Ländercodes aus dem erweiterten Code
export function getBaseCountryCode(extendedCode: string): string {
  return extendedCode.split("_")[0]
}

// Hilfsfunktion zur Überprüfung der Mitgliedschaft in einer Organisation
export function isMemberOf(countryCode: string, organization: string, countries: any[]): boolean {
  const country = countries.find((c) => c.code === countryCode)
  return country?.memberOf?.includes(organization) || false
}

// Organisationsmitgliedschaften
export const ORGANIZATIONS = {
  MADRID: "madrid",
  EU: "eu",
  ARIPO: "aripo",
  OAPI: "oapi",
  BENELUX: "benelux",
  GCC: "gcc",
  ASEAN: "asean",
  AFCFTA: "afcfta",
}

// Vereinfachte Version der createCategorizedCountry-Funktion
export function createCategorizedCountry(
  code: string,
  country: string,
  region: string,
  registrationType: "direct" | "wipo" | "euipo" | "aripo" | "oapi" | "boip" | "gcc" = "direct",
  additionalProps: Partial<any> = {},
) {
  return createExtendedCountry(code, country, region, registrationType, additionalProps)
}

// Typdefinition für Filterkriterien
export type CountryFilterCriteria = {
  calculationBasis?: "application" | "registration" | "none"
  protectionPeriod?: number
  vertreterRequired?: "Ja" | "Nein" | "Ausländer" | "Basis" | "Territorial"
  usageProofRequired?: boolean
  usageDeclarationRequired?: boolean
  prufungsumfang?: "Formal" | "Formal/Absolut" | "Umfassend" | "Beschränkt" | "Territorial"
  widerspruch?: "Ja" | "Nein" | "Territorial"
  region?: string
  registrationType?: "direct" | "wipo" | "euipo" | "aripo" | "oapi" | "boip" | "gcc"
  mitgliedschaft?: string
  renewalStartMonths?: number
  renewalDeadlineMonths?: number
  lateRenewalMonths?: number
  usageProofYears?: number
}

// Funktion zum Filtern von Ländern nach Kriterien
export function filterCountries(countries: any[], criteria: CountryFilterCriteria): any[] {
  return countries.filter((country) => {
    // Prüfe jedes Kriterium
    for (const [key, value] of Object.entries(criteria)) {
      if (key === "mitgliedschaft") {
        // Spezielle Behandlung für Mitgliedschaften
        if (!country.mitgliedschaften?.includes(value)) {
          return false
        }
      } else if (country[key] !== value) {
        // Standardvergleich für andere Eigenschaften
        return false
      }
    }
    return true
  })
}

// Funktion zum Gruppieren von Ländern nach einer Eigenschaft
export function groupCountriesByProperty(countries: any[], property: string): Record<string, any[]> {
  const result: Record<string, any[]> = {}

  countries.forEach((country) => {
    const value = country[property]
    if (!result[value]) {
      result[value] = []
    }
    result[value].push(country)
  })

  return result
}

// Funktion zum Sortieren von Ländern nach einer Eigenschaft
export function sortCountriesByProperty(countries: any[], property: string, ascending = true): any[] {
  return [...countries].sort((a, b) => {
    if (a[property] < b[property]) return ascending ? -1 : 1
    if (a[property] > b[property]) return ascending ? 1 : -1
    return 0
  })
}

// Funktion zum Abrufen aller eindeutigen Werte einer Eigenschaft
export function getUniquePropertyValues(countries: any[], property: string): any[] {
  const values = new Set<any>()

  countries.forEach((country) => {
    values.add(country[property])
  })

  return Array.from(values)
}

// Funktion zum Erstellen einer Statistik über eine Eigenschaft
export function getPropertyStatistics(countries: any[], property: string): Record<string, number> {
  const stats: Record<string, number> = {}

  countries.forEach((country) => {
    const value = country[property]
    if (!stats[value]) {
      stats[value] = 0
    }
    stats[value]++
  })

  return stats
}

// Funktion zum Vergleichen von zwei Ländern
export function compareCountries(
  country1: any,
  country2: any,
  properties: string[],
): Record<string, { value1: any; value2: any; isDifferent: boolean }> {
  const result: Record<string, { value1: any; value2: any; isDifferent: boolean }> = {}

  properties.forEach((property) => {
    const value1 = country1[property]
    const value2 = country2[property]
    result[property] = {
      value1,
      value2,
      isDifferent: value1 !== value2,
    }
  })

  return result
}

// Funktion zum Abrufen von Ländern mit extremen Werten
export function getCountriesWithExtremeValues(countries: any[], property: string, extreme: "min" | "max"): any[] {
  if (countries.length === 0) return []

  // Finde den extremen Wert
  let extremeValue: any
  if (extreme === "min") {
    extremeValue = Math.min(...countries.map((country) => country[property]))
  } else {
    extremeValue = Math.max(...countries.map((country) => country[property]))
  }

  // Filtere Länder mit diesem Wert
  return countries.filter((country) => country[property] === extremeValue)
}

// Funktion zum Abrufen von Ländern mit ungewöhnlichen Werten
export function getCountriesWithUnusualValues(countries: any[], property: string): any[] {
  if (countries.length === 0) return []

  // Berechne den Durchschnitt
  const values = countries.map((country) => country[property])
  const average = values.reduce((sum, value) => sum + value, 0) / values.length

  // Berechne die Standardabweichung
  const squaredDifferences = values.map((value) => Math.pow(value - average, 2))
  const variance = squaredDifferences.reduce((sum, value) => sum + value, 0) / values.length
  const standardDeviation = Math.sqrt(variance)

  // Filtere Länder mit Werten, die mehr als 2 Standardabweichungen vom Durchschnitt entfernt sind
  return countries.filter((country) => Math.abs(country[property] - average) > 2 * standardDeviation)
}

// Funktion zum Abrufen von Ländern mit ähnlichen Eigenschaften zu einem Referenzland
export function getSimilarCountries(countries: any[], referenceCountry: any, properties: string[]): any[] {
  return countries.filter((country) => {
    if (country.code === referenceCountry.code) return false // Ausschließen des Referenzlandes selbst

    // Zähle die Anzahl der übereinstimmenden Eigenschaften
    const matchingProperties = properties.filter((property) => country[property] === referenceCountry[property])

    // Wenn mehr als die Hälfte der Eigenschaften übereinstimmen, gilt das Land als ähnlich
    return matchingProperties.length >= properties.length / 2
  })
}

// Funktion zum Abrufen von Ländern, die alle angegebenen Eigenschaften haben
export function getCountriesWithAllProperties(countries: any[], properties: Record<string, any>): any[] {
  return countries.filter((country) => {
    for (const [property, value] of Object.entries(properties)) {
      if (country[property] !== value) {
        return false
      }
    }
    return true
  })
}

// Funktion zum Abrufen von Ländern, die mindestens eine der angegebenen Eigenschaften haben
export function getCountriesWithAnyProperty(countries: any[], properties: Record<string, any>): any[] {
  return countries.filter((country) => {
    for (const [property, value] of Object.entries(properties)) {
      if (country[property] === value) {
        return true
      }
    }
    return false
  })
}

// Funktion zum Erstellen einer Übersicht über alle Länder
export function createCountrySummary(countries: any[]): Record<string, any> {
  return {
    totalCountries: countries.length,
    byRegion: groupCountriesByProperty(countries, "region"),
    byCalculationBasis: groupCountriesByProperty(countries, "calculationBasis"),
    byProtectionPeriod: groupCountriesByProperty(countries, "protectionPeriod"),
    byVertreterRequired: groupCountriesByProperty(countries, "vertreterRequired"),
    byUsageProofRequired: groupCountriesByProperty(countries, "usageProofRequired"),
    byPrufungsumfang: groupCountriesByProperty(countries, "prufungsumfang"),
    byWiderspruch: groupCountriesByProperty(countries, "widerspruch"),
    uniqueProtectionPeriods: getUniquePropertyValues(countries, "protectionPeriod"),
    uniqueRenewalStartMonths: getUniquePropertyValues(countries, "renewalStartMonths"),
    uniqueLateRenewalMonths: getUniquePropertyValues(countries, "lateRenewalMonths"),
    countriesWithLongestProtectionPeriod: getCountriesWithExtremeValues(countries, "protectionPeriod", "max"),
    countriesWithShortestProtectionPeriod: getCountriesWithExtremeValues(countries, "protectionPeriod", "min"),
    countriesWithUnusualRenewalPeriods: getCountriesWithUnusualValues(countries, "renewalStartMonths"),
  }
}
