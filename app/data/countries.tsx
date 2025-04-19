import { countryMappings } from "./country-group-mappings"
import { ruleGroups } from "./rule-groups"
import { getBaseCountryCode } from "./countries/country-utils"

// Generiere Länderdaten basierend auf den Zuordnungen und Regelgruppen
export const countriesData = countryMappings.map((mapping) => {
  const baseRules = ruleGroups[mapping.ruleGroup]

  // Kombiniere Basisregeln mit Überschreibungen (falls vorhanden)
  return {
    code: mapping.code,
    country: mapping.country,
    region: mapping.region,
    registrationType: mapping.registrationType,
    ...baseRules,
    ...(mapping.overrides || {}),
  }
})

export type CountryData = {
  code: string
  country: string
  calculationBasis: "application" | "registration" | "none"
  protectionPeriod: number
  renewalPeriod: number
  renewalStartMonths: number
  renewalDeadlineMonths: number
  lateRenewalMonths: number
  usageProofRequired: boolean
  usageProofYears: number
  usageDeclarationRequired: boolean
  usageDeclarationYears?: number[]
  region: string
  registrationType: "direct" | "wipo" | "euipo" | "aripo" | "oapi" | "boip" | "gcc"
  vertreterRequired?: string
  prufungsumfang?: string
  widerspruch?: string
  poaVertreterRequired?: string
  poaDigitalCopy?: string
  poaOriginalRequired?: string
  poaDigitalSignature?: string
  poaNotarization?: string
  poaApostille?: string
  poaHinweise?: string
  priorityDeadlineMonths?: number
  priorityDocumentDeadlineMonths?: number
  lateFilingMonths?: number
  filingPeriodStart?: string
}

// Exportiere die Hilfsfunktion für andere Module
export { getBaseCountryCode }
