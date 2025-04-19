"use client"

import { useState } from "react"
import { countriesData, type CountryData } from "../data/countries"
import { CountryFilter } from "../components/country-filter"
import { CountryComparison } from "../components/country-comparison"
import { CountryStatistics } from "../components/country-statistics"

export default function CountryAnalysisPage() {
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>(countriesData)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Länderanalyse</h1>

      <div className="space-y-8">
        {/* Filter-Komponente */}
        <CountryFilter countries={countriesData} onFilterChange={setFilteredCountries} />

        {/* Ergebnisanzeige */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Gefilterte Länder ({filteredCountries.length})</h2>

          {filteredCountries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Land</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Region</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Berechnungsbasis</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Schutzdauer</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Verlängerung</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Benutzungsnachweis</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCountries.map((country) => (
                    <tr key={country.code} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-medium">{country.code}</td>
                      <td className="border border-gray-300 px-4 py-2">{country.country}</td>
                      <td className="border border-gray-300 px-4 py-2">{country.region}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {country.calculationBasis === "application" ? "Anmeldung" : "Eintragung"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{country.protectionPeriod} Jahre</td>
                      <td className="border border-gray-300 px-4 py-2">{country.renewalPeriod} Jahre</td>
                      <td className="border border-gray-300 px-4 py-2">{country.usageProofRequired ? "Ja" : "Nein"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">Keine Länder gefunden, die den Filterkriterien entsprechen.</p>
          )}
        </div>

        {/* Ländervergleich */}
        <CountryComparison countries={countriesData} />

        {/* Statistiken */}
        <CountryStatistics countries={countriesData} />
      </div>
    </div>
  )
}
