/**
 * Global Fire Airlines — Google Sheets webhook
 *
 * Setup:
 * 1. Open your Google Sheet (or create a new one).
 * 2. Extensions → Apps Script → paste this file → Save.
 * 3. Run setupSheets once (authorize when prompted).
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment URL into .env.local as GOOGLE_SHEETS_WEBHOOK_URL
 * 6. Set SHEET_SECRET below to match GOOGLE_SHEETS_SECRET in .env.local
 */

const SHEET_SECRET = "SlLy7qo0JHZUocR4CAVMI7lOvDN7Hd9NXCp";

const TABS = {
  FLAME: "Flame",
  EMBER: "Ember Elite",
  FOUNDING: "Founding General",
  CORPORATE: "Corporate",
  COUNSEL: "Counsel",
};

const HEADERS = {
  founding: [
    "Timestamp",
    "Lead ID",
    "Name",
    "Email",
    "City",
    "Traveller type",
    "Frequency",
    "Membership tier",
    "Form type",
  ],
  corporate: [
    "Timestamp",
    "Lead ID",
    "Name",
    "Email",
    "Organisation",
    "Monthly seats",
    "Notes",
    "Form type",
  ],
  counsel: ["Timestamp", "Lead ID", "Name", "Email", "Message", "Form type"],
};

function doGet() {
  return jsonResponse_({ ok: true, service: "gfa-sheets" });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (!SHEET_SECRET || SHEET_SECRET === "change-me-to-a-long-random-string") {
      throw new Error("Set SHEET_SECRET in Apps Script before deploying.");
    }
    if (!data.secret || data.secret !== SHEET_SECRET) {
      throw new Error("Unauthorized request.");
    }

    const sheetName = resolveSheetName_(data);
    const sheet = getOrCreateSheet_(sheetName, data);
    sheet.appendRow(buildRow_(sheetName, data));

    return jsonResponse_({ ok: true, sheet: sheetName });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function resolveSheetName_(data) {
  if (data.sheet) return data.sheet;

  if (data.kind === "corporate") return TABS.CORPORATE;
  if (data.kind === "counsel") return TABS.COUNSEL;

  const tier = String(data.membershipInterest || "").toLowerCase();
  if (tier === "flame") return TABS.FLAME;
  if (tier === "ember") return TABS.EMBER;
  return TABS.FOUNDING;
}

function getOrCreateSheet_(name, data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet
      .getRange(1, 1, 1, headersForSheet_(name).length)
      .setValues([headersForSheet_(name)]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headersForSheet_(name).length).setFontWeight("bold");
  }
  return sheet;
}

function headersForSheet_(name) {
  if (name === TABS.CORPORATE) return HEADERS.corporate;
  if (name === TABS.COUNSEL) return HEADERS.counsel;
  return HEADERS.founding;
}

function buildRow_(sheetName, data) {
  const timestamp = data.createdAt
    ? new Date(data.createdAt)
    : new Date();

  if (sheetName === TABS.CORPORATE) {
    return [
      timestamp,
      data.id || "",
      data.name || "",
      data.email || "",
      data.company || "",
      data.monthlySeats || "",
      data.message || "",
      data.kindLabel || "Corporate",
    ];
  }

  if (sheetName === TABS.COUNSEL) {
    return [
      timestamp,
      data.id || "",
      data.name || "",
      data.email || "",
      data.message || "",
      data.kindLabel || "Counsel",
    ];
  }

  return [
    timestamp,
    data.id || "",
    data.name || "",
    data.email || "",
    data.city || "",
    data.travellerType || "",
    data.frequency || "",
    data.membershipLabel || data.membershipInterest || "",
    data.kindLabel || "Founding member",
  ];
}

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const order = [
    TABS.FLAME,
    TABS.EMBER,
    TABS.FOUNDING,
    TABS.CORPORATE,
    TABS.COUNSEL,
  ];

  order.forEach(function (name, index) {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    }
    const headers = headersForSheet_(name);
    sheet.clear();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    ss.setActiveSheet(sheet);
    ss.moveActiveSheet(index + 1);
  });

  const defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet && ss.getSheets().length > order.length) {
    ss.deleteSheet(defaultSheet);
  }
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
