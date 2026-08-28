# Google Sheets setup

Form submissions from the site are saved locally (`data/leads.json`) **and** synced to your Google Spreadsheet — each registration type goes to its own tab.

## Tabs created

| Tab | When a row is added |
|-----|---------------------|
| **Flame** | Founding member · membership interest = Flame |
| **Ember Elite** | Founding member · membership interest = Ember Elite |
| **Founding General** | Founding member · “Not sure yet” |
| **Corporate** | Corporate tab on the form |
| **Counsel** | Counsel tab on the form |

---

## Step-by-step

### 1. Open your Google Sheet

Use your existing spreadsheet, or create a new one at [sheets.google.com](https://sheets.google.com).

### 2. Add the Apps Script

1. In the sheet: **Extensions → Apps Script**
2. Delete any placeholder code in `Code.gs`
3. Copy the full contents of [`scripts/google-sheets-webhook.gs`](../scripts/google-sheets-webhook.gs) and paste it in
4. Set `SHEET_SECRET` at the top to a long random string (e.g. 32+ characters)
5. **Save** the project (name it e.g. “GFA Leads”)

### 3. Create the tabs and headers

1. In Apps Script, select **`setupSheets`** from the function dropdown
2. Click **Run**
3. Authorize the script when Google prompts you (first time only)
4. Your spreadsheet should now have five tabs with column headers

### 4. Deploy as a web app

1. **Deploy → New deployment**
2. Type: **Web app**
3. **Execute as:** Me  
4. **Who has access:** Anyone  
5. Click **Deploy** and copy the **Web app URL**

### 5. Configure the site

In `.env.local`:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/....../exec
GOOGLE_SHEETS_SECRET=same-string-as-SHEET_SECRET-in-apps-script
```

Restart the dev server after saving.

**On Netlify:** the site cannot write to `data/leads.json` (serverless filesystem). You **must** set `GOOGLE_SHEETS_WEBHOOK_URL` and `GOOGLE_SHEETS_SECRET` in Netlify → Site configuration → Environment variables, then redeploy.

### 6. Test

Submit a test entry on each form tab (Founding with Flame, Founding with Ember, Corporate, Counsel) and confirm rows appear in the correct sheets.

---

## Troubleshooting

### HTTP 401 / Google login HTML (`ppConfig`)

The site reached Google, but Google served a **sign-in page** instead of the script. The web app is not public.

1. Open the spreadsheet → **Extensions → Apps Script**
2. **Deploy → Manage deployments → ✎ Edit**
3. **Execute as:** Me
4. **Who has access:** **Anyone**  
   Not “Only myself”. Not “Anyone with a Google account”.
5. Click **Deploy**. Copy the **new** Web app URL (it must end in `/exec`).
6. Paste it into Netlify → Environment variables as `GOOGLE_SHEETS_WEBHOOK_URL`.
7. Confirm `GOOGLE_SHEETS_SECRET` matches `SHEET_SECRET` in the script.
8. **Redeploy** the Netlify site.

Quick check: open the Web app URL in a private browser window. You should see `{"ok":true,"service":"gfa-sheets"}`. If you get a Google login page, access is still wrong.

| Problem | Fix |
|---------|-----|
| `Unauthorized request` | `GOOGLE_SHEETS_SECRET` must exactly match `SHEET_SECRET` in Apps Script |
| Row saved locally but not in Sheet | Check server logs for `[leads] Google Sheets sync failed`; redeploy web app after script changes |
| Old deployment URL | After editing the script, create a **New deployment** (or manage versions) — old URLs may serve stale code |
| Script asks for access again | Normal after permission changes; re-authorize |

---

## Security notes

- The web app URL is public; the shared secret prevents random POSTs from writing to your sheet.
- Do not commit `.env.local` or paste the secret in public repos.
- For production, rotate `SHEET_SECRET` / `GOOGLE_SHEETS_SECRET` if either is ever exposed.
