"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface SaveTrademarkFormProps {
  countryCode: string
  applicationDate?: Date
  registrationDate?: Date
}

export default function SaveTrademarkForm({ countryCode, applicationDate, registrationDate }: SaveTrademarkFormProps) {
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    if (!countryCode) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie ein Land aus",
        variant: "destructive",
      })
      return
    }

    if (!applicationDate && !registrationDate) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie mindestens ein Datum ein",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/user/trademarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryCode,
          applicationDate: applicationDate?.toISOString(),
          registrationDate: registrationDate?.toISOString(),
          notes,
        }),
      })

      if (!response.ok) {
        throw new Error("Fehler beim Speichern")
      }

      toast({
        title: "Erfolgreich gespeichert",
        description: "Ihre Markeninformationen wurden gespeichert",
      })

      setNotes("")
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Die Markeninformationen konnten nicht gespeichert werden",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-medium">Markeninformationen speichern</h3>
      <Textarea
        placeholder="Notizen zu dieser Marke (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="min-h-[100px]"
      />
      <Button onClick={handleSave} disabled={loading} className="w-full">
        {loading ? "Wird gespeichert..." : "In meinem Konto speichern"}
      </Button>
    </div>
  )
}
