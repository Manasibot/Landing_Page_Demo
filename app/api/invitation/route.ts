import { NextRequest, NextResponse } from 'next/server'

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

    // Optional: send to Google Docs/Sheets via webhook or server-side integration.
    // Set INVITATION_WEBHOOK_URL in .env to POST this payload to your Google Apps Script
    // or another endpoint that appends to Google Sheets.
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
          submittedAt: new Date().toISOString(),
        }),
      })
    }

    // Log for development (remove in production if desired)
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

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[Invitation API]', e)
    return NextResponse.json(
      { error: 'Failed to submit invitation request' },
      { status: 500 }
    )
  }
}
