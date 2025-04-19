"use client"

import { useState } from "react"
import type { CountryData } from "../data/countries"
import { compareCountries } from "../utils/country-analyzer"

interface CountryComparisonProps {
  countries: CountryData[]
}

export function CountryComparison({ countries }: CountryComparisonProps) {
  const [country1, setCountry1] = useState("")
  const [country2, setCountry2] = useState("")
  const [comparisonResult, setComparisonResult] = useState<Record<string, { country1: any; country2: any }> | null>(
    null,
  )

  const handleCompare = () => {
    const selectedCountry1 = countries.find((c) => c.code === country1)
    const selectedCountry2 = countries.find((c) => c.code === country2)

    if (selectedCountry1 && selectedCountry2) {
      const result = compareCountries(selectedCountry1, selectedCountry2)
      setComparisonResult(result)
    }
  }

  // Sortiere die Länder alphabetisch nach Namen
  const sortedCountries = [...countries].sort((a, b) => a.country.localeCompare(b.country))

  // Übersetze die Eigenschaftsnamen für die Anzeige
  const propertyTranslations: Record<string, string> = {
    calculationBasis: "Berechnungsbasis",
    protectionPeriod: "Schutzdauer (Jahre)",
    renewalPeriod: "Verlängerungszeitraum (Jahre)",
    renewalStartMonths: "Verlängerung möglich ab (Monate)",
    renewalDeadlineMonths: "Verlängerungsfrist (Monate)",
    lateRenewalMonths: "Nachfrist (Monate)",
    usageProofRequired: "Benutzungsnachweis erforderlich",
    usageProofYears: "Benutzungsnachweis nach (Jahre)",
    usageDeclarationRequired: "Benutzungserklärung erforderlich",
    registrationType: "Registrierungstyp",
    vertreterRequired: "Vertreter erforderlich",
    prufungsumfang: "Prüfungsumfang",
    widerspruch: "Widerspruch",
    poaNotarization: "Vollmacht Notarisierung",
    poaApostille: "Vollmacht Apostille",
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Ländervergleich</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Land 1</label>
          <select
            value={country1}
            onChange={(e) => setCountry1(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Land auswählen</option>
            {sortedCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.country} ({country.code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Land 2</label>
          <select
            value={country2}
            onChange={(e) => setCountry2(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Land auswählen</option>
            {sortedCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.country} ({country.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleCompare}
        disabled={!country1 || !country2}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Vergleichen
      </button>

      {comparisonResult && Object.keys(comparisonResult).length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Unterschiede:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Eigenschaft</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    {countries.find((c) => c.code === country1)?.country} ({country1})
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    {countries.find((c) => c.code === country2)?.country} ({country2})
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(comparisonResult).map(([property, values]) => (
                  <tr key={property} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {propertyTranslations[property] || property}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {typeof values.country1 === "boolean" ? (values.country1 ? "Ja" : "Nein") : values.country1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {typeof values.country2 === "boolean" ? (values.country2 ? "Ja" : "Nein") : values.country2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : comparisonResult && Object.keys(comparisonResult).length === 0 ? (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
          Die ausgewählten Länder haben keine Unterschiede in den verglichenen Eigenschaften.
        </div>
      ) : null}
    </div>
  )
}
