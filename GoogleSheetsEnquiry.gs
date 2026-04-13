const SPREADSHEET_ID = "115JgfGs5chsEjDC3kGWg1G72hs8gBDEzwSQ2MElaIiU";
const SHEET_NAME = "Enquiries";
const NOTIFY_EMAIL = "balajico93@gmail.com";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error(`Sheet not found: ${SHEET_NAME}`);
    }

    const row = [
      new Date(),
      payload.name || "",
      payload.businessType || "",
      payload.contact || "",
      payload.services || "",
      payload.total || 0,
      payload.notes || "",
      payload.source || "",
    ];
    sheet.appendRow(row);

    sendNotificationEmail(payload);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotificationEmail(payload) {
  const subject = `New client enquiry from ${payload.name || "Unknown"}`;
  const body = [
    `Name: ${payload.name || "-"}`,
    `Business Type: ${payload.businessType || "-"}`,
    `Contact: ${payload.contact || "-"}`,
    `Services: ${payload.services || "-"}`,
    `Total: ${payload.total != null ? payload.total : "-"}`,
    `Notes: ${payload.notes || "-"}`,
    `Source: ${payload.source || "Website enquiry form"}`,
    `Received at: ${new Date().toLocaleString()}`,
  ].join("\n\n");

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}
