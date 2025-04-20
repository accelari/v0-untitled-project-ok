"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Bot, AlertTriangle } from "lucide-react"
import { verifyWithAI, type ClaudeModel } from "../actions/verify-with-ai"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AIVerificationProps {
  calculationResults: any
}

// Modellbeschreibungen für die Benutzeroberfläche
const modelDescriptions = {
  "claude-3-haiku-20240307": {
    name: "Claude 3 Haiku",
    description: "Schnell und kostengünstig, gut für einfache Überprüfungen",
    speed: "Sehr schnell",
  },
  "claude-3-sonnet-20240229": {
    name: "Claude 3 Sonnet",
    description: "Ausgewogene Leistung, empfohlen für die meisten Anwendungsfälle",
    speed: "Mittel",
  },
  "claude-3-opus-20240229": {
    name: "Claude 3 Opus",
    description: "Höchste Qualität und Genauigkeit, für komplexe Analysen",
    speed: "Langsamer",
  },
}

export function AIVerification({ calculationResults }: AIVerificationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [error, setError] = useState<{ type?: string; message: string } | null>(null)
  const [apiKey, setApiKey] = useState("")
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [selectedModel, setSelectedModel] = useState<ClaudeModel>("claude-3-haiku-20240307")
  const [showModelSelection, setShowModelSelection] = useState(false)

  const handleVerifyClick = async () => {
    setIsLoading(true)
    setError(null)
    setAiResponse(null)

    try {
      const result = await verifyWithAI(calculationResults, selectedModel, apiKey || undefined)

      if (result.success && result.response) {
        setAiResponse(result.response)
      } else {
        // Wenn der Fehler auf einen fehlenden API-Schlüssel hinweist, zeige das Eingabefeld an
        if (result.errorType === "API_KEY_MISSING") {
          setShowApiKeyInput(true)
        }

        setError({
          type: result.errorType,
          message: result.errorMessage || "Bei der Überprüfung ist ein Fehler aufgetreten.",
        })
      }
    } catch (err: any) {
      setError({
        type: "UNKNOWN_ERROR",
        message: "Bei der Überprüfung ist ein unerwarteter Fehler aufgetreten.",
      })
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Hilfsfunktion zum Rendern von Fehlermeldungen mit spezifischen Hinweisen
  const renderErrorMessage = () => {
    if (!error) return null

    let actionText = ""
    const icon = <AlertTriangle className="h-4 w-4" />

    switch (error.type) {
      case "API_KEY_MISSING":
        actionText = "Bitte geben Sie Ihren Claude API-Schlüssel ein."
        break
      case "INVALID_API_KEY":
        actionText = "Bitte überprüfen Sie Ihren API-Schlüssel und versuchen Sie es erneut."
        break
      case "RATE_LIMIT_EXCEEDED":
        actionText = "Bitte warten Sie einige Minuten und versuchen Sie es dann erneut."
        break
      case "MODEL_NOT_AVAILABLE":
        actionText = "Bitte wählen Sie ein anderes Modell."
        break
      default:
        actionText = "Bitte versuchen Sie es später erneut."
    }

    return (
      <Alert variant="destructive" className="mt-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Fehler bei der KI-Überprüfung</AlertTitle>
        <AlertDescription>
          {error.message}
          <p className="mt-2 text-sm font-medium">{actionText}</p>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Modellauswahl-Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowModelSelection(!showModelSelection)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {showModelSelection ? "Modellauswahl ausblenden" : "Modellauswahl anzeigen"}
        </Button>

        <div className="text-sm text-gray-500">Aktuelles Modell: {modelDescriptions[selectedModel].name}</div>
      </div>

      {/* Modellauswahl */}
      {showModelSelection && (
        <Card className="bg-gray-50">
          <CardContent className="pt-4">
            <RadioGroup value={selectedModel} onValueChange={(value) => setSelectedModel(value as ClaudeModel)}>
              {Object.entries(modelDescriptions).map(([modelId, details]) => (
                <div key={modelId} className="flex items-start space-x-2 mb-3 pb-3 border-b last:border-0">
                  <RadioGroupItem value={modelId} id={modelId} className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor={modelId} className="font-medium">
                      {details.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{details.description}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {details.speed}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* API-Schlüssel Eingabe */}
      {showApiKeyInput && (
        <div className="space-y-2">
          <Label htmlFor="apiKey">Claude API-Schlüssel</Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-ant-..."
            className="font-mono"
          />
          <p className="text-xs text-gray-500">
            Ihr API-Schlüssel wird nur für diese Anfrage verwendet und nicht gespeichert.
          </p>
        </div>
      )}

      {/* Überprüfungs-Button */}
      <Button
        onClick={handleVerifyClick}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            KI-Überprüfung läuft...
          </>
        ) : (
          <>
            <Bot className="h-4 w-4" />
            Mit {modelDescriptions[selectedModel].name} überprüfen
          </>
        )}
      </Button>

      {/* Fehlermeldung */}
      {error && renderErrorMessage()}

      {/* KI-Antwort */}
      {aiResponse && (
        <Card className="mt-4 bg-blue-50 dark:bg-blue-900 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Bot className="h-4 w-4 mr-2" />
              Analyse mit {modelDescriptions[selectedModel].name}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="prose prose-sm max-w-none">
              {aiResponse.split("\n").map((line, index) => {
                // Überschriften hervorheben
                if (line.startsWith("#")) {
                  return (
                    <h3 key={index} className="text-md font-bold mt-3 mb-2">
                      {line.replace(/^#+\s/, "")}
                    </h3>
                  )
                }
                // Aufzählungspunkte formatieren
                else if (line.match(/^\s*[-*]\s/)) {
                  return (
                    <li key={index} className="ml-4">
                      {line.replace(/^\s*[-*]\s/, "")}
                    </li>
                  )
                }
                // Nummerierte Listen formatieren
                else if (line.match(/^\s*\d+\.\s/)) {
                  return (
                    <li key={index} className="ml-4">
                      {line.replace(/^\s*\d+\.\s/, "")}
                    </li>
                  )
                }
                // Leere Zeilen als Absätze
                else if (line.trim() === "") {
                  return <br key={index} />
                }
                // Normale Textzeilen
                else {
                  return (
                    <p key={index} className="my-1">
                      {line}
                    </p>
                  )
                }
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
