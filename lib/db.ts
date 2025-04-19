import { Database } from "sqlite3"
import { open } from "sqlite"

// Singleton-Muster für die Datenbankverbindung
let db: any = null

export async function getDb() {
  if (!db) {
    // Öffnet die Datenbankverbindung (erstellt die Datei, falls sie nicht existiert)
    db = await open({
      filename: "./trademark-database.db", // Lokaler Dateipfad
      driver: Database,
    })

    // Tabellen erstellen, falls sie nicht existieren
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS trademarks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        country_code TEXT NOT NULL,
        application_date TEXT,
        registration_date TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `)
  }

  return db
}
