import { google, type sheets_v4 } from 'googleapis'

export type NewSubscriber = {
  name: string
  email: string
  source: string
  submittedAt: Date
  ipCountry: string
  userAgent: string
}

let cachedSheetsClient: sheets_v4.Sheets | null = null

function getSheetsClient(): sheets_v4.Sheets {
  if (cachedSheetsClient) return cachedSheetsClient

  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set')
  }

  const decoded = raw.trim().startsWith('{')
    ? raw
    : Buffer.from(raw, 'base64').toString('utf8')
  const credentials = JSON.parse(decoded) as { client_email: string; private_key: string }

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  cachedSheetsClient = google.sheets({ version: 'v4', auth })
  return cachedSheetsClient
}

/**
 * Sole entry point for persisting a subscriber. Swap providers by
 * rewriting this function body and updating env vars in .env.example —
 * route handlers and components do not import googleapis directly.
 */
export async function appendSubscriber(subscriber: NewSubscriber): Promise<void> {
  const spreadsheetId = process.env.SUBSCRIBERS_SHEET_ID
  if (!spreadsheetId) {
    throw new Error('SUBSCRIBERS_SHEET_ID is not set')
  }
  const tab = process.env.SUBSCRIBERS_SHEET_TAB || 'Subscribers'

  const sheets = getSheetsClient()
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A:F`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [
        [
          subscriber.submittedAt.toISOString(),
          subscriber.name,
          subscriber.email,
          subscriber.source,
          subscriber.ipCountry,
          subscriber.userAgent,
        ],
      ],
    },
  })
}
