"use client"

import { Button } from "@/components/ui/button"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { countriesData, getBaseCountryCode } from "./data/countries"

interface CountrySelectProps {
  value: string
  onChange: (value: string) => void
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  // Ändern Sie die Implementierung der CountrySelect-Komponente, um sie zu vereinfachen
  // Ersetzen Sie die komplexe Gruppierung durch eine einfache alphabetische Liste

  // Sortiere die Länder alphabetisch nach Namen
  const sortedCountries = React.useMemo(() => {
    return [...countriesData].sort((a, b) => a.country.localeCompare(b.country, "de"))
  }, [])

  // Filter countries based on search query
  const filteredCountries = React.useMemo(() => {
    if (!searchQuery) return sortedCountries

    const lowerQuery = searchQuery.toLowerCase()
    return sortedCountries.filter((country) => {
      const baseCode = getBaseCountryCode(country.code)
      // Suche sowohl im Ländernamen als auch im Ländercode
      return country.country.toLowerCase().includes(lowerQuery) || baseCode.toLowerCase().includes(lowerQuery)
    })
  }, [sortedCountries, searchQuery])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-9 text-sm" /* Kleinerer Button und Text */
        >
          {value ? countriesData.find((country) => country.code === value)?.country : "Land auswählen..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> {/* Kleineres Icon */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        {" "}
        {/* Schmaler */}
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Land oder Kürzel suchen..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-9 text-sm" /* Kleineres Eingabefeld und Text */
          />
          <CommandList className="max-h-[250px]">
            {" "}
            {/* Niedrigere Liste */}
            <CommandEmpty className="text-sm py-2">Kein Land gefunden.</CommandEmpty> {/* Kleinerer Text und Abstand */}
            {filteredCountries.map((country) => {
              const baseCode = getBaseCountryCode(country.code)
              return (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={() => {
                    onChange(country.code === value ? "" : country.code)
                    setOpen(false)
                  }}
                  className="text-sm py-2" /* Kleinerer Text und Abstand */
                >
                  <Check className={cn("mr-2 h-4 w-4", value === country.code ? "opacity-100" : "opacity-0")} />{" "}
                  {/* Kleineres Icon und Abstand */}
                  {country.country}
                  <span className="ml-2 text-xs text-muted-foreground">{baseCode}</span>{" "}
                  {/* Kleinerer Text und Abstand */}
                </CommandItem>
              )
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
