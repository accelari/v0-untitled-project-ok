"use client"

import type { CountryData } from "../data/countries"
import { findExtremeCountries, groupCountriesBy } from "../utils/country-analyzer"

interface CountryStatisticsProps {
  countries: CountryData[]
}

export function CountryStatistics({ countries }: CountryStatisticsProps) {
  // Gruppiere Länder nach Region
  const regionGroups = groupCountriesBy(countries, "region")

  // Gruppiere Länder nach Berechnungsbasis
  const calculationBasisGroups = groupCountriesBy(countries, "calculationBasis")

  // Gruppiere Länder nach Schutzdauer
  const protectionPeriodGroups = groupCountriesBy(countries, "protectionPeriod")

  // Finde Länder mit extremen Werten
  const extremeCountries = findExtremeCountries(countries)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Länderstatistiken</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regionsverteilung */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Verteilung nach Region</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Region</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Anzahl Länder</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Prozent</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(regionGroups).map(([region, regionCountries]) => (
                  <tr key={region} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">{region}</td>
                    <td className="border border-gray-300 px-4 py-2">{regionCountries.length}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {((regionCountries.length / countries.length) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold">
                  <td className="border border-gray-300 px-4 py-2">Gesamt</td>
                  <td className="border border-gray-300 px-4 py-2">{countries.length}</td>
                  <td className="border border-gray-300 px-4 py-2">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Berechnungsbasis-Verteilung */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Verteilung nach Berechnungsbasis</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Berechnungsbasis</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Anzahl Länder</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Prozent</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(calculationBasisGroups).map(([basis, basisCountries]) => (
                  <tr key={basis} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {basis === "application" ? "Anmeldung" : basis === "registration" ? "Eintragung" : basis}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{basisCountries.length}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {((basisCountries.length / countries.length) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schutzdauer-Verteilung */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Verteilung nach Schutzdauer</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Schutzdauer (Jahre)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Anzahl Länder</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Prozent</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(protectionPeriodGroups)
                  .sort((a, b) => Number.parseInt(a[0]) - Number.parseInt(b[0]))
                  .map(([period, periodCountries]) => (
                    <tr key={period} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-medium">{period}</td>
                      <td className="border border-gray-300 px-4 py-2">{periodCountries.length}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {((periodCountries.length / countries.length) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Extreme Werte */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Extreme Werte</h3>

          <div className="mb-4">
            <h4 className="font-medium mb-1">
              Länder mit der längsten Schutzdauer ({extremeCountries.longestProtectionPeriod.value} Jahre):
            </h4>
            <ul className="list-disc list-inside pl-2">
              {extremeCountries.longestProtectionPeriod.countries.map((country) => (
                <li key={country.code}>
                  {country.country} ({country.code})
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-1">
              Länder mit der kürzesten Schutzdauer ({extremeCountries.shortestProtectionPeriod.value} Jahre):
            </h4>
            <ul className="list-disc list-inside pl-2">
              {extremeCountries.shortestProtectionPeriod.countries.map((country) => (
                <li key={country.code}>
                  {country.country} ({country.code})
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-1">
              Länder mit der längsten Nachfrist ({extremeCountries.longestLateRenewal.value} Monate):
            </h4>
            <ul className="list-disc list-inside pl-2">
              {extremeCountries.longestLateRenewal.countries.map((country) => (
                <li key={country.code}>
                  {country.country} ({country.code})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
