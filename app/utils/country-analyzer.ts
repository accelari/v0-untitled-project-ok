import type { CountryData } from "../data/countries"

/**
 * Filtert Länder nach verschiedenen Kriterien
 */
export function filterCountries(
  countries: CountryData[],
  filters: {
    calculationBasis?: "application" | "registration"
    protectionPeriod?: number
    renewalPeriod?: number
    usageProofRequired?: boolean
    region?: string
    registrationType?: string
    vertreterRequired?: string
    prufungsumfang?: string
    widerspruch?: string
    poaNotarization?: string
    poaApostille?: string
  },
) {
  return countries.filter((country) => {
    // Prüfe alle Filter
    if (filters.calculationBasis && country.calculationBasis !== filters.calculationBasis) return false
    if (filters.protectionPeriod && country.protectionPeriod !== filters.protectionPeriod) return false
    if (filters.renewalPeriod && country.renewalPeriod !== filters.renewalPeriod) return false
    if (filters.usageProofRequired !== undefined && country.usageProofRequired !== filters.usageProofRequired)
      return false
    if (filters.region && country.region !== filters.region) return false
    if (filters.registrationType && country.registrationType !== filters.registrationType) return false
    if (filters.vertreterRequired && country.vertreterRequired !== filters.vertreterRequired) return false
    if (filters.prufungsumfang && country.prufungsumfang !== filters.prufungsumfang) return false
    if (filters.widerspruch && country.widerspruch !== filters.widerspruch) return false
    if (filters.poaNotarization && country.poaNotarization !== filters.poaNotarization) return false
    if (filters.poaApostille && country.poaApostille !== filters.poaApostille) return false

    return true
  })
}

/**
 * Gruppiert Länder nach einem bestimmten Kriterium
 */
export function groupCountriesBy(countries: CountryData[], criterion: keyof CountryData) {
  const groups: Record<string, CountryData[]> = {}

  countries.forEach((country) => {
    const value = country[criterion]
    const key = value !== undefined ? String(value) : "Unbekannt"

    if (!groups[key]) {
      groups[key] = []
    }

    groups[key].push(country)
  })

  return groups
}

/**
 * Findet ähnliche Länder basierend auf bestimmten Eigenschaften
 */
export function findSimilarCountries(
  countries: CountryData[],
  referenceCountry: CountryData,
  properties: (keyof CountryData)[],
) {
  return countries.filter((country) => {
    if (country.code === referenceCountry.code) return false

    let matchCount = 0
    for (const prop of properties) {
      if (country[prop] === referenceCountry[prop]) {
        matchCount++
      }
    }

    // Wenn mehr als die Hälfte der Eigenschaften übereinstimmen, gilt das Land als ähnlich
    return matchCount >= properties.length / 2
  })
}

/**
 * Erstellt eine Zusammenfassung der Länderverteilung nach Region
 */
export function getRegionSummary(countries: CountryData[]) {
  const regionGroups = groupCountriesBy(countries, "region")

  return Object.entries(regionGroups).map(([region, countries]) => ({
    region,
    count: countries.length,
    percentage: (countries.length / countries.length) * 100,
  }))
}

/**
 * Erstellt eine Zusammenfassung der Berechnungsbasis-Verteilung
 */
export function getCalculationBasisSummary(countries: CountryData[]) {
  const basisGroups = groupCountriesBy(countries, "calculationBasis")

  return Object.entries(basisGroups).map(([basis, countries]) => ({
    basis,
    count: countries.length,
    percentage: (countries.length / countries.length) * 100,
  }))
}

/**
 * Findet Länder mit extremen Werten
 */
export function findExtremeCountries(countries: CountryData[]) {
  // Länder mit der längsten Schutzdauer
  const maxProtectionPeriod = Math.max(...countries.map((c) => c.protectionPeriod))
  const countriesWithLongestProtectionPeriod = countries.filter((c) => c.protectionPeriod === maxProtectionPeriod)

  // Länder mit der kürzesten Schutzdauer
  const minProtectionPeriod = Math.min(...countries.map((c) => c.protectionPeriod))
  const countriesWithShortestProtectionPeriod = countries.filter((c) => c.protectionPeriod === minProtectionPeriod)

  // Länder mit der längsten Nachfrist
  const maxLateRenewalMonths = Math.max(...countries.map((c) => c.lateRenewalMonths))
  const countriesWithLongestLateRenewal = countries.filter((c) => c.lateRenewalMonths === maxLateRenewalMonths)

  return {
    longestProtectionPeriod: {
      value: maxProtectionPeriod,
      countries: countriesWithLongestProtectionPeriod,
    },
    shortestProtectionPeriod: {
      value: minProtectionPeriod,
      countries: countriesWithShortestProtectionPeriod,
    },
    longestLateRenewal: {
      value: maxLateRenewalMonths,
      countries: countriesWithLongestLateRenewal,
    },
  }
}

/**
 * Vergleicht zwei Länder und gibt die Unterschiede zurück
 */
export function compareCountries(country1: CountryData, country2: CountryData) {
  const differences: Record<string, { country1: any; country2: any }> = {}

  // Liste der zu vergleichenden Eigenschaften
  const propertiesToCompare: (keyof CountryData)[] = [
    "calculationBasis",
    "protectionPeriod",
    "renewalPeriod",
    "renewalStartMonths",
    "renewalDeadlineMonths",
    "lateRenewalMonths",
    "usageProofRequired",
    "usageProofYears",
    "usageDeclarationRequired",
    "registrationType",
    "vertreterRequired",
    "prufungsumfang",
    "widerspruch",
    "poaNotarization",
    "poaApostille",
  ]

  // Vergleiche alle Eigenschaften
  for (const prop of propertiesToCompare) {
    if (country1[prop] !== country2[prop]) {
      differences[prop as string] = {
        country1: country1[prop],
        country2: country2[prop],
      }
    }
  }

  return differences
}
