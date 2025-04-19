import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // In einer echten Anwendung würden wir hier Daten aus der Datenbank abrufen
  // Für jetzt verwenden wir Beispieldaten
  const trademarks = [
    {
      id: 1,
      country_code: "DE",
      application_date: "2023-01-15",
      registration_date: "2023-06-20",
      notes: "Deutsche Markenanmeldung",
    },
    {
      id: 2,
      country_code: "EU",
      application_date: "2023-02-10",
      registration_date: null,
      notes: "EU-Markenanmeldung, noch nicht eingetragen",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Meine gespeicherten Marken</h1>

      {trademarks.length === 0 ? (
        <p>Sie haben noch keine Marken gespeichert.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trademarks.map((trademark) => (
            <div key={trademark.id} className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{trademark.country_code}</h2>
              {trademark.application_date && (
                <p className="text-sm">Anmeldedatum: {new Date(trademark.application_date).toLocaleDateString()}</p>
              )}
              {trademark.registration_date && (
                <p className="text-sm">
                  Eintragungsdatum: {new Date(trademark.registration_date).toLocaleDateString()}
                </p>
              )}
              {trademark.notes && <p className="mt-2 text-gray-600">{trademark.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
