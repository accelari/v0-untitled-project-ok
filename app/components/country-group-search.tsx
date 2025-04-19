"use client"

import { useState } from "react"
import {
  getCountriesMatchingCriteria,
  getCountriesInMultipleGroups,
  getCountriesInAnyGroup,
  getCountriesInOneGroupButNotAnother,
  getCountriesWithSimilarProperties,
  getCountriesWithUnusualValues,
  getCountriesWithExtremeValues,
  allCountryGroups,
  getAllValuesForProperty,
} from "../data/country-groups"
import { countriesData } from "../data/countries"
import {
  GroupContainer,
  PropertySelector,
  CountryList,
  propertyOptions,
  formatValue,
} from "./shared/country-group-base"

export default function CountryGroupSearch() {
  const [searchType, setSearchType] = useState<
    | "matchingCriteria"
    | "multipleGroups"
    | "anyGroup"
    | "oneGroupNotAnother"
    | "similarProperties"
    | "unusualValues"
    | "extremeValues"
  >("matchingCriteria")
  const [criteria, setCriteria] = useState<Record<string, string>>({})
  const [groups, setGroups] = useState<Array<{ property: string; value: string }>>([])
  const [includeGroup, setIncludeGroup] = useState<{ property: string; value: string }>({ property: "", value: "" })
  const [excludeGroup, setExcludeGroup] = useState<{ property: string; value: string }>({ property: "", value: "" })
  const [referenceCountry, setReferenceCountry] = useState("")
  const [properties, setProperties] = useState<string[]>([])
  const [similarityThreshold, setSimilarityThreshold] = useState(0.7)
  const [unusualProperty, setUnusualProperty] = useState("")
  const [unusualThreshold, setUnusualThreshold] = useState(0.1)
  const [extremeProperty, setExtremeProperty] = useState("")
  const [extremeType, setExtremeType] = useState<"min" | "max">("max")
  const [memberships, setMemberships] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<string[]>([])

  // Führe die Suche durch
  const performSearch = () => {
    let results: string[] = []

    switch (searchType) {
      case "matchingCriteria":
        results = getCountriesMatchingCriteria(criteria as any)
        break
      case "multipleGroups":
        results = getCountriesInMultipleGroups(groups as any)
        break
      case "anyGroup":
        results = getCountriesInAnyGroup(groups as any)
        break
      case "oneGroupNotAnother":
        results = getCountriesInOneGroupButNotAnother(includeGroup as any, excludeGroup as any)
        break
      case "similarProperties":
        results = getCountriesWithSimilarProperties(referenceCountry, properties as any, similarityThreshold)
        break
      case "unusualValues":
        results = getCountriesWithUnusualValues(unusualProperty as any, unusualThreshold)
        break
      case "extremeValues":
        results = getCountriesWithExtremeValues(extremeProperty as any, extremeType)
        break
    }

    setSearchResults(results)
  }

  // Hilfsfunktionen für die Verwaltung von Kriterien und Gruppen
  const addCriterion = (property: string, value: string) => {
    setCriteria((prev) => ({ ...prev, [property]: value }))
  }

  const removeCriterion = (property: string) => {
    setCriteria((prev) => {
      const newCriteria = { ...prev }
      delete newCriteria[property]
      return newCriteria
    })
  }

  const addGroup = (property: string, value: string) => {
    setGroups((prev) => [...prev, { property, value }])
  }

  const removeGroup = (index: number) => {
    setGroups((prev) => prev.filter((_, i) => i !== index))
  }

  const addProperty = (property: string) => {
    if (property && !properties.includes(property)) {
      setProperties((prev) => [...prev, property])
    }
  }

  const removeProperty = (property: string) => {
    setProperties((prev) => prev.filter((p) => p !== property))
  }

  const addMembership = (membership: string) => {
    if (membership && !memberships.includes(membership)) {
      setMemberships((prev) => [...prev, membership])
    }
  }

  const removeMembership = (membership: string) => {
    setMemberships((prev) => prev.filter((m) => m !== membership))
  }

  // Render-Funktionen für die verschiedenen Suchtypen
  const renderMatchingCriteriaSearch = () => (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Kriterien</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Eigenschaft</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => {
              const property = e.target.value
              const values = getAllValuesForProperty(property as any)
              if (values.length > 0) {
                addCriterion(property, values[0])
              }
            }}
            value=""
          >
            <option value="" disabled>
              Eigenschaft auswählen
            </option>
            {propertyOptions
              .filter((prop) => !Object.keys(criteria).includes(prop.key))
              .map((prop) => (
                <option key={prop.key} value={prop.key}>
                  {prop.label}
                </option>
              ))}
          </select>
        </div>
      </div>

      {Object.entries(criteria).map(([property, value]) => (
        <div key={property} className="flex items-center mb-2">
          <span className="mr-2">{propertyOptions.find((p) => p.key === property)?.label || property}:</span>
          <select
            value={value}
            onChange={(e) => addCriterion(property, e.target.value)}
            className="p-1 border border-gray-300 rounded-md mr-2"
          >
            {getAllValuesForProperty(property as any).map((val) => (
              <option key={val} value={val}>
                {formatValue(val)}
              </option>
            ))}
          </select>
          <button
            onClick={() => removeCriterion(property)}
            className="text-red-600 hover:text-red-800"
            title="Entfernen"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )

  const renderGroupSearch = () => (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Gruppen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Eigenschaft</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => {
              const property = e.target.value
              const values = getAllValuesForProperty(property as any)
              if (values.length > 0) {
                addGroup(property, values[0])
              }
            }}
            value=""
          >
            <option value="" disabled>
              Eigenschaft auswählen
            </option>
            {propertyOptions.map((prop) => (
              <option key={prop.key} value={prop.key}>
                {prop.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {groups.map((group, index) => (
        <div key={index} className="flex items-center mb-2">
          <span className="mr-2">
            {propertyOptions.find((p) => p.key === group.property)?.label || group.property}:
          </span>
          <select
            value={group.value}
            onChange={(e) => {
              const newGroups = [...groups]
              newGroups[index] = { ...newGroups[index], value: e.target.value }
              setGroups(newGroups)
            }}
            className="p-1 border border-gray-300 rounded-md mr-2"
          >
            {getAllValuesForProperty(group.property as any).map((val) => (
              <option key={val} value={val}>
                {formatValue(val)}
              </option>
            ))}
          </select>
          <button onClick={() => removeGroup(index)} className="text-red-600 hover:text-red-800" title="Entfernen">
            ✕
          </button>
        </div>
      ))}
    </div>
  )

  const renderOneGroupNotAnotherSearch = () => (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Gruppen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Einschließen: Eigenschaft</label>
          <select
            value={includeGroup.property}
            onChange={(e) => setIncludeGroup({ property: e.target.value, value: "" })}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          >
            <option value="" disabled>
              Eigenschaft auswählen
            </option>
            {propertyOptions.map((prop) => (
              <option key={prop.key} value={prop.key}>
                {prop.label}
              </option>
            ))}
          </select>

          {includeGroup.property && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Einschließen: Wert</label>
              <select
                value={includeGroup.value}
                onChange={(e) => setIncludeGroup({ ...includeGroup, value: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Wert auswählen
                </option>
                {getAllValuesForProperty(includeGroup.property as any).map((val) => (
                  <option key={val} value={val}>
                    {formatValue(val)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ausschließen: Eigenschaft</label>
          <select
            value={excludeGroup.property}
            onChange={(e) => setExcludeGroup({ property: e.target.value, value: "" })}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          >
            <option value="" disabled>
              Eigenschaft auswählen
            </option>
            {propertyOptions.map((prop) => (
              <option key={prop.key} value={prop.key}>
                {prop.label}
              </option>
            ))}
          </select>

          {excludeGroup.property && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ausschließen: Wert</label>
              <select
                value={excludeGroup.value}
                onChange={(e) => setExcludeGroup({ ...excludeGroup, value: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Wert auswählen
                </option>
                {getAllValuesForProperty(excludeGroup.property as any).map((val) => (
                  <option key={val} value={val}>
                    {formatValue(val)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderSimilarPropertiesSearch = () => (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Ähnliche Eigenschaften</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Referenzland</label>
          <select
            value={referenceCountry}
            onChange={(e) => setReferenceCountry(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Land auswählen
            </option>
            {countriesData.map((country) => (
              <option key={country.code} value={country.code}>
                {country.country} ({country.code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ähnlichkeitsschwelle</label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={similarityThreshold}
            onChange={(e) => setSimilarityThreshold(Number.parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center">{similarityThreshold * 100}%</div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Zu vergleichende Eigenschaften</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => {
            if (e.target.value) {
              addProperty(e.target.value)
            }
          }}
          value=""
        >
          <option value="" disabled>
            Eigenschaft auswählen
          </option>
          {propertyOptions
            .filter((prop) => !properties.includes(prop.key))
            .map((prop) => (
              <option key={prop.key} value={prop.key}>
                {prop.label}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {properties.map((property) => (
          <div key={property} className="bg-gray-100 px-2 py-1 rounded flex items-center">
            <span className="mr-2">{propertyOptions.find((p) => p.key === property)?.label || property}</span>
            <button
              onClick={() => removeProperty(property)}
              className="text-red-600 hover:text-red-800"
              title="Entfernen"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderUnusualValuesSearch = () => (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Ungewöhnliche Werte</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <PropertySelector
          label="Eigenschaft"
          value={unusualProperty}
          onChange={setUnusualProperty}
          includeEmpty={true}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ungewöhnlichkeitsschwelle</label>
          <input
            type="range"
            min="0.01"
            max="0.5"
            step="0.01"
            value={unusualThreshold}
            onChange={(e) => setUnusualThreshold(Number.parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center">{unusualThreshold * 100}%</div>
        </div>
      </div>
    </div>
  )

  const renderExtremeValuesSearch = () => (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Extreme Werte</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Eigenschaft</label>
          <select
            value={extremeProperty}
            onChange={(e) => setExtremeProperty(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Eigenschaft auswählen
            </option>
            {propertyOptions
              .filter((prop) =>
                [
                  "protectionPeriod",
                  "renewalPeriod",
                  "renewalStartMonths",
                  "lateRenewalMonths",
                  "usageProofYears",
                  "priorityDeadlineMonths",
                  "priorityDocumentDeadlineMonths",
                ].includes(prop.key),
              )
              .map((prop) => (
                <option key={prop.key} value={prop.key}>
                  {prop.label}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Extremtyp</label>
          <select
            value={extremeType}
            onChange={(e) => setExtremeType(e.target.value as "min" | "max")}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="min">Minimum</option>
            <option value="max">Maximum</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderMembershipsSearch = () => (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Mitgliedschaften</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Mitgliedschaft</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => {
            if (e.target.value && !memberships.includes(e.target.value)) {
              addMembership(e.target.value)
            }
          }}
          value=""
        >
          <option value="" disabled>
            Mitgliedschaft auswählen
          </option>
          {Object.keys(allCountryGroups.membership)
            .filter((membership) => !memberships.includes(membership))
            .map((membership) => (
              <option key={membership} value={membership}>
                {membership}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {memberships.map((membership) => (
          <div key={membership} className="bg-gray-100 px-2 py-1 rounded flex items-center">
            <span className="mr-2">{membership}</span>
            <button
              onClick={() => removeMembership(membership)}
              className="text-red-600 hover:text-red-800"
              title="Entfernen"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <GroupContainer title="Ländergruppen-Suche">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Suchtyp</label>
        <select
          value={searchType}
          onChange={(e) =>
            setSearchType(
              e.target.value as
                | "matchingCriteria"
                | "multipleGroups"
                | "anyGroup"
                | "oneGroupNotAnother"
                | "similarProperties"
                | "unusualValues"
                | "extremeValues",
            )
          }
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="matchingCriteria">Länder mit bestimmten Kriterien</option>
          <option value="multipleGroups">Länder in mehreren Gruppen</option>
          <option value="anyGroup">Länder in mindestens einer Gruppe</option>
          <option value="oneGroupNotAnother">Länder in einer Gruppe, aber nicht in einer anderen</option>
          <option value="similarProperties">Länder mit ähnlichen Eigenschaften</option>
          <option value="unusualValues">Länder mit ungewöhnlichen Werten</option>
          <option value="extremeValues">Länder mit extremen Werten</option>
        </select>
      </div>

      {/* Suchoptionen basierend auf dem ausgewählten Suchtyp */}
      {searchType === "matchingCriteria" && renderMatchingCriteriaSearch()}
      {(searchType === "multipleGroups" || searchType === "anyGroup") && renderGroupSearch()}
      {searchType === "oneGroupNotAnother" && renderOneGroupNotAnotherSearch()}
      {searchType === "similarProperties" && renderSimilarPropertiesSearch()}
      {searchType === "unusualValues" && renderUnusualValuesSearch()}
      {searchType === "extremeValues" && renderExtremeValuesSearch()}

      <button onClick={performSearch} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        Suchen
      </button>

      {searchResults.length > 0 && <CountryList countryCodes={searchResults} />}
    </GroupContainer>
  )
}
