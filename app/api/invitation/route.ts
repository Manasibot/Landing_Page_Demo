import { NextRequest, NextResponse } from 'next/server'
import { appendInvitationToSheet } from '@/lib/google-sheets'

export type InvitationPayload = {
  firstName: string
  lastName: string
  email: string
  role: string
  phoneNumber: string
  company: string
  linkedinUrl: string
  whyJoin: string
  calendlyEventUri?: string
}

const ALLOWED_ORIGIN =
  process.env.NEXT_PUBLIC_CORS_ORIGIN || 'https://ascendhigher.ae'

function withCors(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN)
  res.headers.set('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return res
}

// Handle CORS preflight
export function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }))
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as InvitationPayload
    const {
      firstName,
      lastName,
      email,
      role,
      phoneNumber,
      company,
      linkedinUrl,
      whyJoin,
      calendlyEventUri,
    } = body

    const submittedAt = new Date().toISOString()

    // 1. Append to Google Sheet if credentials are set (file path or JSON env)
    const sheetId = process.env.GOOGLE_SHEET_ID
    const hasCredentials =
      process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    if (sheetId && hasCredentials) {
      try {
        await appendInvitationToSheet({
          firstName: firstName ?? '',
          lastName: lastName ?? '',
          email: email ?? '',
          role: role ?? '',
          phoneNumber: phoneNumber ?? '',
          company: company ?? '',
          linkedinUrl: linkedinUrl ?? '',
          whyJoin: whyJoin ?? '',
          submittedAt,
        })
      } catch (sheetError) {
        console.error('[Invitation] Google Sheets append failed:', sheetError)
        return withCors(
          NextResponse.json(
            { error: 'Failed to save to sheet' },
            { status: 500 }
          )
        )
      }
    }

    // 2. Optional: also POST to webhook (e.g. Google Apps Script)
    const webhookUrl = process.env.INVITATION_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          role,
          phoneNumber,
          company,
          linkedinUrl,
          whyJoin,
          calendlyEventUri,
          submittedAt,
        }),
      }).catch((err) => console.error('[Invitation] Webhook failed:', err))
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Invitation]', {
        firstName,
        lastName,
        email,
        role,
        phoneNumber,
        company,
        linkedinUrl,
        whyJoin: whyJoin?.slice(0, 50) + '...',
        calendlyEventUri,
      })
    }

    return withCors(NextResponse.json({ success: true }))
  } catch (e) {
    console.error('[Invitation API]', e)
    return withCors(
      NextResponse.json(
        { error: 'Failed to submit invitation request' },
        { status: 500 }
      )
    )
  }
}
