"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { de } from "date-fns/locale"
import { getDaysInMonth, startOfMonth, getDay, addMonths, setMonth, setYear } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CustomCalendarProps {
  selected?: Date
  onSelect?: (date: Date) => void
  disabled?: (date: Date) => boolean
  defaultMonth?: Date
  className?: string
}

export function CustomCalendar({
  selected,
  onSelect,
  disabled,
  defaultMonth = new Date(),
  className,
}: CustomCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(defaultMonth || new Date())
  const [isMonthPickerOpen, setIsMonthPickerOpen] = React.useState(false)
  const [isYearPickerOpen, setIsYearPickerOpen] = React.useState(false)
  const yearPickerRef = React.useRef<HTMLDivElement>(null)

  // Generate array of months for the dropdown
  const months = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date()
      date.setMonth(i)
      return {
        value: i.toString(),
        label: date.toLocaleString(de, { month: "long" }),
      }
    })
  }, [])

  // Generate array of years from 1900 to current year + 50
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear()
    const startYear = 1900
    const endYear = currentYear + 50
    const yearCount = endYear - startYear + 1

    return Array.from({ length: yearCount }, (_, i) => {
      const year = startYear + i
      return {
        value: year.toString(),
        label: year.toString(),
      }
    })
  }, [])

  // Scroll to current year when year picker opens
  React.useEffect(() => {
    if (isYearPickerOpen && yearPickerRef.current) {
      // Kurze Verzögerung hinzufügen, um sicherzustellen, dass das DOM aktualisiert wurde
      setTimeout(() => {
        const currentYearElement = yearPickerRef.current?.querySelector(`[data-year="${currentDate.getFullYear()}"]`)
        if (currentYearElement) {
          // Sofort zum ausgewählten Jahr scrollen, sobald die Jahresauswahl geöffnet wird
          currentYearElement.scrollIntoView({ block: "center", behavior: "auto" })
        }
      }, 10)
    }
  }, [isYearPickerOpen, currentDate])

  const handleMonthChange = (value: string) => {
    const newDate = setMonth(currentDate, Number.parseInt(value))
    setCurrentDate(newDate)
  }

  const handleYearChange = (value: string) => {
    const newDate = setYear(currentDate, Number.parseInt(value))
    setCurrentDate(newDate)
  }

  const handlePrevMonth = () => {
    setCurrentDate(addMonths(currentDate, -1))
    setIsMonthPickerOpen(false)
    setIsYearPickerOpen(false)
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
    setIsMonthPickerOpen(false)
    setIsYearPickerOpen(false)
  }

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentDate)
    selectedDate.setDate(day)

    if (onSelect) {
      onSelect(selectedDate)
    }

    // Schließe die Picker
    setIsMonthPickerOpen(false)
    setIsYearPickerOpen(false)
  }

  // Passe die Größen im Kalender an, damit sie konsistent mit dem Rest der Anwendung sind

  // Ändere die Größen der Tage im Kalender
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = startOfMonth(currentDate)
    const startingDayOfWeek = getDay(firstDayOfMonth) // 0 = Sunday, 1 = Monday, etc.

    // Adjust for German calendar (Monday is first day)
    const adjustedStartDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < adjustedStartDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8\"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const isSelected =
        selected &&
        selected.getDate() === day &&
        selected.getMonth() === currentDate.getMonth() &&
        selected.getFullYear() === currentDate.getFullYear()

      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear()

      const isDisabled = disabled ? disabled(date) : false

      days.push(
        <Button
          key={day}
          variant={isSelected ? "default" : isToday ? "outline" : "ghost"}
          className={cn(
            "h-7 w-7 p-0 font-normal text-xs",
            isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            isToday && !isSelected && "border border-primary text-foreground",
            isDisabled && "opacity-50 cursor-not-allowed",
          )}
          disabled={isDisabled}
          onClick={() => !isDisabled && handleDateClick(day)}
        >
          {day}
        </Button>,
      )
    }

    return days
  }

  // Ändere die Größen der Wochentage im Kalender
  const dayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]

  return (
    <div className={cn("p-2 space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={handlePrevMonth}>
          <ChevronLeft className="h-3 w-3" />
        </Button>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            onClick={() => {
              setIsMonthPickerOpen(!isMonthPickerOpen)
              setIsYearPickerOpen(false)
            }}
            className="text-xs font-medium h-7"
          >
            {currentDate.toLocaleString(de, { month: "long" })}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              const newState = !isYearPickerOpen
              setIsYearPickerOpen(newState)
              setIsMonthPickerOpen(false)
            }}
            className="text-xs font-medium h-7"
          >
            {currentDate.getFullYear()}
          </Button>
        </div>

        <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleNextMonth}>
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
      {isMonthPickerOpen && (
        <div className="grid grid-cols-3 gap-1 mt-2">
          {months.map((month) => (
            <Button
              key={month.value}
              variant={currentDate.getMonth() === Number.parseInt(month.value) ? "default" : "outline"}
              className="h-7 text-xs"
              onClick={() => {
                handleMonthChange(month.value)
                setIsMonthPickerOpen(false)
              }}
            >
              {month.label.substring(0, 3)}
            </Button>
          ))}
        </div>
      )}
      {isYearPickerOpen && (
        <div ref={yearPickerRef} className="grid grid-cols-4 gap-1 mt-2 max-h-[200px] overflow-y-auto">
          {years.map((year) => (
            <Button
              key={year.value}
              data-year={year.value}
              variant={currentDate.getFullYear() === Number.parseInt(year.value) ? "default" : "outline"}
              className="h-7 text-xs"
              onClick={() => {
                handleYearChange(year.value)
                setIsYearPickerOpen(false)
              }}
            >
              {year.label}
            </Button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((day) => (
          <div key={day} className="h-7 flex items-center justify-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  )
}
