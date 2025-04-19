"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SouthAmericaPreview() {
  const [selectedCountry, setSelectedCountry] = useState("BO")

  const countryRules = {
    BO: {
      name: "Bolivien",
      region: "Südamerika",
      calculationBasis: "registration",
      protectionPeriod: 10,
      renewalStartMonths: 6,
      renewalDeadlineMonths: 0,
      lateRenewalMonths: 6,
      usageProofRequired: true,
      usageProofYears: 3,
      vertreterRequired: "Ja",
      prufungsumfang: "Umfassend",
      widerspruch: "Ja",
      poaVertreterRequired: "Ja",
      poaDigitalCopy: "Nein",
      poaOriginalRequired: "Ja",
      poaDigitalSignature: "Nein",
      poaNotarization: "Ja",
      poaApostille: "Ja",
      poaHinweise: "Notariell beglaubigte und legalisierte Vollmacht erforderlich.",
      mitgliedschaften: ["WIPO", "Pariser Übereinkunft", "TRIPS", "Andenpakt"],
      priorityDeadlineMonths: 6,
      additionalNotes:
        "Markenregistrierungen in Bolivien sind für 10 Jahre gültig und können für weitere 10-Jahres-Perioden verlängert werden. Die Registrierung erfolgt beim bolivianischen Patentamt (SENAPI). Eine Marke kann nach 3 Jahren Nichtbenutzung angefochten werden. Bolivien ist Mitglied des Andenabkommens (Andenpakt).",
    },
    EC: {
      name: "Ecuador",
      region: "Südamerika",
      calculationBasis: "registration",
      protectionPeriod: 10,
      renewalStartMonths: 6,
      renewalDeadlineMonths: 0,
      lateRenewalMonths: 6,
      usageProofRequired: true,
      usageProofYears: 3,
      vertreterRequired: "Ja",
      prufungsumfang: "Umfassend",
      widerspruch: "Ja",
      poaVertreterRequired: "Ja",
      poaDigitalCopy: "Nein",
      poaOriginalRequired: "Ja",
      poaDigitalSignature: "Nein",
      poaNotarization: "Ja",
      poaApostille: "Ja",
      poaHinweise: "Notariell beglaubigte und legalisierte Vollmacht erforderlich.",
      mitgliedschaften: ["WIPO", "Pariser Übereinkunft", "TRIPS", "Andenpakt"],
      priorityDeadlineMonths: 6,
      additionalNotes:
        "Markenregistrierungen in Ecuador sind für 10 Jahre gültig und können für weitere 10-Jahres-Perioden verlängert werden. Die Registrierung erfolgt beim ecuadorianischen Institut für geistiges Eigentum (SENADI). Eine Marke kann nach 3 Jahren Nichtbenutzung angefochten werden. Ecuador ist Mitglied des Andenabkommens (Andenpakt).",
    },
    PE: {
      name: "Peru",
      region: "Südamerika",
      calculationBasis: "registration",
      protectionPeriod: 10,
      renewalStartMonths: 6,
      renewalDeadlineMonths: 0,
      lateRenewalMonths: 6,
      usageProofRequired: true,
      usageProofYears: 3,
      vertreterRequired: "Ja",
      prufungsumfang: "Umfassend",
      widerspruch: "Ja",
      poaVertreterRequired: "Ja",
      poaDigitalCopy: "Ja",
      poaOriginalRequired: "Ja",
      poaDigitalSignature: "Nein",
      poaNotarization: "Ja",
      poaApostille: "Ja",
      poaHinweise:
        "Notariell beglaubigte und legalisierte Vollmacht erforderlich, kann innerhalb von 60 Tagen nach Anmeldung nachgereicht werden.",
      mitgliedschaften: ["WIPO", "Pariser Übereinkunft", "TRIPS", "Andenpakt", "Madrid-Protokoll"],
      priorityDeadlineMonths: 6,
      additionalNotes:
        "Markenregistrierungen in Peru sind für 10 Jahre gültig und können für weitere 10-Jahres-Perioden verlängert werden. Die Registrierung erfolgt beim peruanischen Institut für Wettbewerbsverteidigung und Schutz des geistigen Eigentums (INDECOPI). Eine Marke kann nach 3 Jahren Nichtbenutzung angefochten werden. Peru ist Mitglied des Andenabkommens (Andenpakt) und seit 2018 des Madrid-Protokolls.",
    },
    VE: {
      name: "Venezuela",
      region: "Südamerika",
      calculationBasis: "registration",
      protectionPeriod: 15,
      renewalStartMonths: 6,
      renewalDeadlineMonths: 0,
      lateRenewalMonths: 6,
      usageProofRequired: true,
      usageProofYears: 3,
      vertreterRequired: "Ja",
      prufungsumfang: "Umfassend",
      widerspruch: "Ja",
      poaVertreterRequired: "Ja",
      poaDigitalCopy: "Nein",
      poaOriginalRequired: "Ja",
      poaDigitalSignature: "Nein",
      poaNotarization: "Ja",
      poaApostille: "Ja",
      poaHinweise: "Notariell beglaubigte und legalisierte Vollmacht erforderlich.",
      mitgliedschaften: ["WIPO", "Pariser Übereinkunft", "TRIPS"],
      priorityDeadlineMonths: 6,
      additionalNotes:
        "Markenregistrierungen in Venezuela sind für 15 Jahre gültig und können für weitere 15-Jahres-Perioden verlängert werden. Die Registrierung erfolgt beim venezolanischen Amt für geistiges Eigentum (SAPI). Eine Marke kann nach 3 Jahren Nichtbenutzung angefochten werden. Hinweis: Venezuela ist 2006 aus dem Andenpakt ausgetreten.",
    },
  }

  const countries = [
    { code: "BO", name: "Bolivien" },
    { code: "EC", name: "Ecuador" },
    { code: "PE", name: "Peru" },
    { code: "VE", name: "Venezuela" },
  ]

  const selectedRules = countryRules[selectedCountry]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Trademark Rules Preview - Südamerika</h1>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country.code)}
              className={`px-4 py-2 rounded ${
                selectedCountry === country.code ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {country.name} ({country.code})
            </button>
          ))}
        </div>
      </div>

      {selectedRules && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Grundinformationen</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Land:</dt>
                  <dd>{selectedRules.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Region:</dt>
                  <dd>{selectedRules.region}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Berechnungsbasis:</dt>
                  <dd>{selectedRules.calculationBasis === "registration" ? "Eintragung" : "Anmeldung"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Schutzdauer:</dt>
                  <dd>{selectedRules.protectionPeriod} Jahre</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fristen</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Verlängerung ab:</dt>
                  <dd>{selectedRules.renewalStartMonths} Monate vor Ablauf</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Verlängerungsfrist:</dt>
                  <dd>Bis zum Ablauftag</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Nachfrist:</dt>
                  <dd>{selectedRules.lateRenewalMonths} Monate</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Prioritätsfrist:</dt>
                  <dd>{selectedRules.priorityDeadlineMonths} Monate</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nutzungsnachweis</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Nachweis erforderlich:</dt>
                  <dd>{selectedRules.usageProofRequired ? "Ja" : "Nein"}</dd>
                </div>
                {selectedRules.usageProofRequired && (
                  <div className="flex justify-between">
                    <dt className="font-medium">Nach:</dt>
                    <dd>{selectedRules.usageProofYears} Jahren</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vertreter & Vollmacht</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Vertreter erforderlich:</dt>
                  <dd>{selectedRules.vertreterRequired}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Vollmacht erforderlich:</dt>
                  <dd>{selectedRules.poaVertreterRequired}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Notarielle Beglaubigung:</dt>
                  <dd>{selectedRules.poaNotarization}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Apostille:</dt>
                  <dd>{selectedRules.poaApostille}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Mitgliedschaften</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedRules.mitgliedschaften.map((mitgliedschaft, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {mitgliedschaft}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Zusätzliche Hinweise</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{selectedRules.additionalNotes}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
