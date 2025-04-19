"use client"

import { useState } from "react"
import { allCountryGroups } from "../data/country-groups"
import { GroupContainer, PropertySelector, ValueSelector, CountryList } from "./shared/country-group-base"

export default function CountryGroupViewer() {
  const [selectedProperty, setSelectedProperty] = useState<keyof typeof allCountryGroups>("calculationBasis")
  const [selectedValue, setSelectedValue] = useState<string>("")

  // Hole die Länderkürzel für den ausgewählten Wert
  const countryCodes = selectedValue ? allCountryGroups[selectedProperty][selectedValue] || [] : []

  // Hilfsfunktion für die Anzahl der Länder
  const getCountryCount = (property: string, value: string) => {
    return allCountryGroups[property as keyof typeof allCountryGroups][value]?.length || 0
  }

  return (
    <GroupContainer title="Ländergruppen-Viewer">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <PropertySelector
          label="Eigenschaft"
          value={selectedProperty}
          onChange={(value) => {
            setSelectedProperty(value as keyof typeof allCountryGroups)
            setSelectedValue("")
          }}
        />

        <ValueSelector
          label="Wert"
          property={selectedProperty}
          value={selectedValue}
          onChange={setSelectedValue}
          includeCount={true}
          countGetter={getCountryCount}
        />
      </div>

      {selectedValue && <CountryList countryCodes={countryCodes} />}
    </GroupContainer>
  )
}
