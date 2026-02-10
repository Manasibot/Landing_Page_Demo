import { readFileSync } from 'fs'
import { resolve } from 'path'
import { google } from 'googleapis'

export type InvitationRow = {
  firstName: string
  lastName: string
  email: string
  role: string
  phoneNumber: string
  company: string
  linkedinUrl: string
  whyJoin: string
  submittedAt: string
}

function loadCredentials(): object {
  // Prefer JSON env var (works on Netlify/serverless where no file exists)
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (credentialsJson) {
    try {
      return JSON.parse(credentialsJson.trim()) as object
    } catch {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON.')
    }
  }

  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (credentialsPath) {
    try {
      const path = resolve(process.cwd(), credentialsPath)
      const raw = readFileSync(path, 'utf8')
      return JSON.parse(raw) as object
    } catch (e) {
      throw new Error(`Failed to read credentials file (GOOGLE_APPLICATION_CREDENTIALS): ${e instanceof Error ? e.message : String(e)}`)
    }
  }

  throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS')
}

/** Prefix with apostrophe so Sheets treats as text (avoids formula parse for +, =, -, @). */
function asTextCell(value: string): string {
  const s = value ?? ''
  const first = s.charAt(0)
  if (first === '+' || first === '=' || first === '-' || first === '@') {
    return "'" + s
  }
  return s
}

/** Append one invitation row to the first sheet. Uses GOOGLE_SHEET_ID and credentials from file or env. */
export async function appendInvitationToSheet(row: InvitationRow): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!sheetId) {
    throw new Error('Missing GOOGLE_SHEET_ID')
  }

  const credentials = loadCredentials()

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const rawName = (process.env.GOOGLE_SHEET_NAME || 'Sheet1').trim()
  // Use simple range A:I to target the first sheet (avoids API parse errors with quoted names).
  // If you have multiple sheets, ensure the first tab is the one you want, or use a sheet name without spaces.
  const range = rawName.includes(' ') || rawName.includes("'") || rawName.includes('!')
    ? 'A:I'
    : `${rawName}!A:I`

  const values = [
    [
      row.firstName,
      row.lastName,
      row.email,
      row.role,
      asTextCell(row.phoneNumber),
      row.company,
      row.linkedinUrl,
      row.whyJoin,
      row.submittedAt,
    ],
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values },
  })
}
