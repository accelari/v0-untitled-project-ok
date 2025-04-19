"use client"

import type { ReactNode } from "react"
import { countriesData } from "../../data/countries"
import { getAllValuesForProperty } from "../../data/country-groups"

// Gemeinsame Eigenschaften für alle Ländergruppen-Komponenten
export const propertyOptions: Array<{ key: string; label: string }> = [
  { key: "calculationBasis", label: "Berechnungsbasis" },
  { key: "protectionPeriod", label: "Schutzdauer" },
  { key: "renewalPeriod", label: "Verlängerungszeitraum" },
  { key: "renewalStartMonths", label: "Verlängerungsfrist" },
  { key: "renewalDeadlineMonths", label: "Verlängerungsdeadline" },
  { key: "lateRenewalMonths", label: "Nachfrist" },
  { key: "usageProofRequired", label: "Benutzungsnachweis erforderlich" },
  { key: "usageProofYears", label: "Benutzungsnachweisfrist" },
  { key: "usageDeclarationRequired", label: "Benutzungserklärung erforderlich" },
  { key: "usageDeclarationYears", label: "Benutzungserklärungsjahre" },
  { key: "vertreterRequired", label: "Vertretererfordernis" },
  { key: "prufungsumfang", label: "Prüfungsumfang" },
  { key: "widerspruch", label: "Widerspruch" },
  { key: "poaVertreterRequired", label: "Vollmacht Vertreter erforderlich" },
  { key: "poaDigitalCopy", label: "Vollmacht Digitalkopie" },
  { key: "poaOriginalRequired", label: "Vollmacht Original erforderlich" },
  { key: "poaDigitalSignature", label: "Vollmacht Digitale Signatur" },
  { key: "poaNotarization", label: "Vollmacht Notarisierung" },
  { key: "poaApostille", label: "Vollmacht Apostille" },
  { key: "priorityDeadlineMonths", label: "Prioritätsfrist" },
  { key: "priorityDocumentDeadlineMonths", label: "Prioritätsdokumentenfrist" },
  { key: "usageProofDeadlineYears", label: "Benutzungsnachweisfrist" },
  { key: "usageDeclarationDeadlineYears", label: "Benutzungserklärungsfrist" },
  { key: "lateFilingMonths", label: "Nacheinreichungsfrist" },
  { key: "filingPeriodStart", label: "Einreichungszeitraum-Start" },
  { key: "membership", label: "Mitgliedschaften" },
]

// Formatiere den Wert für die Anzeige
export function formatValue(value: string): string {
  if (value === "true") return "Ja"
  if (value === "false") return "Nein"
  if (value === "undefined") return "Nicht definiert"
  return value
}

// Gemeinsame Komponente für die Anzeige von Länderlisten
export function CountryList({ countryCodes }: { countryCodes: string[] }) {
  const countries = countryCodes.map((code) => countriesData.find((c) => c.code === code)).filter(Boolean)

  return (
    <>
      {countryCodes.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Suchergebnisse ({countryCodes.length} Länder)</h2>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Länderkürzel:</h3>
            <div className="flex flex-wrap gap-2">
              {countryCodes.map((code) => (
                <span key={code} className="bg-gray-100 px-2 py-1 rounded">
                  {code}
                </span>
              ))}
            </div>
          </div>

          {countries.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Länderliste:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Land</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Region</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countries.map((country) => (
                      <tr key={country?.code} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-medium">{country?.code}</td>
                        <td className="border border-gray-300 px-4 py-2">{country?.country}</td>
                        <td className="border border-gray-300 px-4 py-2">{country?.region}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

// Gemeinsame Komponente für Property-Selektoren
export function PropertySelector({
  label,
  value,
  onChange,
  properties = propertyOptions,
  disabled = [],
  includeEmpty = false,
  emptyLabel = "Eigenschaft auswählen",
}: {
  label: string
  value: string
  onChange: (value: string) => void
  properties?: Array<{ key: string; label: string }>
  disabled?: string[]
  includeEmpty?: boolean
  emptyLabel?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        {includeEmpty && (
          <option value="" disabled>
            {emptyLabel}
          </option>
        )}
        {properties
          .filter((prop) => !disabled.includes(prop.key))
          .map((prop) => (
            <option key={prop.key} value={prop.key}>
              {prop.label}
            </option>
          ))}
      </select>
    </div>
  )
}

// Gemeinsame Komponente für Value-Selektoren
export function ValueSelector({
  label,
  property,
  value,
  onChange,
  includeCount = false,
  countGetter,
  includeEmpty = true,
  emptyLabel = "Wert auswählen",
}: {
  label: string
  property: string
  value: string
  onChange: (value: string) => void
  includeCount?: boolean
  countGetter?: (property: string, value: string) => number
  includeEmpty?: boolean
  emptyLabel?: string
}) {
  const possibleValues = property ? getAllValuesForProperty(property as any) : []

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
        disabled={!property}
      >
        {includeEmpty && <option value="">{emptyLabel}</option>}
        {possibleValues.map((val) => (
          <option key={val} value={val}>
            {formatValue(val)}
            {includeCount && countGetter && ` (${countGetter(property, val)} Länder)`}
          </option>
        ))}
      </select>
    </div>
  )
}

// Container-Komponente für einheitliches Layout
export function GroupContainer({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">{children}</div>
    </div>
  )
}
