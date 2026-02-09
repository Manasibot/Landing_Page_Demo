/**
 * Google Apps Script: Web App that receives invitation form POST and appends a row to the active sheet.
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Extensions → Apps Script, paste this code, save.
 * 3. Deploy → New deployment → Web app.
 * 4. Execute as: Me. Who has access: Anyone. Deploy.
 * 5. Copy the Web app URL and set INVITATION_WEBHOOK_URL in .env.local.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const body = e.postData ? JSON.parse(e.postData.contents) : {};
    const row = [
      body.firstName || '',
      body.lastName || '',
      body.email || '',
      body.role || '',
      body.phoneNumber || '',
      body.company || '',
      body.linkedinUrl || '',
      body.whyJoin || '',
      body.submittedAt || new Date().toISOString(),
    ];
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
