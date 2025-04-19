import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"

// Temporärer Speicher für Marken
const trademarks = []
let nextTrademarkId = 1

// API-Route zum Speichern von Markeninformationen
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 })
  }

  try {
    const { countryCode, applicationDate, registrationDate, notes } = await request.json()

    // Markeninformationen im Speicher speichern
    const newTrademark = {
      id: nextTrademarkId++,
      user_id: session.user.id,
      country_code: countryCode,
      application_date: applicationDate,
      registration_date: registrationDate,
      notes,
      created_at: new Date().toISOString(),
    }

    trademarks.push(newTrademark)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Fehler beim Speichern der Markeninformationen:", error)
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 })
  }
}

// API-Route zum Abrufen von Markeninformationen
export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 })
  }

  try {
    // Markeninformationen aus dem Speicher abrufen
    const userTrademarks = trademarks.filter((tm) => tm.user_id === session.user.id)

    return NextResponse.json({ trademarks: userTrademarks })
  } catch (error) {
    console.error("Fehler beim Abrufen der Markeninformationen:", error)
    return NextResponse.json({ error: "Fehler beim Abrufen" }, { status: 500 })
  }
}
