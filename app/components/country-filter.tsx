"use client"

import type React from "react"

import { useState } from "react"
import type { CountryData } from "../data/countries"
import { filterCountries } from "../utils/country-analyzer"

interface CountryFilterProps {
  countries: CountryData[]
  onFilterChange: (filteredCountries: CountryData[]) => void
}

export function CountryFilter({ countries, onFilterChange }: CountryFilterProps) {
  const [filters, setFilters] = useState({
    calculationBasis: "",
    protectionPeriod: "",
    renewalPeriod: "",
    usageProofRequired: "",
    region: "",
    registrationType: "",
    vertreterRequired: "",
    prufungsumfang: "",
    widerspruch: "",
  })

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target

    const newFilters = {
      ...filters,
      [name]: value,
    }

    setFilters(newFilters)

    // Konvertiere die Filter in das richtige Format für die filterCountries-Funktion
    const formattedFilters: any = {}

    if (newFilters.calculationBasis) {
      formattedFilters.calculationBasis = newFilters.calculationBasis as "application" | "registration"
    }

    if (newFilters.protectionPeriod) {
      formattedFilters.protectionPeriod = Number.parseInt(newFilters.protectionPeriod)
    }

    if (newFilters.renewalPeriod) {
      formattedFilters.renewalPeriod = Number.parseInt(newFilters.renewalPeriod)
    }

    if (newFilters.usageProofRequired) {
      formattedFilters.usageProofRequired = newFilters.usageProofRequired === "true"
    }

    if (newFilters.region) {
      formattedFilters.region = newFilters.region
    }

    if (newFilters.registrationType) {
      formattedFilters.registrationType = newFilters.registrationType
    }

    if (newFilters.vertreterRequired) {
      formattedFilters.vertreterRequired = newFilters.vertreterRequired
    }

    if (newFilters.prufungsumfang) {
      formattedFilters.prufungsumfang = newFilters.prufungsumfang
    }

    if (newFilters.widerspruch) {
      formattedFilters.widerspruch = newFilters.widerspruch
    }

    const filteredCountries = filterCountries(countries, formattedFilters)
    onFilterChange(filteredCountries)
  }

  // Extrahiere eindeutige Werte für die Dropdown-Menüs
  const uniqueRegions = [...new Set(countries.map((c) => c.region))].sort()
  const uniqueCalculationBases = [...new Set(countries.map((c) => c.calculationBasis))]
  const uniqueProtectionPeriods = [...new Set(countries.map((c) => c.protectionPeriod))].sort((a, b) => a - b)
  const uniqueRenewalPeriods = [...new Set(countries.map((c) => c.renewalPeriod))].sort((a, b) => a - b)
  const uniqueRegistrationTypes = [...new Set(countries.map((c) => c.registrationType))].sort()

  // Extrahiere eindeutige Werte für die zusätzlichen Filter
  const uniqueVertreterRequired = [...new Set(countries.map((c) => c.vertreterRequired).filter(Boolean))].sort()
  const uniquePrufungsumfang = [...new Set(countries.map((c) => c.prufungsumfang).filter(Boolean))].sort()
  const uniqueWiderspruch = [...new Set(countries.map((c) => c.widerspruch).filter(Boolean))].sort()

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Länder filtern</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Region Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <select
            name="region"
            value={filters.region}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Alle Regionen</option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Berechnungsbasis Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Berechnungsbasis</label>
          <select
            name="calculationBasis"
            value={filters.calculationBasis}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Alle</option>
            {uniqueCalculationBases.map((basis) => (
              <option key={basis} value={basis}>
                {basis === "application" ? "Anmeldung" : "Eintragung"}
              </option>
            ))}
          </select>
        </div>

        {/* Schutzdauer Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Schutzdauer (Jahre)</label>
          <select
            name="protectionPeriod"
            value={filters.protectionPeriod}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Alle</option>
            {uniqueProtectionPeriods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>

        {/* Verlängerungszeitraum Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Verlängerungszeitraum (Jahre)</label>
          <select
            name="renewalPeriod"
            value={filters.renewalPeriod}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Alle</option>
            {uniqueRenewalPeriods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>

        {/* Benutzungsnachweis Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Benutzungsnachweis erforderlich</label>
          <select
            name="usageProofRequired"
            value={filters.usageProofRequired}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Alle</option>
            <option value="true">Ja</option>
            <option value="false">Nein</option>
          </select>
        </div>

        {/* Registrierungstyp Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Registrierungstyp</label>
          <select
            name="registrationType"
            value={filters.registrationType}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Alle</option>
            {uniqueRegistrationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Vertreter erforderlich Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vertreter erforderlich</label>
          <select
            name="vertreterRequired"
            value={filters.vertreterRequired}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Alle</option>
            {uniqueVertreterRequired.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Prüfungsumfang Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prüfungsumfang</label>
          <select
            name="prufungsumfang"
            value={filters.prufungsumfang}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Alle</option>
            {uniquePrufungsumfang.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Widerspruch Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Widerspruch</label>
          <select
            name="widerspruch"
            value={filters.widerspruch}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Alle</option>
            {uniqueWiderspruch.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
