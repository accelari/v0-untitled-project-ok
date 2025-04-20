"use server"

import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

// Definiere die verfügbaren Modelle
export type ClaudeModel = "claude-3-haiku-20240307" | "claude-3-sonnet-20240229" | "claude-3-opus-20240229"

// Erweiterte Fehlertypen für spezifischere Fehlerbehandlung
type ErrorType =
  | "API_KEY_MISSING"
  | "RATE_LIMIT_EXCEEDED"
  | "INVALID_API_KEY"
  | "MODEL_NOT_AVAILABLE"
  | "CONTENT_FILTERED"
  | "SERVER_ERROR"
  | "UNKNOWN_ERROR"

interface VerifyResponse {
  success: boolean
  response?: string
  errorType?: ErrorType
  errorMessage?: string
}

export async function verifyWithAI(
  data: any,
  modelName: ClaudeModel = "claude-3-haiku-20240307",
  apiKey?: string,
): Promise<VerifyResponse> {
  try {
    // Prüfen, ob ein API-Schlüssel vorhanden ist
    if (!process.env.ANTHROPIC_API_KEY && !apiKey) {
      return {
        success: false,
        errorType: "API_KEY_MISSING",
        errorMessage:
          "Anthropic API-Schlüssel fehlt. Bitte geben Sie einen API-Schlüssel ein oder konfigurieren Sie die Umgebungsvariable.",
      }
    }

    // Formatiere die Daten für die KI
    const formattedData = JSON.stringify(data, null, 2)

    // Erstelle einen Prompt für die KI
    const prompt = `
      Bitte überprüfe die folgenden Markenfristen-Berechnungsdaten und gib mir Feedback, 
      ob die Berechnungen korrekt erscheinen. Wenn du Unstimmigkeiten findest, 
      weise bitte darauf hin. Hier sind die Daten:
      
      ${formattedData}
      
      Bitte analysiere:
      1. Sind die Verlängerungsfristen korrekt berechnet?
      2. Sind die Benutzungsnachweise und -erklärungen korrekt angegeben?
      3. Gibt es besondere Hinweise für dieses Land, die beachtet werden sollten?
      4. Fasse deine Analyse in 3-5 Punkten zusammen.
      
      Formatiere deine Antwort übersichtlich mit Zwischenüberschriften und Aufzählungspunkten.
    `

    // Sende den Prompt an die Claude API mit dem übergebenen API-Schlüssel
    const { text } = await generateText({
      model: anthropic(modelName, apiKey || process.env.ANTHROPIC_API_KEY),
      prompt: prompt,
      temperature: 0.3, // Niedrigere Temperatur für präzisere Antworten
      maxTokens: 1500,
    })

    return { success: true, response: text }
  } catch (error: any) {
    console.error("Fehler bei der KI-Überprüfung:", error)

    // Spezifische Fehlerbehandlung basierend auf dem Fehlertyp
    if (error.name === "AuthenticationError" || error.message?.includes("authentication")) {
      return {
        success: false,
        errorType: "INVALID_API_KEY",
        errorMessage: "Der API-Schlüssel ist ungültig oder abgelaufen.",
      }
    } else if (error.status === 429 || error.message?.includes("rate limit")) {
      return {
        success: false,
        errorType: "RATE_LIMIT_EXCEEDED",
        errorMessage: "Das Anfragelimit wurde überschritten. Bitte versuchen Sie es später erneut.",
      }
    } else if (error.message?.includes("model")) {
      return {
        success: false,
        errorType: "MODEL_NOT_AVAILABLE",
        errorMessage: `Das ausgewählte Modell (${modelName}) ist nicht verfügbar oder existiert nicht.`,
      }
    } else if (error.status >= 500) {
      return {
        success: false,
        errorType: "SERVER_ERROR",
        errorMessage: "Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      }
    } else if (error.message?.includes("content filtered") || error.message?.includes("content policy")) {
      return {
        success: false,
        errorType: "CONTENT_FILTERED",
        errorMessage: "Die Anfrage wurde aufgrund von Inhaltsrichtlinien gefiltert.",
      }
    }

    // Allgemeiner Fehlerfall
    return {
      success: false,
      errorType: "UNKNOWN_ERROR",
      errorMessage: `Bei der KI-Überprüfung ist ein Fehler aufgetreten: ${error.message || "Unbekannter Fehler"}`,
    }
  }
}
