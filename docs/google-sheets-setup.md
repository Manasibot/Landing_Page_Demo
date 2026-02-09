# Connect the invitation form to Google Sheets

You can use either **Option A** (Sheets API) or **Option B** (Apps Script webhook). Option A is recommended for production.

---

## Option A: Google Sheets API (recommended)

Form submissions are appended directly to your sheet by the Next.js API using a service account.

### 1. Google Cloud setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project or select one.
3. **Enable the API**: APIs & Services → Enable APIs and Services → search **Google Sheets API** → Enable.
4. **Create a service account**: APIs & Services → Credentials → Create Credentials → Service Account. Name it (e.g. `invitation-form`), then Create and Continue.
5. **Create a key**: Open the new service account → Keys → Add Key → Create new key → JSON → Download. Keep this file private (do not commit to git).

### 2. Google Sheet setup

1. Create a new Google Sheet (or use an existing one).
2. Copy the **Sheet ID** from the URL:  
   `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`
3. Share the sheet with the **service account email** (from the JSON key, e.g. `invitation-form@your-project.iam.gserviceaccount.com`) and give it **Editor** access.
4. (Optional) In the first row, add headers:  
   `First Name` | `Last Name` | `Email` | `Role` | `Phone` | `Company` | `LinkedIn` | `Why join` | `Submitted at`

### 3. Environment variables

In `.env.local`:

```env
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...@....iam.gserviceaccount.com",...}
```

- **GOOGLE_SHEET_ID**: The sheet ID from the URL.
- **GOOGLE_SERVICE_ACCOUNT_JSON**: The **entire** contents of the downloaded JSON key, on **one line** (minify it: remove line breaks; you can use an online JSON minifier).

Optional:

```env
GOOGLE_SHEET_NAME=Sheet1
```

Use this if your tab name is not `Sheet1`.

Restart the dev server after changing `.env.local`. Submissions will be appended to the sheet.

---

## Option B: Google Apps Script webhook

The form POSTs to a URL; a script in your sheet receives the data and appends a row.

### 1. Create the sheet and script

1. Create a Google Sheet.
2. Extensions → Apps Script. Delete any sample code.
3. Paste the script from `scripts/google-apps-script-webapp.gs` (in this repo). It reads the POST body and appends a row to the first sheet.
4. Save the project (e.g. name it “Invitation webhook”).

### 2. Deploy as web app

1. Deploy → New deployment → type: **Web app**.
2. Description: e.g. “Invitation form”.
3. Execute as: **Me**.
4. Who has access: **Anyone** (so your site can POST without login).
5. Deploy → copy the **Web app URL** (ends with `/exec`).

### 3. Environment variable

In `.env.local`:

```env
INVITATION_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Restart the dev server. Form submissions will be sent to the script and appended to the sheet.

---

## Troubleshooting

- **“Failed to save to sheet”**: Check that `GOOGLE_SHEET_ID` and `GOOGLE_SERVICE_ACCOUNT_JSON` are set correctly and the sheet is shared with the service account email.
- **403 / permission denied**: Ensure the Google Sheets API is enabled and the service account has Editor access to the sheet.
- **Webhook (Option B) not receiving data**: Ensure the Apps Script is deployed as “Anyone” and the URL is exactly the one from Deploy → Web app.
