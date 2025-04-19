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
