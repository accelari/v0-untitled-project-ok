import { NextResponse } from "next/server"

// Temporäre Speicherung für die Entwicklung
let nextUserId = 2
const registeredUsers = []

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Einfache Validierung
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Name, E-Mail und Passwort sind erforderlich" }, { status: 400 })
    }

    // Prüfen, ob Benutzer bereits existiert
    const existingUser = registeredUsers.find((user) => user.email === email)

    if (existingUser) {
      return NextResponse.json({ error: "Ein Benutzer mit dieser E-Mail existiert bereits" }, { status: 400 })
    }

    // Benutzer "speichern" (nur im Speicher)
    const newUser = {
      id: String(nextUserId++),
      name,
      email,
      password, // In einer echten Anwendung würde das Passwort gehasht sein
    }

    registeredUsers.push(newUser)

    return NextResponse.json({
      success: true,
      userId: newUser.id,
    })
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error)
    return NextResponse.json({ error: "Registrierung fehlgeschlagen" }, { status: 500 })
  }
}
