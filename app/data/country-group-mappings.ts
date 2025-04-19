import type { RuleGroup } from "./rule-groups"

// Typ für Länderüberschreibungen (nur für Ausnahmen)
export type CountryOverrides = Partial<RuleGroup>

// Typ für Länderzuordnungen
export type CountryMapping = {
  code: string
  country: string
  region: string
  registrationType: "direct" | "wipo" | "euipo" | "aripo" | "oapi" | "boip" | "gcc"
  ruleGroup: string
  overrides?: CountryOverrides
}

// Zuordnung von Ländern zu Regelgruppen basierend auf Länderkürzeln
export const countryMappings: CountryMapping[] = [
  // Europa
  {
    code: "DE",
    country: "Deutschland",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE", // Verwendet eigene Regeln
  },
  {
    code: "FR",
    country: "Frankreich",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE", // Verwendet deutsche Regeln als Basis
  },
  {
    code: "GB",
    country: "Vereinigtes Königreich",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "IT",
    country: "Italien",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "ES",
    country: "Spanien",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "CH",
    country: "Schweiz",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "EM",
    country: "Europäische Union",
    region: "Europa",
    registrationType: "euipo",
    ruleGroup: "EM", // Verwendet eigene EUIPO-Regeln
  },
  // Weitere europäische Länder
  {
    code: "AT",
    country: "Österreich",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "BE",
    country: "Belgien",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "BG",
    country: "Bulgarien",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "CY",
    country: "Zypern",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "CZ",
    country: "Tschechien",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "DK",
    country: "Dänemark",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "EE",
    country: "Estland",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "FI",
    country: "Finnland",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "GR",
    country: "Griechenland",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "HR",
    country: "Kroatien",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "HU",
    country: "Ungarn",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "IE",
    country: "Irland",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "LT",
    country: "Litauen",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "LU",
    country: "Luxemburg",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "LV",
    country: "Lettland",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "MT",
    country: "Malta",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "NL",
    country: "Niederlande",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "PL",
    country: "Polen",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "PT",
    country: "Portugal",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "RO",
    country: "Rumänien",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "SE",
    country: "Schweden",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "SI",
    country: "Slowenien",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "SK",
    country: "Slowakei",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "NO",
    country: "Norwegen",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "IS",
    country: "Island",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "LI",
    country: "Liechtenstein",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "MC",
    country: "Monaco",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "SM",
    country: "San Marino",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "VA",
    country: "Vatikanstadt",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "AD",
    country: "Andorra",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "AL",
    country: "Albanien",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "BA",
    country: "Bosnien und Herzegowina",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "ME",
    country: "Montenegro",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "MK",
    country: "Nordmazedonien",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "RS",
    country: "Serbien",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "UA",
    country: "Ukraine",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "BY",
    country: "Belarus",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "MD",
    country: "Moldau",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "RU",
    country: "Russland",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },
  {
    code: "TR",
    country: "Türkei",
    region: "Europa",
    registrationType: "direct",
    ruleGroup: "DE",
  },

  // Nordamerika
  {
    code: "US",
    country: "Vereinigte Staaten",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US", // Verwendet eigene Regeln
  },
  {
    code: "CA",
    country: "Kanada",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US",
    overrides: {
      renewalStartMonths: 6, // Abweichung von US-Regeln
    },
  },
  {
    code: "MX",
    country: "Mexiko",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "MX", // Verwendet eigene Regeln
  },
  // Weitere nordamerikanische Länder
  {
    code: "CR",
    country: "Costa Rica",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "CU",
    country: "Kuba",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "DO",
    country: "Dominikanische Republik",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "GT",
    country: "Guatemala",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "HN",
    country: "Honduras",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "HT",
    country: "Haiti",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US",
    overrides: {
      renewalStartMonths: 6,
      usageDeclarationRequired: true,
      usageDeclarationYears: [6],
    },
  },
  {
    code: "JM",
    country: "Jamaika",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "NI",
    country: "Nicaragua",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "PA",
    country: "Panama",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "SV",
    country: "El Salvador",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "TT",
    country: "Trinidad und Tobago",
    region: "Nordamerika",
    registrationType: "direct",
    ruleGroup: "US",
    overrides: {
      renewalStartMonths: 6,
    },
  },

  // Asien
  {
    code: "CN",
    country: "China",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "CN", // Verwendet eigene Regeln
  },
  {
    code: "JP",
    country: "Japan",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "JP", // Verwendet eigene Regeln
  },
  {
    code: "KR",
    country: "Südkorea",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "CN", // Verwendet chinesische Regeln als Basis
  },
  // Weitere asiatische Länder
  {
    code: "HK",
    country: "Hongkong",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "JP",
    overrides: {
      prufungsumfang: "Beschränkt mit Besonderheiten",
    },
  },
  {
    code: "ID",
    country: "Indonesien",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "ID", // Verwendet eigene Regeln
  },
  {
    code: "IN",
    country: "Indien",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "IN", // Verwendet eigene Regeln
  },
  {
    code: "MY",
    country: "Malaysia",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "JP",
  },
  {
    code: "PH",
    country: "Philippinen",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "PH", // Verwendet eigene Regeln
  },
  {
    code: "SG",
    country: "Singapur",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "JP",
    overrides: {
      calculationBasis: "application",
    },
  },
  {
    code: "TH",
    country: "Thailand",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "JP",
    overrides: {
      calculationBasis: "application",
    },
  },
  {
    code: "TW",
    country: "Taiwan",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "JP",
  },
  {
    code: "VN",
    country: "Vietnam",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "JP",
    overrides: {
      calculationBasis: "application",
    },
  },
  {
    code: "KH",
    country: "Kambodscha",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "JP",
  },
  {
    code: "LA",
    country: "Laos",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "JP",
  },
  {
    code: "MM",
    country: "Myanmar",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "JP",
  },
  {
    code: "MN",
    country: "Mongolei",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "JP",
  },
  {
    code: "PK",
    country: "Pakistan",
    region: "Asien",
    registrationType: "direct",
    ruleGroup: "ID", // Verwendet indonesische Regeln (7 Jahre Schutzdauer)
  },

  // Afrika
  {
    code: "ZA",
    country: "Südafrika",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA", // Verwendet eigene Regeln
  },
  {
    code: "EG",
    country: "Ägypten",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "AP",
    country: "ARIPO",
    region: "Afrika",
    registrationType: "aripo",
    ruleGroup: "AP", // Verwendet eigene Regeln
  },
  {
    code: "OA",
    country: "OAPI",
    region: "Afrika",
    registrationType: "oapi",
    ruleGroup: "OA", // Verwendet eigene Regeln
  },
  // Weitere afrikanische Länder
  {
    code: "DZ",
    country: "Algerien",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "AO",
    country: "Angola",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "BW",
    country: "Botswana",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "CV",
    country: "Kap Verde",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
    overrides: {
      usageDeclarationRequired: true,
      usageDeclarationYears: [5],
    },
  },
  {
    code: "ET",
    country: "Äthiopien",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "GH",
    country: "Ghana",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "KE",
    country: "Kenia",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "LY",
    country: "Libyen",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "MA",
    country: "Marokko",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "MU",
    country: "Mauritius",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "MZ",
    country: "Mosambik",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "NA",
    country: "Namibia",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "NG",
    country: "Nigeria",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "SN",
    country: "Senegal",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "TN",
    country: "Tunesien",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "TZ",
    country: "Tansania",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "UG",
    country: "Uganda",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "ZM",
    country: "Sambia",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },
  {
    code: "ZW",
    country: "Simbabwe",
    region: "Afrika",
    registrationType: "direct",
    ruleGroup: "ZA",
  },

  // Südamerika
  {
    code: "BR",
    country: "Brasilien",
    region: "Südamerika",
    registrationType: "direct",
    ruleGroup: "BR", // Verwendet eigene Regeln
  },
  {
    code: "AR",
    country: "Argentinien",
    region: "Südamerika",
    registrationType: "direct",
    ruleGroup: "AR", // Verwendet eigene Regeln
  },
  {
    code: "CL",
    country: "Chile",
    region: "Südamerika",
    registrationType: "direct",
    ruleGroup: "BR",
    overrides: {
      usageProofRequired: false,
    },
  },
  // Weitere südamerikanische Länder
  {
    code: "BO",
    country: "Bolivien",
    region: "Südamerika",
    registrationType: "direct",
    ruleGroup: "BR",
  },
  {
    code: "CO",
    country: "Kolumbien",
    region: "Südamerika",
    registrationType: "direct",
    ruleGroup: "BR",
  },
  {
    code: "EC",
    country: "Ecuador",
    region: "Südamerika",
    registrationType: "direct",
    ruleGroup: "BR",
  },
  {
    code: "GY",
    country: "Guyana",
    region: "Südamerika",
    registrationType: "direct",
    ruleGroup: "BR",
  },
  {
    code: "PE",
    country: "Peru",
    region: "Südamerika",
    registrationType: "direct",
    ruleGroup: "BR",
  },
  {
    code: "PY",
    country: "Paraguay",
    region: "Südamerika",
    registrationType: "direct",
    ruleGroup: "BR",
  },
  {
    code: "SR",
    country: "Suriname",
    region: "Südamerika",
    registrationType: "direct",
    ruleGroup: "BR",
  },
  {
    code: "UY",
    country: "Uruguay",
    region: "Südamerika",
    registrationType: "direct",
    ruleGroup: "BR",
  },
  {
    code: "VE",
    country: "Venezuela",
    region: "Südamerika",
    registrationType: "direct",
    ruleGroup: "VE", // Verwendet eigene Regeln
  },

  // Ozeanien
  {
    code: "AU",
    country: "Australien",
    region: "Ozeanien",
    registrationType: "direct",
    ruleGroup: "AU", // Verwendet eigene Regeln
  },
  {
    code: "NZ",
    country: "Neuseeland",
    region: "Ozeanien",
    registrationType: "direct",
    ruleGroup: "AU",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  // Weitere ozeanische Länder
  {
    code: "FJ",
    country: "Fidschi",
    region: "Ozeanien",
    registrationType: "direct",
    ruleGroup: "AU",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "PG",
    country: "Papua-Neuguinea",
    region: "Ozeanien",
    registrationType: "direct",
    ruleGroup: "AU",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "SB",
    country: "Salomonen",
    region: "Ozeanien",
    registrationType: "direct",
    ruleGroup: "AU",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "TO",
    country: "Tonga",
    region: "Ozeanien",
    registrationType: "direct",
    ruleGroup: "AU",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "VU",
    country: "Vanuatu",
    region: "Ozeanien",
    registrationType: "direct",
    ruleGroup: "AU",
    overrides: {
      renewalStartMonths: 6,
    },
  },
  {
    code: "WS",
    country: "Samoa",
    region: "Ozeanien",
    registrationType: "direct",
    ruleGroup: "AU",
    overrides: {
      renewalStartMonths: 6,
    },
  },

  // Naher Osten
  {
    code: "AE",
    country: "Vereinigte Arabische Emirate",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE", // Verwendet eigene Regeln
  },
  {
    code: "SA",
    country: "Saudi-Arabien",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE",
    overrides: {
      lateRenewalMonths: 6, // Längere Nachfrist als VAE
    },
  },
  // Weitere Länder im Nahen Osten
  {
    code: "BH",
    country: "Bahrain",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE",
    overrides: {
      lateRenewalMonths: 6,
    },
  },
  {
    code: "IL",
    country: "Israel",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE",
    overrides: {
      lateRenewalMonths: 6,
    },
  },
  {
    code: "IQ",
    country: "Irak",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE",
    overrides: {
      lateRenewalMonths: 6,
    },
  },
  {
    code: "IR",
    country: "Iran",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE",
    overrides: {
      lateRenewalMonths: 6,
    },
  },
  {
    code: "JO",
    country: "Jordanien",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE",
    overrides: {
      lateRenewalMonths: 6,
    },
  },
  {
    code: "KW",
    country: "Kuwait",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE",
    overrides: {
      lateRenewalMonths: 6,
    },
  },
  {
    code: "LB",
    country: "Libanon",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE",
    overrides: {
      lateRenewalMonths: 6,
    },
  },
  {
    code: "OM",
    country: "Oman",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE",
    overrides: {
      lateRenewalMonths: 6,
    },
  },
  {
    code: "QA",
    country: "Katar",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE",
    overrides: {
      lateRenewalMonths: 6,
    },
  },
  {
    code: "SY",
    country: "Syrien",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE",
    overrides: {
      lateRenewalMonths: 6,
    },
  },
  {
    code: "YE",
    country: "Jemen",
    region: "Naher Osten",
    registrationType: "direct",
    ruleGroup: "AE",
    overrides: {
      lateRenewalMonths: 6,
    },
  },

  // Internationale Organisationen
  {
    code: "IB",
    country: "Internationale Registrierung (WIPO)",
    region: "International",
    registrationType: "wipo",
    ruleGroup: "IB", // Verwendet eigene Regeln
  },
  {
    code: "GC",
    country: "GCC",
    region: "International",
    registrationType: "gcc",
    ruleGroup: "GC", // Verwendet eigene Regeln
  },
  // Weitere internationale Organisationen
  {
    code: "BX",
    country: "Benelux",
    region: "International",
    registrationType: "boip",
    ruleGroup: "BX", // Verwendet eigene Regeln
  },
]
