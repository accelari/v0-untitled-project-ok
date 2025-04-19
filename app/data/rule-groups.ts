// Definition von Regelgruppen mit identischen Eigenschaften

export type RuleGroup = {
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
  vertreterRequired?: string
  prufungsumfang?: string
  widerspruch?: string
  poaNotarization?: string
  poaApostille?: string
  priorityDeadlineMonths?: number
  lateFilingMonths?: number
  filingPeriodStart?: string
}

// Regelgruppen basierend auf Länder- und Organisationskürzeln
export const ruleGroups: Record<string, RuleGroup> = {
  // Organisationen
  EM: {
    // EUIPO
    calculationBasis: "application",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 5,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Ausländer",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  IB: {
    // WIPO
    calculationBasis: "registration",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: false,
    usageProofYears: 0,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    priorityDeadlineMonths: 6,
  },

  AP: {
    // ARIPO
    calculationBasis: "application",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 5,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Ja",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  OA: {
    // OAPI
    calculationBasis: "application",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 5,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Ja",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  BX: {
    // Benelux
    calculationBasis: "application",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 5,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Nein",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  GC: {
    // GCC
    calculationBasis: "application",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: false,
    usageProofYears: 0,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Ja",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  // Repräsentative Länder für Regionen
  DE: {
    // Deutschland als Basis für EU-Länder
    calculationBasis: "application",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 5,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Nein",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  US: {
    // USA mit spezifischen Regeln
    calculationBasis: "application",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 12,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 5,
    usageDeclarationRequired: true,
    usageDeclarationYears: [5, 10, 20, 30, 40, 50],
    vertreterRequired: "Ausländer",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  CN: {
    // China
    calculationBasis: "registration",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 12,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 3,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Ja",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  JP: {
    // Japan
    calculationBasis: "registration",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 3,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Ja",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  BR: {
    // Brasilien als Basis für südamerikanische Länder
    calculationBasis: "registration",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 12,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: false,
    usageProofYears: 0,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Ja",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    poaNotarization: "Ja",
    poaApostille: "Ja",
    priorityDeadlineMonths: 6,
  },

  AU: {
    // Australien
    calculationBasis: "application",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 12,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: false,
    usageProofYears: 3,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Nein",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  AE: {
    // Vereinigte Arabische Emirate
    calculationBasis: "application",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 12, // 12 Monate vor Ablauf
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6, // Geändert von 3 auf 6 Monate Nachfrist
  },

  ZA: {
    // Südafrika als Basis für afrikanische Länder
    calculationBasis: "application",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 5,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Ja",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  // Spezielle Fälle
  IN: {
    // Indien
    calculationBasis: "registration",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 12, // Längere Nachfrist
    usageProofRequired: true,
    usageProofYears: 3,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Ausländer",
    prufungsumfang: "Umfassend mit Besonderheiten",
    widerspruch: "Ja",
    priorityDeadlineMonths: 9, // Längere Prioritätsfrist
  },

  ID: {
    // Indonesien
    calculationBasis: "registration",
    protectionPeriod: 7, // Kürzere Schutzdauer
    renewalPeriod: 7, // Kürzere Verlängerungsperiode
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 3,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Ja",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  VE: {
    // Venezuela
    calculationBasis: "registration",
    protectionPeriod: 15, // Längere Schutzdauer
    renewalPeriod: 15, // Längere Verlängerungsperiode
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 3,
    usageDeclarationRequired: false,
    usageDeclarationYears: [],
    vertreterRequired: "Ja",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    poaNotarization: "Ja",
    poaApostille: "Ja",
    priorityDeadlineMonths: 6,
  },

  MX: {
    // Mexiko
    calculationBasis: "application",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 3,
    usageDeclarationRequired: true,
    usageDeclarationYears: [3],
    vertreterRequired: "Ausländer",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 6,
  },

  PH: {
    // Philippinen
    calculationBasis: "registration",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 3,
    usageDeclarationRequired: true,
    usageDeclarationYears: [3],
    vertreterRequired: "Ja",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    priorityDeadlineMonths: 8, // Längere Prioritätsfrist
  },

  AR: {
    // Argentinien
    calculationBasis: "registration",
    protectionPeriod: 10,
    renewalPeriod: 10,
    renewalStartMonths: 6,
    renewalDeadlineMonths: 0,
    lateRenewalMonths: 6,
    usageProofRequired: true,
    usageProofYears: 5,
    usageDeclarationRequired: true,
    usageDeclarationYears: [5],
    vertreterRequired: "Ja",
    prufungsumfang: "Umfassend",
    widerspruch: "Ja",
    poaNotarization: "Ja",
    poaApostille: "Ja",
    priorityDeadlineMonths: 6,
  },
}
