/**
 * Organisierte Länderlisten nach Mitgliedschaften und Eigenschaften
 * Reihenfolge:
 * 1. Organisationen (WIPO, EUIPO, ARIPO, OAPI, BOIP, GCC)
 * 2. Länder nach Schutzdauer (10 Jahre, andere Dauern)
 * 3. Länder nach Verlängerungsperiode (10, 7, 15 Jahre)
 * 4. Länder nach Verlängerungsstart (12 Monate, 6 Monate, Ausnahmen)
 * 5. Länder nach Nachfrist (6 Monate, Ausnahmen)
 * 6. Länder nach Berechnungsbasis (Anmeldedatum, Eintragungsdatum)
 */

// 1. ORGANISATIONSMITGLIEDSCHAFTEN

// 1.1 WIPO-Mitgliedsländer (Madrid-Protokoll)
export const wipoMemberCountries = [
  "AL", // Albanien
  "AG", // Antigua und Barbuda
  "AM", // Armenien
  "AU", // Australien
  "AT", // Österreich
  "AZ", // Aserbaidschan
  "BH", // Bahrain
  "BY", // Belarus
  "BE", // Belgien
  "BT", // Bhutan
  "BA", // Bosnien und Herzegowina
  "BW", // Botswana
  "BR", // Brasilien
  "BN", // Brunei
  "BG", // Bulgarien
  "KH", // Kambodscha
  "CA", // Kanada
  "CN", // China
  "CO", // Kolumbien
  "HR", // Kroatien
  "CU", // Kuba
  "CY", // Zypern
  "CZ", // Tschechien
  "DK", // Dänemark
  "EG", // Ägypten
  "EE", // Estland
  "EU", // Europäische Union
  "FI", // Finnland
  "FR", // Frankreich
  "GE", // Georgien
  "DE", // Deutschland
  "GH", // Ghana
  "GR", // Griechenland
  "HU", // Ungarn
  "IS", // Island
  "IN", // Indien
  "ID", // Indonesien
  "IR", // Iran
  "IE", // Irland
  "IL", // Israel
  "IT", // Italien
  "JP", // Japan
  "KZ", // Kasachstan
  "KE", // Kenia
  "KP", // Nordkorea
  "KR", // Südkorea
  "KG", // Kirgisistan
  "LA", // Laos
  "LV", // Lettland
  "LS", // Lesotho
  "LI", // Liechtenstein
  "LT", // Litauen
  "LU", // Luxemburg
  "MW", // Malawi
  "MY", // Malaysia
  "MX", // Mexiko
  "MC", // Monaco
  "MN", // Mongolei
  "ME", // Montenegro
  "MA", // Marokko
  "MZ", // Mosambik
  "NA", // Namibia
  "NL", // Niederlande
  "NZ", // Neuseeland
  "NO", // Norwegen
  "OM", // Oman
  "PH", // Philippinen
  "PL", // Polen
  "PT", // Portugal
  "MD", // Moldau
  "RO", // Rumänien
  "RU", // Russland
  "SM", // San Marino
  "RS", // Serbien
  "SG", // Singapur
  "SK", // Slowakei
  "SI", // Slowenien
  "ES", // Spanien
  "SD", // Sudan
  "SE", // Schweden
  "CH", // Schweiz
  "SY", // Syrien
  "TJ", // Tadschikistan
  "TH", // Thailand
  "MK", // Nordmazedonien
  "TT", // Trinidad und Tobago
  "TN", // Tunesien
  "TR", // Türkei
  "TM", // Turkmenistan
  "UA", // Ukraine
  "GB", // Vereinigtes Königreich
  "US", // Vereinigte Staaten
  "UZ", // Usbekistan
  "VN", // Vietnam
  "ZM", // Sambia
  "ZW", // Simbabwe
]

// 1.2 EUIPO-Mitgliedsländer (Europäische Union)
export const euipoMemberCountries = [
  "AT", // Österreich
  "BE", // Belgien
  "BG", // Bulgarien
  "HR", // Kroatien
  "CY", // Zypern
  "CZ", // Tschechien
  "DK", // Dänemark
  "EE", // Estland
  "FI", // Finnland
  "FR", // Frankreich
  "DE", // Deutschland
  "GR", // Griechenland
  "HU", // Ungarn
  "IE", // Irland
  "IT", // Italien
  "LV", // Lettland
  "LT", // Litauen
  "LU", // Luxemburg
  "MT", // Malta
  "NL", // Niederlande
  "PL", // Polen
  "PT", // Portugal
  "RO", // Rumänien
  "SK", // Slowakei
  "SI", // Slowenien
  "ES", // Spanien
  "SE", // Schweden
]

// 1.3 ARIPO-Mitgliedsländer (Afrikanische Regionale Organisation für geistiges Eigentum)
export const aripoMemberCountries = [
  "BW", // Botswana
  "GM", // Gambia
  "GH", // Ghana
  "KE", // Kenia
  "LS", // Lesotho
  "MW", // Malawi
  "MZ", // Mosambik
  "NA", // Namibia
  "RW", // Ruanda
  "ST", // São Tomé und Príncipe
  "SL", // Sierra Leone
  "SO", // Somalia
  "SD", // Sudan
  "SZ", // Eswatini (früher Swasiland)
  "TZ", // Tansania
  "UG", // Uganda
  "ZM", // Sambia
  "ZW", // Simbabwe
]

// 1.4 OAPI-Mitgliedsländer (Organisation Africaine de la Propriété Intellectuelle)
export const oapiMemberCountries = [
  "BJ", // Benin
  "BF", // Burkina Faso
  "CM", // Kamerun
  "CF", // Zentralafrikanische Republik
  "TD", // Tschad
  "KM", // Komoren
  "CG", // Kongo
  "CI", // Elfenbeinküste
  "GQ", // Äquatorialguinea
  "GA", // Gabun
  "GN", // Guinea
  "GW", // Guinea-Bissau
  "ML", // Mali
  "MR", // Mauretanien
  "NE", // Niger
  "SN", // Senegal
  "TG", // Togo
]

// 1.5 BOIP-Mitgliedsländer (Benelux-Markenamt)
export const boipMemberCountries = [
  "BE", // Belgien
  "LU", // Luxemburg
  "NL", // Niederlande
]

// 1.6 GCC-Mitgliedsländer (Golf-Kooperationsrat)
export const gccMemberCountries = [
  "BH", // Bahrain
  "KW", // Kuwait
  "OM", // Oman
  "QA", // Katar
  "SA", // Saudi-Arabien
  "AE", // Vereinigte Arabische Emirate
]

// 2. LÄNDER NACH SCHUTZDAUER

// 2.1 Länder mit 10-jähriger Schutzdauer (die meisten Länder)
export const tenYearTermCountries = [
  // WIPO-Länder
  "AL",
  "AG",
  "AM",
  "AU",
  "AT",
  "AZ",
  "BH",
  "BY",
  "BE",
  "BT",
  "BA",
  "BW",
  "BR",
  "BN",
  "BG",
  "KH",
  "CA",
  "CN",
  "CO",
  "HR",
  "CU",
  "CY",
  "CZ",
  "DK",
  "EG",
  "EE",
  "EU",
  "FI",
  "FR",
  "GE",
  "DE",
  "GH",
  "GR",
  "HU",
  "IS",
  "IN",
  "IR",
  "IE",
  "IL",
  "IT",
  "JP",
  "KZ",
  "KE",
  "KP",
  "KR",
  "KG",
  "LA",
  "LV",
  "LS",
  "LI",
  "LT",
  "LU",
  "MW",
  "MY",
  "MX",
  "MC",
  "MN",
  "ME",
  "MA",
  "MZ",
  "NA",
  "NL",
  "NZ",
  "NO",
  "OM",
  "PH",
  "PL",
  "PT",
  "MD",
  "RO",
  "RU",
  "SM",
  "RS",
  "SG",
  "SK",
  "SI",
  "ES",
  "SD",
  "SE",
  "CH",
  "SY",
  "TJ",
  "TH",
  "MK",
  "TT",
  "TN",
  "TR",
  "TM",
  "UA",
  "GB",
  "US",
  "UZ",
  "VN",
  "ZM",
  "ZW",

  // EUIPO-Länder (bereits in WIPO enthalten)

  // ARIPO-Länder
  "GM",
  "RW",
  "ST",
  "SL",
  "SO",
  "SZ",
  "UG",

  // OAPI-Länder
  "BJ",
  "BF",
  "CM",
  "CF",
  "TD",
  "KM",
  "CG",
  "CI",
  "GQ",
  "GA",
  "GN",
  "GW",
  "ML",
  "MR",
  "NE",
  "SN",
  "TG",

  // GCC-Länder
  "KW",
  "QA",

  // Andere afrikanische Länder
  "BI",
  "CV",
  "CD",
  "DJ",
  "ER",
  "ET",
  "LR",
  "LY",
  "MG",
  "MU",
  "NG",
  "SC",
  "SS",
  "ZA",

  // Andere asiatische Länder
  "MM",

  // Andere Länder, die nicht in Organisationen sind
  "AD",
  "AO",
  "BS",
  "BB",
  "BZ",
  "BO",
  "CR",
  "DO",
  "EC",
  "SV",
  "FJ",
  "GT",
  "HN",
  "HT",
  "IQ",
  "JM",
  "JO",
  "LB",
  "MT",
  "NI",
  "PA",
  "PG",
  "PY",
  "PR",
  "SB",
  "TO",
  "UY",
  "VU",
  "WS",
  "YE",

  // Organisationscodes
  "EM",
  "IB",
  "AP",
  "OA",
  "BX",
  "GC",
]

// 2.2 Länder mit 7-jähriger Schutzdauer
export const sevenYearTermCountries = [
  "ID", // Indonesien (WIPO, ASEAN)
  "PK", // Pakistan
]

// 2.3 Länder mit 15-jähriger Schutzdauer
export const fifteenYearTermCountries = [
  "VE", // Venezuela
]

// 3. LÄNDER NACH VERLÄNGERUNGSPERIODE

// 3.1 Länder mit 10-jähriger Verlängerungsperiode
export const tenYearRenewalPeriodCountries = [
  // Die meisten Länder haben eine 10-jährige Verlängerungsperiode
  // Alle Länder aus tenYearTermCountries
  ...tenYearTermCountries,
]

// 3.2 Länder mit 7-jähriger Verlängerungsperiode
export const sevenYearRenewalPeriodCountries = [
  // Länder mit 7-jähriger Verlängerungsperiode
  ...sevenYearTermCountries,
]

// 3.3 Länder mit 15-jähriger Verlängerungsperiode
export const fifteenYearRenewalPeriodCountries = [
  // Länder mit 15-jähriger Verlängerungsperiode
  ...fifteenYearTermCountries,
]

// 4. LÄNDER NACH VERLÄNGERUNGSSTART

// 4.1 Länder, bei denen die Verlängerung 12 Monate vor Ablauf starten kann
export const twelveMonthsRenewalStartCountries = [
  "US", // Vereinigte Staaten
  "CN", // China
  "AU", // Australien
  "BR", // Brasilien
  "AE", // Vereinigte Arabische Emirate
  "SA", // Saudi-Arabien
  "QA", // Katar
  "KW", // Kuwait
  "OM", // Oman
  "BH", // Bahrain
]

// 4.2 Länder, bei denen die Verlängerung 6 Monate vor Ablauf starten kann
export const sixMonthsRenewalStartCountries = [
  // Die meisten Länder erlauben einen Verlängerungsstart 6 Monate vor Ablauf
  // Alle Länder, die nicht in twelveMonthsRenewalStartCountries sind
  "DE", // Deutschland
  "FR", // Frankreich
  "GB", // Vereinigtes Königreich
  "IT", // Italien
  "ES", // Spanien
  "JP", // Japan
  "KR", // Südkorea
  "CA", // Kanada
  "IN", // Indien
  "RU", // Russland
  "CH", // Schweiz
  "AT", // Österreich
  "BE", // Belgien
  "NL", // Niederlande
  "SE", // Schweden
  "DK", // Dänemark
  "FI", // Finnland
  "NO", // Norwegen
  "IE", // Irland
  "PT", // Portugal
  "GR", // Griechenland
  "PL", // Polen
  "CZ", // Tschechien
  "HU", // Ungarn
  "RO", // Rumänien
  "BG", // Bulgarien
  "SK", // Slowakei
  "SI", // Slowenien
  "HR", // Kroatien
  "LT", // Litauen
  "LV", // Lettland
  "EE", // Estland
  "CY", // Zypern
  "MT", // Malta
  "LU", // Luxemburg
  "IS", // Island
  "LI", // Liechtenstein
  "MC", // Monaco
  "SM", // San Marino
  "VA", // Vatikanstadt
  "AD", // Andorra
  "AL", // Albanien
  "BA", // Bosnien und Herzegowina
  "ME", // Montenegro
  "MK", // Nordmazedonien
  "RS", // Serbien
  "UA", // Ukraine
  "BY", // Belarus
  "MD", // Moldau
  "TR", // Türkei
  "MX", // Mexiko
  "AR", // Argentinien
  "CL", // Chile
  "CO", // Kolumbien
  "PE", // Peru
  "VE", // Venezuela
  "EC", // Ecuador
  "UY", // Uruguay
  "PY", // Paraguay
  "BO", // Bolivien
  "ID", // Indonesien
  "MY", // Malaysia
  "SG", // Singapur
  "TH", // Thailand
  "VN", // Vietnam
  "PH", // Philippinen
  "NZ", // Neuseeland
  "ZA", // Südafrika
  "EG", // Ägypten
  "MA", // Marokko
  "NG", // Nigeria
  "KE", // Kenia
  "TN", // Tunesien
  "DZ", // Algerien
  "IL", // Israel
  "IR", // Iran
  "IQ", // Irak
  "JO", // Jordanien
  "LB", // Libanon
  "SY", // Syrien
  "YE", // Jemen
  "PK", // Pakistan
  "BD", // Bangladesch
  "LK", // Sri Lanka
  "MM", // Myanmar
  "KH", // Kambodscha
  "LA", // Laos
  "MN", // Mongolei
  "FJ", // Fidschi
  "PG", // Papua-Neuguinea
  "SB", // Salomonen
  "VU", // Vanuatu
  "WS", // Samoa
  "TO", // Tonga
  "KI", // Kiribati
  "TV", // Tuvalu
  "NR", // Nauru
  "MH", // Marshallinseln
  "FM", // Mikronesien
  "PW", // Palau
  "TL", // Osttimor
  "BN", // Brunei
  "MV", // Malediven
  "BT", // Bhutan
  "NP", // Nepal
  "AF", // Afghanistan
  "KZ", // Kasachstan
  "UZ", // Usbekistan
  "TM", // Turkmenistan
  "KG", // Kirgisistan
  "TJ", // Tadschikistan
  "AM", // Armenien
  "AZ", // Aserbaidschan
  "GE", // Georgien
  "CR", // Costa Rica
  "PA", // Panama
  "HN", // Honduras
  "SV", // El Salvador
  "NI", // Nicaragua
  "GT", // Guatemala
  "DO", // Dominikanische Republik
  "HT", // Haiti
  "JM", // Jamaika
  "BS", // Bahamas
  "BB", // Barbados
  "TT", // Trinidad und Tobago
  "GY", // Guyana
  "SR", // Suriname
  "BZ", // Belize
  "CU", // Kuba
  "AO", // Angola
  "MZ", // Mosambik
  "ZW", // Simbabwe
  "ZM", // Sambia
  "NA", // Namibia
  "BW", // Botswana
  "MW", // Malawi
  "TZ", // Tansania
  "UG", // Uganda
  "RW", // Ruanda
  "BI", // Burundi
  "ET", // Äthiopien
  "ER", // Eritrea
  "DJ", // Dschibuti
  "SO", // Somalia
  "SD", // Sudan
  "SS", // Südsudan
  "CF", // Zentralafrikanische Republik
  "CM", // Kamerun
  "TD", // Tschad
  "CG", // Republik Kongo
  "CD", // Demokratische Republik Kongo
  "GA", // Gabun
  "GQ", // Äquatorialguinea
  "ST", // São Tomé und Príncipe
  "GH", // Ghana
  "CI", // Elfenbeinküste
  "LR", // Liberia
  "SL", // Sierra Leone
  "GN", // Guinea
  "GW", // Guinea-Bissau
  "ML", // Mali
  "BF", // Burkina Faso
  "NE", // Niger
  "SN", // Senegal
  "GM", // Gambia
  "MR", // Mauretanien
  "CV", // Kap Verde
  "BJ", // Benin
  "TG", // Togo
  "LY", // Libyen
  "MU", // Mauritius
  "SC", // Seychellen
  "KM", // Komoren
  "MG", // Madagaskar
  "LS", // Lesotho
  "SZ", // Eswatini

  // Organisationscodes
  "EM", // EUIPO
  "IB", // WIPO
  "AP", // ARIPO
  "OA", // OAPI
  "BX", // Benelux
  "GC", // GCC
]

// 4.3 Ausnahmefälle für Vorfristen
// Keine bekannten Ausnahmefälle für Vorfristen, die nicht bereits in den obigen Kategorien erfasst sind

// 5. LÄNDER NACH NACHFRIST

// 5.1 Länder mit 6-monatiger Nachfrist
export const sixMonthsLateRenewalCountries = [
  // Die meisten Länder haben eine 6-monatige Nachfrist
  // Alle Länder außer denen mit speziellen Nachfristen
  ...tenYearTermCountries,
  ...sevenYearTermCountries,
  ...fifteenYearTermCountries,
  "AE", // Vereinigte Arabische Emirate - explizit hinzugefügt
]

// 5.2 Länder mit 3-monatiger Nachfrist
export const threeMonthsLateRenewalCountries = [
  // "AE", // Vereinigte Arabische Emirate - entfernt, da jetzt 6 Monate
]

// 5.3 Länder mit 12-monatiger Nachfrist
export const twelveMonthsLateRenewalCountries = [
  "IN", // Indien
]

// 6. LÄNDER NACH BERECHNUNGSBASIS

// 6.1 Anwendungsbasierte Länder (Berechnung ab Anmeldedatum)
export const applicationBasedCountries = [
  // WIPO-Länder
  "DE",
  "FR",
  "GB",
  "IT",
  "ES",
  "CH",
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "GR",
  "HR",
  "HU",
  "IE",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
  "NO",
  "IS",
  "LI",
  "MC",
  "SM",
  "US",
  "CA",
  "AU",
  "SG",
  "MY",
  "TH",
  "VN",
  "UA",
  "BY",
  "MD",
  "TR",

  // Andere Länder
  "VA",
  "AD",
  "AL",
  "BA",
  "ME",
  "MK",
  "RS",
  "AE",
  "QA",
  "SA",
  "ZA",
  "EG",

  // Organisationscodes
  "EM",
  "AP",
  "OA",
  "BX",
  "GC",
]

// 6.2 Registrierungsbasierte Länder (Berechnung ab Eintragungsdatum)
export const registrationBasedCountries = [
  // WIPO-Länder
  "JP",
  "KR",
  "CN",
  "RU",
  "IN",
  "ID",
  "PH",
  "TW",
  "KH",
  "LA",
  "MM",
  "MN",

  // Andere Länder
  "BR",
  "MX",
  "AR",
  "CL",
  "CO",
  "PE",
  "EC",
  "UY",
  "PY",
  "BO",
  "VE",
  "PK",
  "DZ",
  "AO",
  "BW",
  "ET",
  "GH",
  "KE",
  "LY",
  "MA",
  "MZ",
  "NA",
  "NG",
  "SN",
  "TN",
  "TZ",
  "UG",
  "ZM",
  "ZW",

  // Organisationscodes
  "IB",
]

// 7. LÄNDER NACH BENUTZUNGSNACHWEISANFORDERUNGEN

// 7.1 Länder, wo Benutzungsnachweis zwingend erforderlich ist
export const mandatoryUsageProofCountries = [
  "US", // Vereinigte Staaten
  "MX", // Mexiko
  "PH", // Philippinen
  "AR", // Argentinien
  "EM", // EUIPO
  // Make sure DE is NOT in this list
]

// 7.2 Länder, wo Benutzungsnachweis auf Anfrage erforderlich ist
export const onRequestUsageProofCountries = [
  "CH", // Schweiz
  "RU", // Russland
  "CA", // Kanada
  "MY", // Malaysia
  "TW", // Taiwan
  "VN", // Vietnam
  "ZA", // Südafrika
  "ID", // Indonesien
  "AT", // Österreich
  "BE", // Belgien
  "BG", // Bulgarien
  "CY", // Zypern
  "CZ", // Tschechien
  "DK", // Dänemark
  "EE", // Estland
  "FI", // Finnland
  "GR", // Griechenland
  "HR", // Kroatien
  "HU", // Ungarn
  "IE", // Irland
  "LT", // Litauen
  "LU", // Luxemburg
  "LV", // Lettland
  "MT", // Malta
  "NL", // Niederlande
  "PL", // Polen
  "PT", // Portugal
  "RO", // Rumänien
  "SE", // Schweden
  "SI", // Slowenien
  "SK", // Slowakei
  "NO", // Norwegen
  "IS", // Island
  "LI", // Liechtenstein
]

// 7.3 Länder, wo kein Benutzungsnachweis erforderlich ist
// Alle Länder, die nicht in mandatoryUsageProofCountries oder onRequestUsageProofCountries enthalten sind
export function getNoUsageProofRequiredCountries(): string[] {
  const allCountryCodes = [
    ...wipoMemberCountries,
    ...euipoMemberCountries,
    ...aripoMemberCountries,
    ...oapiMemberCountries,
    ...boipMemberCountries,
    ...gccMemberCountries,
    // Organisationscodes
    "EM",
    "IB",
    "AP",
    "OA",
    "BX",
    "GC",
    // Andere Länder, die nicht in Organisationen sind
    "AD",
    "AO",
    "BS",
    "BB",
    "BZ",
    "BO",
    "CR",
    "DO",
    "EC",
    "SV",
    "FJ",
    "GT",
    "HN",
    "HT",
    "IQ",
    "JM",
    "JO",
    "LB",
    "MT",
    "NI",
    "PA",
    "PG",
    "PY",
    "PR",
    "SB",
    "TO",
    "UY",
    "VU",
    "WS",
    "YE",
    // Asiatische Länder
    "BN",
    "KH",
    "LA",
    "MM",
    "SG",
    "TH",
    "VN",
  ]

  // Entferne Duplikate
  const uniqueCountryCodes = [...new Set(allCountryCodes)]

  // Filtere Länder, die bereits in den anderen Kategorien sind
  return uniqueCountryCodes.filter(
    (code) => !mandatoryUsageProofCountries.includes(code) && !onRequestUsageProofCountries.includes(code),
  )
}

// Funktion zum Abrufen der Benutzungsnachweisanforderung für ein Land
export function getUsageProofRequirement(countryCode: string): "mandatory" | "on_request" | "not_required" {
  if (mandatoryUsageProofCountries.includes(countryCode)) {
    return "mandatory"
  }

  if (onRequestUsageProofCountries.includes(countryCode)) {
    return "on_request"
  }

  return "not_required"
}

// 8. LÄNDER NACH BENUTZUNGSERKLÄRUNGSANFORDERUNGEN

// 8.1 Länder, wo Benutzungserklärung zwingend erforderlich ist
export const mandatoryUsageDeclarationCountries = [
  "US", // Vereinigte Staaten (nach 5, 10, 20, 30, 40, 50 Jahren)
  "MX", // Mexiko (nach 3 Jahren)
  "PH", // Philippinen (nach 3 Jahren)
  "AR", // Argentinien (nach 5 Jahren)
  "HT", // Haiti (nach 6 Jahren)
  "CV", // Kap Verde (nach 5 Jahren)
]

// 8.2 Länder, wo Benutzungserklärung auf Anfrage erforderlich ist
export const onRequestUsageDeclarationCountries = [
  "BR", // Brasilien
  "CO", // Kolumbien
  "PE", // Peru
  "EC", // Ecuador
  "UY", // Uruguay
  "PY", // Paraguay
]

// Declare the variable
export const usageDeclarationRequiredCountries = ["US", "MX", "PH", "AR", "HT", "CV"]

// 8.3 Länder, wo keine Benutzungserklärung erforderlich ist
// Alle Länder, die nicht in mandatoryUsageDeclarationCountries oder onRequestUsageDeclarationCountries enthalten sind
export function getNoUsageDeclarationRequiredCountries(): string[] {
  const allCountryCodes = [
    ...wipoMemberCountries,
    ...euipoMemberCountries,
    ...aripoMemberCountries,
    ...oapiMemberCountries,
    ...boipMemberCountries,
    ...gccMemberCountries,
    // Organisationscodes
    "EM",
    "IB",
    "AP",
    "OA",
    "BX",
    "GC",
    // Andere Länder, die nicht in Organisationen sind
    "AD",
    "AO",
    "BS",
    "BB",
    "BZ",
    "BO",
    "CR",
    "DO",
    "EC",
    "SV",
    "FJ",
    "GT",
    "HN",
    "HT",
    "IQ",
    "JM",
    "JO",
    "LB",
    "MT",
    "NI",
    "PA",
    "PG",
    "PY",
    "PR",
    "SB",
    "TO",
    "VU",
    "WS",
    "YE",
    // Asiatische Länder
    "BN",
    "KH",
    "LA",
    "MM",
    "SG",
    "TH",
    "VN",
  ]

  // Entferne Duplikate
  const uniqueCountryCodes = [...new Set(allCountryCodes)]

  // Filtere Länder, die bereits in den anderen Kategorien sind
  return uniqueCountryCodes.filter(
    (code) => !mandatoryUsageDeclarationCountries.includes(code) && !onRequestUsageDeclarationCountries.includes(code),
  )
}

// Funktion zum Abrufen der Benutzungserklärungsanforderung für ein Land
export function getUsageDeclarationRequirement(countryCode: string): "mandatory" | "on_request" | "not_required" {
  if (mandatoryUsageDeclarationCountries.includes(countryCode)) {
    return "mandatory"
  }

  if (onRequestUsageDeclarationCountries.includes(countryCode)) {
    return "on_request"
  }

  return "not_required"
}

// Nach der Gruppe 8.3 Länder, wo keine Benutzungserklärung erforderlich ist, fügen wir folgende Gruppen hinzu:

// 9. LÄNDER NACH BENUTZUNGSNACHWEIS- UND BENUTZUNGSERKLÄRUNGSFRISTEN

// 9.1 Länder, wo Benutzungsnachweis mit der Verlängerung fällig ist
export const usageProofWithRenewalCountries = [
  "US", // Vereinigte Staaten
  "CA", // Kanada
  "MX", // Mexiko
]

// 9.2 Länder mit Sonderfällen für Benutzungserklärungen
export const specialUsageDeclarationCountries = [
  "US", // USA mit mehreren Fristen (5, 10, 20, 30, 40, 50 Jahre)
  "HT", // Haiti mit 6-Jahres-Frist
]

// 9.3 Länder mit ähnlichen Vorfristen für die Einreichung der Benutzungserklärung
// 9.3.1 Länder mit 12-monatiger Vorfrist
export const twelveMonthsUsageDeclarationPeriodCountries = [
  "US", // Vereinigte Staaten
  "CA", // Kanada
]

// 9.3.2 Länder mit 6-monatiger Vorfrist
export const sixMonthsUsageDeclarationPeriodCountries = [
  "MX", // Mexiko
  "AR", // Argentinien
  "PH", // Philippinen
  "CV", // Kap Verde
]

// 9.3.3 Länder mit 3-monatiger Vorfrist
export const threeMonthsUsageDeclarationPeriodCountries = [
  "BR", // Brasilien
  "CO", // Kolumbien
  "PE", // Peru
]

// 9.4 Sonderfälle mit Vorfristen für die Einreichung der Benutzungserklärung
export const specialUsageDeclarationPeriodCountries: Record<string, number> = {
  US: 12, // USA: 12 Monate vor Fälligkeit
  MX: 6, // Mexiko: 6 Monate vor Fälligkeit
  AR: 6, // Argentinien: 6 Monate vor Fälligkeit
  PH: 6, // Philippinen: 6 Monate vor Fälligkeit
  BR: 3, // Brasilien: 3 Monate vor Fälligkeit
  CO: 3, // Kolumbien: 3 Monate vor Fälligkeit
  PE: 3, // Peru: 3 Monate vor Fälligkeit
  HT: 6, // Haiti: 6 Monate vor Fälligkeit
  CV: 6, // Kap Verde: 6 Monate vor Fälligkeit
}

// 9.5 Länder mit ähnlichen Zuschlagsfristen für die Einreichung von Benutzungserklärungen
// 9.5.1 Länder mit 6-monatiger Zuschlagsfrist
export const sixMonthsUsageDeclarationGracePeriodCountries = [
  "US", // Vereinigte Staaten
  "MX", // Mexiko
  "AR", // Argentinien
  "PH", // Philippinen
  "CV", // Kap Verde
]

// 9.5.2 Länder mit 3-monatiger Zuschlagsfrist
export const threeMonthsUsageDeclarationGracePeriodCountries = [
  "BR", // Brasilien
  "CO", // Kolumbien
  "PE", // Peru
]

// 9.5.3 Länder mit 12-monatiger Zuschlagsfrist
export const twelveMonthsUsageDeclarationGracePeriodCountries = [
  "HT", // Haiti
]

// 9.6 Sonderfälle mit Zuschlagsfristen für die Einreichung der Benutzungserklärung
export const specialUsageDeclarationGracePeriodCountries: Record<string, number> = {
  US: 6, // USA: 6 Monate Nachfrist
  MX: 6, // Mexiko: 6 Monate Nachfrist
  AR: 6, // Argentinien: 6 Monate Nachfrist
  PH: 6, // Philippinen: 6 Monate Nachfrist
  BR: 3, // Brasilien: 3 Monate Nachfrist
  CO: 3, // Kolumbien: 3 Monate Nachfrist
  PE: 3, // Peru: 3 Monate Nachfrist
  HT: 12, // Haiti: 12 Monate Nachfrist
  CV: 6, // Kap Verde: 6 Monate Nachfrist
}

// Hilfsfunktionen für die neuen Gruppen

// Funktion zum Abrufen der Vorfrist für die Einreichung der Benutzungserklärung
export function getUsageDeclarationPeriod(countryCode: string): number {
  // Prüfe, ob das Land eine spezielle Vorfrist hat
  if (countryCode in specialUsageDeclarationPeriodCountries) {
    return specialUsageDeclarationPeriodCountries[countryCode]
  }

  // Prüfe, ob das Land in einer der Standardgruppen ist
  if (twelveMonthsUsageDeclarationPeriodCountries.includes(countryCode)) {
    return 12
  }
  if (sixMonthsUsageDeclarationPeriodCountries.includes(countryCode)) {
    return 6
  }
  if (threeMonthsUsageDeclarationPeriodCountries.includes(countryCode)) {
    return 3
  }

  // Standard: 6 Monate Vorfrist
  return 6
}

// Funktion zum Abrufen der Zuschlagsfrist für die Einreichung der Benutzungserklärung
export function getUsageDeclarationGracePeriod(countryCode: string): number {
  // Prüfe, ob das Land eine spezielle Zuschlagsfrist hat
  if (countryCode in specialUsageDeclarationGracePeriodCountries) {
    return specialUsageDeclarationGracePeriodCountries[countryCode]
  }

  // Prüfe, ob das Land in einer der Standardgruppen ist
  if (twelveMonthsUsageDeclarationGracePeriodCountries.includes(countryCode)) {
    return 12
  }
  if (sixMonthsUsageDeclarationGracePeriodCountries.includes(countryCode)) {
    return 6
  }
  if (threeMonthsUsageDeclarationGracePeriodCountries.includes(countryCode)) {
    return 3
  }

  // Standard: 6 Monate Zuschlagsfrist
  return 6
}

// Funktion zum Prüfen, ob Benutzungsnachweis mit der Verlängerung fällig ist
export function isUsageProofWithRenewal(countryCode: string): boolean {
  return usageProofWithRenewalCountries.includes(countryCode)
}

// Funktion zum Prüfen, ob es sich um einen Sonderfall für Benutzungserklärungen handelt
export function isSpecialUsageDeclarationCase(countryCode: string): boolean {
  return specialUsageDeclarationCountries.includes(countryCode)
}

// Erweiterte Typ-Definition für Benutzungserklärungsdetails
export type ExtendedUsageDeclarationDetails = {
  required: boolean
  type: string
  deadlineYears: number[] | null
  periodMonths: number // Vorfrist in Monaten
  graceMonths: number // Zuschlagsfrist in Monaten
  withRenewal: boolean // Ob mit Verlängerung fällig
  isSpecialCase: boolean // Ob Sonderfall
}

// Erweiterte Funktion zum Abrufen der Benutzungserklärungsdetails
export function getExtendedUsageDeclarationDetails(countryCode: string): ExtendedUsageDeclarationDetails {
  // Basis-Details
  const baseDetails = getUsageDeclarationDetails(countryCode)

  // Erweiterte Details
  return {
    ...baseDetails,
    periodMonths: getUsageDeclarationPeriod(countryCode),
    graceMonths: getUsageDeclarationGracePeriod(countryCode),
    withRenewal: isUsageProofWithRenewal(countryCode),
    isSpecialCase: isSpecialUsageDeclarationCase(countryCode),
  }
}

/**
 * Checks if a country code is in a specific category
 * @param countryCode The country code to check
 * @param category The category array to check against
 * @returns True if the country is in the category, false otherwise
 */
export function isInCategory(countryCode: string, category: string[]): boolean {
  return category.includes(countryCode)
}

/**
 * Gets the calculation basis for a country
 * @param countryCode The country code to check
 * @returns The calculation basis ("application" or "registration")
 */
export function getCalculationBasis(countryCode: string): string {
  // Check if the country is in the application-based list
  if (applicationBasedCountries.includes(countryCode)) {
    return "application"
  }

  // Check if the country is in the registration-based list
  if (registrationBasedCountries.includes(countryCode)) {
    return "registration"
  }

  // Default to application-based if not found in either list
  return "application"
}

export function getPriorityDeadlineMonths(countryCode: string): number {
  // Standard priority deadline is 6 months for most countries
  const standardDeadline = 6

  // Special cases with non-standard deadlines
  const specialDeadlines: Record<string, number> = {
    IN: 9, // India
    PH: 8, // Philippines
  }

  if (countryCode in specialDeadlines) {
    return specialDeadlines[countryCode]
  }

  // Default to standard deadline
  return standardDeadline
}

export function getPriorityDocumentDeadlineMonths(countryCode: string): number {
  // Standard priority document deadline is 3 months for most countries
  const standardDeadline = 3

  // Special cases with non-standard deadlines
  const specialDeadlines: Record<string, number> = {
    IN: 4, // India
    PH: 4, // Philippines
  }

  if (countryCode in specialDeadlines) {
    return specialDeadlines[countryCode]
  }

  // Default to standard deadline
  return standardDeadline
}

export function getProtectionPeriod(countryCode: string): number {
  // Länder mit 7-jähriger Schutzdauer
  if (sevenYearTermCountries.includes(countryCode)) {
    return 7
  }

  // Länder mit 15-jähriger Schutzdauer
  if (fifteenYearTermCountries.includes(countryCode)) {
    return 15
  }

  // Standard: 10 Jahre für die meisten Länder
  return 10
}

// Länder mit umfassender Prüfung
export const comprehensiveExaminationCountries = [
  // WIPO-Länder
  "DE",
  "FR",
  "GB",
  "IT",
  "ES",
  "CH",
  "JP",
  "KR",
  "CN",
  "RU",
  "CA",
  "AU",
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "GR",
  "HR",
  "HU",
  "IE",
  "LT",
  "LU",
  "LV",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
  "NO",
  "IS",
  "LI",

  // Andere Länder
  "BR",
  "NZ",

  // Organisationscodes
  "EM",
]

// Länder mit beschränkter Prüfung
export const limitedExaminationCountries = [
  // WIPO-Länder
  "US",
  "SG",
  "MY",
  "TH",
  "VN",

  // Andere Länder
  "MX",
  "AE",
  "QA",
  "SA",
]

export function getPrufungsumfang(countryCode: string): string {
  // Länder mit umfassender Prüfung
  if (comprehensiveExaminationCountries.includes(countryCode)) {
    return "Umfassend"
  }

  // Länder mit beschränkter Prüfung
  if (limitedExaminationCountries.includes(countryCode)) {
    return "Beschränkt"
  }

  // Spezialfälle
  const specialExaminationScopes: Record<string, string> = {
    IN: "Umfassend mit Besonderheiten", // Indien
    HK: "Beschränkt mit Besonderheiten", // Hongkong
  }

  if (countryCode in specialExaminationScopes) {
    return specialExaminationScopes[countryCode]
  }

  // Standard: Umfassende Prüfung
  return "Umfassend"
}

// Typ für Verlängerungsfristen
export type RenewalPeriods = {
  renewalStartMonths: number
  renewalDeadlineMonths: number
  lateRenewalMonths: number
}

export function getRenewalPeriods(countryCode: string): RenewalPeriods {
  // Standard-Verlängerungsfristen
  const defaultRenewalPeriods: RenewalPeriods = {
    renewalStartMonths: 6, // 6 Monate vor Ablauf
    renewalDeadlineMonths: 0, // Bis zum Ablauftag
    lateRenewalMonths: 6, // 6 Monate Nachfrist
  }

  // Spezialfälle mit abweichenden Verlängerungsfristen
  const specialRenewalPeriods: Record<string, RenewalPeriods> = {
    US: {
      renewalStartMonths: 12, // 12 Monate vor Ablauf
      renewalDeadlineMonths: 0,
      lateRenewalMonths: 6,
    },
    CN: {
      renewalStartMonths: 12, // 12 Monate vor Ablauf
      renewalDeadlineMonths: 0,
      lateRenewalMonths: 6,
    },
    JP: {
      renewalStartMonths: 6,
      renewalDeadlineMonths: 0,
      lateRenewalMonths: 6,
    },
    IN: {
      renewalStartMonths: 6,
      renewalDeadlineMonths: 0,
      lateRenewalMonths: 12, // 12 Monate Nachfrist
    },
    AE: {
      renewalStartMonths: 12, // 12 Monate vor Ablauf
      renewalDeadlineMonths: 0,
      lateRenewalMonths: 6, // Geändert von 3 auf 6 Monate Nachfrist
    },
    BR: {
      renewalStartMonths: 12, // 12 Monate vor Ablauf
      renewalDeadlineMonths: 0,
      lateRenewalMonths: 6,
    },
    AU: {
      renewalStartMonths: 12, // 12 Monate vor Ablauf
      renewalDeadlineMonths: 0,
      lateRenewalMonths: 6,
    },
  }

  // Prüfe, ob das Land spezielle Verlängerungsfristen hat
  if (countryCode in specialRenewalPeriods) {
    return specialRenewalPeriods[countryCode]
  }

  // Standard-Verlängerungsfristen
  return defaultRenewalPeriods
}

// Länder, die einen Vertreter erfordern
export const representativeRequiredCountries = [
  // WIPO-Länder
  "BR",
  "CN",
  "JP",
  "KR",
  "IN",
  "ID",
  "PH",
  "TW",
  "KH",
  "LA",
  "MM",
  "MN",

  // Andere Länder
  "AR",
  "CL",
  "CO",
  "EC",
  "MX",
  "PE",
  "UY",
  "VE",
  "PK",
  "AE",
  "SA",
  "BH",
  "IQ",
  "IR",
  "JO",
  "KW",
  "LB",
  "OM",
  "QA",
  "SY",
  "YE",
  "ZA",
  "EG",
  "DZ",
  "AO",
  "BW",
  "ET",
  "GH",
  "KE",
  "LY",
  "MA",
  "MZ",
  "NA",
  "NG",
  "SN",
  "TN",
  "TZ",
  "UG",
  "ZM",
  "ZW",

  // Organisationscodes
  "AP",
  "OA",
  "GC",
]

// Länder, die keinen Vertreter erfordern
export const representativeNotRequiredCountries = [
  // WIPO-Länder
  "DE",
  "FR",
  "GB",
  "IT",
  "ES",
  "CH",
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "GR",
  "HR",
  "HU",
  "IE",
  "LT",
  "LU",
  "LV",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
  "NO",
  "IS",
  "LI",
  "MC",
  "SM",
  "AU",
  "NZ",

  // Andere Länder
  "VA",
  "AD",
  "AL",
  "BA",
  "ME",
  "MK",
  "RS",
]

// Länder, die einen Vertreter nur für ausländische Anmelder erfordern
export const representativeForForeignersCountries = [
  // WIPO-Länder
  "US",
  "CA",
  "SG",
  "MY",
  "TH",
  "VN",

  // Organisationscodes
  "EM",
  "BX",
]

export function getRepresentativeRequired(countryCode: string): string {
  // Länder, die einen Vertreter erfordern
  if (representativeRequiredCountries.includes(countryCode)) {
    return "Ja"
  }

  // Länder, die keinen Vertreter erfordern
  if (representativeNotRequiredCountries.includes(countryCode)) {
    return "Nein"
  }

  // Länder, die einen Vertreter nur für ausländische Anmelder erfordern
  if (representativeForForeignersCountries.includes(countryCode)) {
    return "Ausländer"
  }

  // Standard: Vertreter erforderlich
  return "Ja"
}

// Länder, in denen Widerspruch möglich ist
export const oppositionPossibleCountries = [
  // WIPO-Länder
  "DE",
  "FR",
  "GB",
  "IT",
  "ES",
  "CH",
  "JP",
  "KR",
  "CN",
  "RU",
  "CA",
  "AU",
  "US",
  "SG",
  "MY",
  "TH",
  "VN",
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "GR",
  "HR",
  "HU",
  "IE",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
  "NO",
  "IS",
  "LI",

  // Andere Länder
  "MX",
  "AE",
  "QA",
  "SA",
  "AR",
  "CL",
  "CO",
  "PE",
  "EC",
  "UY",
  "PY",
  "BO",
  "VE",
  "BR",
  "NZ",

  // Organisationscodes
  "EM",
]

// Länder, in denen kein Widerspruch möglich ist
export const oppositionNotPossibleCountries = ["DJ", "ER"]

export function getWiderspruch(countryCode: string): string {
  // Länder, in denen Widerspruch möglich ist
  if (oppositionPossibleCountries.includes(countryCode)) {
    return "Ja"
  }

  // Länder, in denen kein Widerspruch möglich ist
  if (oppositionNotPossibleCountries.includes(countryCode)) {
    return "Nein"
  }

  // Standard: Widerspruch möglich
  return "Ja"
}

// Länder, die einen Benutzungsnachweis erfordern
export const usageProofRequiredCountries = [
  // WIPO-Länder
  "US",
  "DE",
  "FR",
  "GB",
  "IT",
  "ES",
  "CH",
  "JP",
  "KR",
  "CN",
  "RU",
  "CA",
  "IN",
  "MY",
  "TW",
  "VN",

  // Andere Länder
  "MX",
  "PH",
  "AR",
  "ZA",
  "ID",

  // Organisationscodes
  "EM",
]

// Typ für Benutzungsnachweisdetails
export type UsageProofDetails = {
  required: boolean
  type: string
  deadlineYears: number | string
}

export function getUsageProofDetails(countryCode: string): UsageProofDetails {
  // Standard: Kein Benutzungsnachweis erforderlich
  const defaultUsageProofDetails: UsageProofDetails = {
    required: false,
    type: "Keine regelmäßige Benutzungserklärung erforderlich",
    deadlineYears: 0,
  }

  // Prüfe, ob das Land einen Benutzungsnachweis erfordert
  if (usageProofRequiredCountries.includes(countryCode)) {
    // Spezialfälle
    const specialUsageProofDetails: Record<string, UsageProofDetails> = {
      US: {
        required: true,
        type: "Declaration of Use",
        deadlineYears: 5,
      },
      MX: {
        required: true,
        type: "Declaración de Uso",
        deadlineYears: 3,
      },
      PH: {
        required: true,
        type: "Declaration of Actual Use",
        deadlineYears: 3,
      },
      AR: {
        required: true,
        type: "Declaración de Uso",
        deadlineYears: 5,
      },
      EM: {
        required: true,
        type: "Benutzungsnachweis",
        deadlineYears: 5,
      },
      DE: {
        required: true,
        type: "Benutzungsnachweis",
        deadlineYears: 5,
      },
      JP: {
        required: true,
        type: "Benutzungsnachweis",
        deadlineYears: 3,
      },
      CN: {
        required: true,
        type: "Benutzungsnachweis",
        deadlineYears: 3,
      },
      IN: {
        required: true,
        type: "Benutzungsnachweis",
        deadlineYears: 3,
      },
    }

    if (countryCode in specialUsageProofDetails) {
      return specialUsageProofDetails[countryCode]
    }

    // Standard für Länder, die einen Benutzungsnachweis erfordern
    return {
      required: true,
      type: "Nachweis nur auf Antrag Dritter erforderlich",
      deadlineYears: 5,
    }
  }

  // Standard: Kein Benutzungsnachweis erforderlich
  return defaultUsageProofDetails
}

// Typ für Benutzungserklärungsdetails
export type UsageDeclarationDetails = {
  required: boolean
  type: string
  deadlineYears: number[] | null
}

export function getUsageDeclarationDetails(countryCode: string): UsageDeclarationDetails {
  // Standard: Keine Benutzungserklärung erforderlich
  const defaultUsageDeclarationDetails: UsageDeclarationDetails = {
    required: false,
    type: "Keine regelmäßige Benutzungserklärung erforderlich",
    deadlineYears: null,
  }

  // Prüfe, ob das Land eine Benutzungserklärung erfordert
  if (usageDeclarationRequiredCountries.includes(countryCode)) {
    // Spezialfälle
    const specialUsageDeclarationDetails: Record<string, UsageDeclarationDetails> = {
      US: {
        required: true,
        type: "Declaration of Use",
        deadlineYears: [5, 10, 20, 30, 40, 50],
      },
      MX: {
        required: true,
        type: "Declaración de Uso",
        deadlineYears: [3],
      },
      PH: {
        required: true,
        type: "Declaration of Actual Use",
        deadlineYears: [3],
      },
      AR: {
        required: true,
        type: "Declaración de Uso",
        deadlineYears: [5],
      },
      HT: {
        required: true,
        type: "Declaration of Use",
        deadlineYears: [6],
      },
      CV: {
        required: true,
        type: "Declaração de Uso",
        deadlineYears: [5],
      },
    }

    if (countryCode in specialUsageDeclarationDetails) {
      return specialUsageDeclarationDetails[countryCode]
    }

    // Standard für Länder, die eine Benutzungserklärung erfordern
    return {
      required: true,
      type: "Benutzungserklärung erforderlich",
      deadlineYears: [5],
    }
  }

  // Standard: Keine Benutzungserklärung erforderlich
  return defaultUsageDeclarationDetails
}

// Kategorisierung nach Vollmacht (POA) Erfordernissen
export const poaDigitalCopyAcceptedCountries: string[] = [
  // WIPO-Länder
  "DE",
  "FR",
  "GB",
  "IT",
  "ES",
  "CH",
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "GR",
  "HR",
  "HU",
  "IE",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
  "NO",
  "IS",
  "LI",
  "US",
  "CA",
  "AU",
  "NZ",
  "JP",
  "KR",
  "SG",
  "MY",
  "TH",
  "VN",

  // Andere Länder
  "GE",
]

export const poaOriginalRequiredCountries: string[] = [
  // WIPO-Länder
  "BR",
  "CN",
  "IN",
  "ID",
  "PH",
  "TW",
  "KH",
  "LA",
  "MM",
  "MN",

  // Andere Länder
  "AR",
  "CL",
  "CO",
  "PE",
  "EC",
  "UY",
  "PY",
  "BO",
  "VE",
  "PK",
  "AE",
  "SA",
  "BH",
  "IL",
  "IQ",
  "IR",
  "JO",
  "KW",
  "LB",
  "OM",
  "QA",
  "SY",
  "YE",
  "ZA",
  "EG",
  "DZ",
  "AO",
  "BW",
  "ET",
  "GH",
  "KE",
  "LY",
  "MA",
  "MZ",
  "NA",
  "NG",
  "SN",
  "TN",
  "TZ",
  "UG",
  "ZM",
  "ZW",
  "BZ",
]

export const poaDigitalSignatureAcceptedCountries: string[] = [
  // WIPO-Länder
  "DE",
  "FR",
  "GB",
  "IT",
  "ES",
  "CH",
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "GR",
  "HR",
  "HU",
  "IE",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
  "NO",
  "IS",
  "LI",
  "US",
  "CA",
  "AU",
  "NZ",
  "JP",
  "KR",
  "SG",
  "MY",
  "TH",
  "VN",

  // Andere Länder
  "GE",
]

export const poaNotarizationRequiredCountries: string[] = [
  // WIPO-Länder
  "BR",
  "CN",
  "IN",
  "ID",
  "PH",
  "TW",
  "KH",
  "LA",
  "MM",
  "MN",

  // Andere Länder
  "AR",
  "CL",
  "CO",
  "PE",
  "EC",
  "UY",
  "PY",
  "BO",
  "VE",
  "PK",
  "AE",
  "SA",
  "BH",
  "IL",
  "IQ",
  "IR",
  "JO",
  "KW",
  "LB",
  "OM",
  "QA",
  "SY",
  "YE",
  "ZA",
  "EG",
  "DZ",
  "AO",
  "BW",
  "ET",
  "GH",
  "KE",
  "LY",
  "MA",
  "MZ",
  "NA",
  "NG",
  "SN",
  "TN",
  "TZ",
  "UG",
  "ZM",
  "ZW",
  "BZ",
]

export const poaApostilleRequiredCountries: string[] = [
  // WIPO-Länder
  "BR",
  "CN",
  "IN",
  "ID",
  "PH",
  "TW",
  "KH",
  "LA",
  "MM",
  "MN",

  // Andere Länder
  "AR",
  "CL",
  "CO",
  "PE",
  "EC",
  "UY",
  "PY",
  "BO",
  "VE",
  "PK",
  "AE",
  "SA",
  "BH",
  "IL",
  "IQ",
  "IR",
  "JO",
  "KW",
  "LB",
  "OM",
  "QA",
  "SY",
  "YE",
  "ZA",
  "EG",
  "DZ",
  "AO",
  "BW",
  "ET",
  "GH",
  "KE",
  "LY",
  "MA",
  "MZ",
  "NA",
  "NG",
  "SN",
  "TN",
  "TZ",
  "UG",
  "ZM",
  "ZW",
  "BZ",
]

// Typ für Länderregeln
export type CountryRules = {
  calculationBasis: "application" | "registration"
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

// Funktion zum Abrufen der Regeln für ein bestimmtes Land
export function _getCountryRules(countryCode: string): CountryRules & { memberships?: string[] } {
  // Basis-Regeln für das Land
  const baseRules: CountryRules = {
    calculationBasis: getCalculationBasis(countryCode) as "application" | "registration",
    protectionPeriod: getProtectionPeriod(countryCode),
    renewalPeriod: getProtectionPeriod(countryCode), // Verlängerungsperiode entspricht der Schutzdauer
    ...getRenewalPeriods(countryCode),
    usageProofRequired: usageProofRequiredCountries.includes(countryCode),
    usageProofYears: getUsageProofDetails(countryCode).required
      ? Number(getUsageProofDetails(countryCode).deadlineYears)
      : 0,
    usageDeclarationRequired: usageDeclarationRequiredCountries.includes(countryCode),
    usageDeclarationYears: getUsageDeclarationDetails(countryCode).deadlineYears || [],
    vertreterRequired: getRepresentativeRequired(countryCode),
    prufungsumfang: getPrufungsumfang(countryCode),
    widerspruch: getWiderspruch(countryCode),
    poaNotarization: poaNotarizationRequiredCountries.includes(countryCode) ? "Ja" : "Nein",
    poaApostille: poaApostilleRequiredCountries.includes(countryCode) ? "Ja" : "Nein",
    priorityDeadlineMonths: getPriorityDeadlineMonths(countryCode),
  }

  // Füge Mitgliedschaften hinzu
  return {
    ...baseRules,
    memberships: getMemberships(countryCode),
  }
}

// Definiere Basisländer für verschiedene Regionen
export const baseCountries = {
  EU: "DE", // Deutschland als Basis für EU-Länder
  NA: "US", // USA als Basis für nordamerikanische Länder
  SA: "BR", // Brasilien als Basis für südamerikanische Länder
  ASIA: "JP", // Japan als Basis für asiatische Länder
  AFRICA: "ZA", // Südafrika als Basis für afrikanische Länder
  OCEANIA: "AU", // Australien als Basis für ozeanische Länder
  MIDDLE_EAST: "AE", // VAE als Basis für Länder im Nahen Osten
  WIPO: "IB", // WIPO als Basis für internationale Registrierungen
  EUIPO: "EM", // EUIPO als Basis für EU-Marken
  ARIPO: "AP", // ARIPO als Basis für afrikanische Regionalmarken
  OAPI: "OA", // OAPI als Basis für afrikanische Regionalmarken
  BENELUX: "BX", // Benelux als Basis für Benelux-Marken
  GCC: "GC", // GCC als Basis für Golf-Kooperationsrat-Marken
}

// Funktion zum Abrufen des Basislandes für ein bestimmtes Land
export function getBaseCountry(countryCode: string): string {
  // Prüfe, ob das Land selbst ein Basisland ist
  for (const [region, baseCountry] of Object.entries(baseCountries)) {
    if (countryCode === baseCountry) {
      return countryCode
    }
  }

  // Ordne das Land einer Region zu und gib das entsprechende Basisland zurück
  const europeanCountries = [
    "DE",
    "FR",
    "GB",
    "IT",
    "ES",
    "CH",
    "AT",
    "BE",
    "BG",
    "CY",
    "CZ",
    "DK",
    "EE",
    "FI",
    "GR",
    "HR",
    "HU",
    "IE",
    "LT",
    "LU",
    "LV",
    "MT",
    "NL",
    "PL",
    "PT",
    "RO",
    "SE",
    "SI",
    "SK",
    "NO",
    "IS",
    "LI",
    "MC",
    "SM",
    "VA",
    "AD",
    "AL",
    "BA",
    "ME",
    "MK",
    "RS",
    "UA",
    "BY",
    "MD",
    "RU",
    "TR",
  ]

  const northAmericanCountries = ["US", "CA", "MX", "CR", "CU", "DO", "GT", "HN", "HT", "JM", "NI", "PA", "SV", "TT"]

  const southAmericanCountries = ["BR", "AR", "CL", "CO", "PE", "EC", "UY", "PY", "BO", "VE", "GY", "SR"]

  const asianCountries = [
    "JP",
    "KR",
    "CN",
    "HK",
    "ID",
    "IN",
    "MY",
    "PH",
    "SG",
    "TH",
    "TW",
    "VN",
    "KH",
    "LA",
    "MM",
    "MN",
    "PK",
  ]

  const africanCountries = [
    "ZA",
    "EG",
    "DZ",
    "AO",
    "BW",
    "CV",
    "ET",
    "GH",
    "KE",
    "LY",
    "MA",
    "MU",
    "MZ",
    "NA",
    "NG",
    "SN",
    "TN",
    "TZ",
    "UG",
    "ZM",
    "ZW",
  ]

  const oceanianCountries = ["AU", "NZ", "FJ", "PG", "SB", "TO", "VU", "WS"]

  const middleEasternCountries = ["AE", "SA", "BH", "IL", "IQ", "IR", "JO", "KW", "LB", "OM", "QA", "SY", "YE"]

  const internationalOrganizations = ["EM", "IB", "AP", "OA", "BX", "GC"]

  if (europeanCountries.includes(countryCode)) {
    return baseCountries.EU
  } else if (northAmericanCountries.includes(countryCode)) {
    return baseCountries.NA
  } else if (southAmericanCountries.includes(countryCode)) {
    return baseCountries.SA
  } else if (asianCountries.includes(countryCode)) {
    return baseCountries.ASIA
  } else if (africanCountries.includes(countryCode)) {
    return baseCountries.AFRICA
  } else if (oceanianCountries.includes(countryCode)) {
    return baseCountries.OCEANIA
  } else if (middleEasternCountries.includes(countryCode)) {
    return baseCountries.MIDDLE_EAST
  } else if (countryCode === "EM") {
    return baseCountries.EUIPO
  } else if (countryCode === "IB") {
    return baseCountries.WIPO
  } else if (countryCode === "AP") {
    return baseCountries.ARIPO
  } else if (countryCode === "OA") {
    return baseCountries.OAPI
  } else if (countryCode === "BX") {
    return baseCountries.BENELUX
  } else if (countryCode === "GC") {
    return baseCountries.GCC
  }

  // Standard: Deutschland als Basis
  return baseCountries.EU
}

// Funktion zum Abrufen der Regeln für ein Land basierend auf seinem Basisland
export function getCountryRulesFromBase(countryCode: string): CountryRules & { memberships?: string[] } {
  // Bestimme das Basisland
  const baseCountryCode = getBaseCountry(countryCode)

  // Wenn das Land selbst ein Basisland ist, gib seine eigenen Regeln zurück
  if (countryCode === baseCountryCode) {
    return _getCountryRules(countryCode)
  }

  // Hole die Regeln des Basislandes
  const baseRules = _getCountryRules(baseCountryCode)

  // Hole die spezifischen Überschreibungen für das Land
  const overrides = getCountryOverrides(countryCode)

  // Kombiniere die Basisregeln mit den Überschreibungen
  return {
    ...baseRules,
    ...overrides,
  }
}

// Funktion zum Abrufen der Überschreibungen für ein bestimmtes Land
export function getCountryOverrides(countryCode: string): Partial<CountryRules> {
  // Spezifische Überschreibungen für bestimmte Länder
  const countryOverrides: Record<string, Partial<CountryRules>> = {
    // Nordamerika
    CA: {
      renewalStartMonths: 6, // Abweichung von US-Regeln
    },
    MX: {
      usageDeclarationRequired: true,
      usageDeclarationYears: [3],
    },
    HT: {
      usageDeclarationRequired: true,
      usageDeclarationYears: [6],
    },

    // Asien
    SG: {
      calculationBasis: "application",
    },
    TH: {
      calculationBasis: "application",
    },
    VN: {
      calculationBasis: "application",
    },
    ID: {
      protectionPeriod: 7,
      renewalPeriod: 7,
    },
    PK: {
      protectionPeriod: 7,
      renewalPeriod: 7,
    },
    IN: {
      lateRenewalMonths: 12,
      priorityDeadlineMonths: 9,
    },
    PH: {
      usageDeclarationRequired: true,
      usageDeclarationYears: [3],
      priorityDeadlineMonths: 8,
    },

    // Afrika
    CV: {
      usageDeclarationRequired: true,
      usageDeclarationYears: [5],
    },

    // Südamerika
    CL: {
      usageProofRequired: false,
    },
    VE: {
      protectionPeriod: 15,
      renewalPeriod: 15,
    },

    // Naher Osten
    SA: {
      lateRenewalMonths: 6, // Längere Nachfrist als VAE
    },
    BH: {
      lateRenewalMonths: 6,
    },
    IL: {
      lateRenewalMonths: 6,
    },
    IQ: {
      lateRenewalMonths: 6,
    },
    IR: {
      lateRenewalMonths: 6,
    },
    JO: {
      lateRenewalMonths: 6,
    },
    KW: {
      lateRenewalMonths: 6,
    },
    LB: {
      lateRenewalMonths: 6,
    },
    OM: {
      lateRenewalMonths: 6,
    },
    QA: {
      lateRenewalMonths: 6,
    },
    SY: {
      lateRenewalMonths: 6,
    },
    YE: {
      lateRenewalMonths: 6,
    },

    // Ozeanien
    NZ: {
      renewalStartMonths: 6,
    },
    FJ: {
      renewalStartMonths: 6,
    },
    PG: {
      renewalStartMonths: 6,
    },
    SB: {
      renewalStartMonths: 6,
    },
    TO: {
      renewalStartMonths: 6,
    },
    VU: {
      renewalStartMonths: 6,
    },
    WS: {
      renewalStartMonths: 6,
    },
  }

  // Gib die Überschreibungen für das Land zurück, falls vorhanden
  return countryCode in countryOverrides ? countryOverrides[countryCode] : {}
}

// EU-Mitgliedsregeln als Referenz
export const euMemberRules = {
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
}

// Funktion zum Überprüfen der Mitgliedschaft in einer Organisation
export function isMemberOf(countryCode: string, organization: string): boolean {
  switch (organization.toLowerCase()) {
    case "wipo":
    case "madrid":
      return wipoMemberCountries.includes(countryCode)
    case "euipo":
    case "eu":
      return euipoMemberCountries.includes(countryCode)
    case "aripo":
      return aripoMemberCountries.includes(countryCode)
    case "oapi":
      return oapiMemberCountries.includes(countryCode)
    case "boip":
    case "benelux":
      return boipMemberCountries.includes(countryCode)
    case "gcc":
      return gccMemberCountries.includes(countryCode)
    default:
      return false
  }
}

// Funktion zum Abrufen aller Organisationen, in denen ein Land Mitglied ist
export function getMemberships(countryCode: string): string[] {
  const memberships: string[] = []

  if (wipoMemberCountries.includes(countryCode)) memberships.push("WIPO")
  if (euipoMemberCountries.includes(countryCode)) memberships.push("EUIPO")
  if (aripoMemberCountries.includes(countryCode)) memberships.push("ARIPO")
  if (oapiMemberCountries.includes(countryCode)) memberships.push("OAPI")
  if (boipMemberCountries.includes(countryCode)) memberships.push("BOIP")
  if (gccMemberCountries.includes(countryCode)) memberships.push("GCC")

  return memberships
}

// Füge diese Funktion hinzu, um die Registrierungsart basierend auf dem Land zu bestimmen
export function getRegistrationType(
  countryCode: string,
): "direct" | "wipo" | "euipo" | "aripo" | "oapi" | "boip" | "gcc" {
  // Spezielle Organisationscodes
  if (countryCode === "EM") return "euipo"
  if (countryCode === "IB") return "wipo"
  if (countryCode === "AP") return "aripo"
  if (countryCode === "OA") return "oapi"
  if (countryCode === "BX") return "boip"
  if (countryCode === "GC") return "gcc"

  // Standard: direkte Anmeldung
  return "direct"
}

// Erweitere die getCountryRules-Funktion, um auch die Mitgliedschaften zu berücksichtigen
export function getCountryRules(countryCode: string): CountryRules & { memberships?: string[] } {
  return getCountryRulesFromBase(countryCode)
}

// Nach der Gruppe 9.6 fügen wir eine neue Gruppe hinzu:

// 9.7 Länder mit unterschiedlichen Fristen im ersten und in folgenden Markenzyklen
export const differentCycleRequirementsCountries = [
  "US", // USA: Im ersten Zyklus 5-Jahres-Erklärung, danach mit Verlängerung (10, 20, 30 Jahre)
  "PH", // Philippinen: Im ersten Zyklus 3-Jahres-Erklärung, danach mit Verlängerung
  "MX", // Mexiko: Im ersten Zyklus 3-Jahres-Erklärung, danach mit Verlängerung
  "AR", // Argentinien: Im ersten Zyklus 5-Jahres-Erklärung, danach keine regelmäßige Erklärung
]

// 9.7.1 Länder mit speziellen Anforderungen im ersten Zyklus
export const firstCycleSpecialRequirementsCountries: Record<
  string,
  {
    years: number[]
    description: string
  }
> = {
  US: {
    years: [5],
    description: "Declaration of Use nach 5 Jahren im ersten Zyklus, danach mit Verlängerung (10, 20, 30 Jahre)",
  },
  PH: {
    years: [3],
    description: "Declaration of Actual Use nach 3 Jahren im ersten Zyklus, danach mit Verlängerung",
  },
  MX: {
    years: [3],
    description: "Declaración de Uso nach 3 Jahren im ersten Zyklus, danach mit Verlängerung",
  },
  AR: {
    years: [5],
    description: "Declaración de Uso nach 5 Jahren im ersten Zyklus, danach keine regelmäßige Erklärung erforderlich",
  },
}

// 9.7.2 Länder mit speziellen Anforderungen in folgenden Zyklen
export const subsequentCyclesSpecialRequirementsCountries: Record<
  string,
  {
    years: number[]
    description: string
  }
> = {
  US: {
    years: [10, 20, 30, 40, 50],
    description: "Declaration of Use mit jeder Verlängerung (10, 20, 30, 40, 50 Jahre)",
  },
  PH: {
    years: [10, 20, 30, 40, 50],
    description: "Declaration of Actual Use mit jeder Verlängerung",
  },
  MX: {
    years: [10, 20, 30, 40, 50],
    description: "Declaración de Uso mit jeder Verlängerung",
  },
  AR: {
    years: [],
    description: "Keine regelmäßige Benutzungserklärung in Folgezyklen erforderlich",
  },
}

// Hilfsfunktion zum Prüfen, ob ein Land unterschiedliche Anforderungen in verschiedenen Zyklen hat
export function hasDifferentCycleRequirements(countryCode: string): boolean {
  return differentCycleRequirementsCountries.includes(countryCode)
}

// Hilfsfunktion zum Abrufen der speziellen Anforderungen im ersten Zyklus
export function getFirstCycleRequirements(countryCode: string): { years: number[]; description: string } | null {
  if (countryCode in firstCycleSpecialRequirementsCountries) {
    return firstCycleSpecialRequirementsCountries[countryCode]
  }
  return null
}

// Hilfsfunktion zum Abrufen der speziellen Anforderungen in folgenden Zyklen
export function getSubsequentCyclesRequirements(countryCode: string): { years: number[]; description: string } | null {
  if (countryCode in subsequentCyclesSpecialRequirementsCountries) {
    return subsequentCyclesSpecialRequirementsCountries[countryCode]
  }
  return null
}

// Erweiterte Typ-Definition für Benutzungserklärungsdetails mit Zyklusunterschieden
export type CycleAwareUsageDeclarationDetails = ExtendedUsageDeclarationDetails & {
  hasDifferentCycleRequirements: boolean
  firstCycleRequirements: { years: number[]; description: string } | null
  subsequentCyclesRequirements: { years: number[]; description: string } | null
}

// Erweiterte Funktion zum Abrufen der Benutzungserklärungsdetails mit Zyklusunterschieden
export function getCycleAwareUsageDeclarationDetails(countryCode: string): CycleAwareUsageDeclarationDetails {
  // Basis-Details
  const baseDetails = getExtendedUsageDeclarationDetails(countryCode)

  // Erweiterte Details mit Zyklusunterschieden
  return {
    ...baseDetails,
    hasDifferentCycleRequirements: hasDifferentCycleRequirements(countryCode),
    firstCycleRequirements: getFirstCycleRequirements(countryCode),
    subsequentCyclesRequirements: getSubsequentCyclesRequirements(countryCode),
  }
}
