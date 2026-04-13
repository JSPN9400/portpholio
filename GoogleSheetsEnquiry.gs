const SPREADSHEET_ID = "115JgfGs5chsEjDC3kGWg1G72hs8gBDEzwSQ2MElaIiU";
const SHEET_NAME = "Enquiries";
const NOTIFY_EMAIL = "balajico93@gmail.com";

function doPost(e) {
  const response = {
    success: false,
    error: null,
  };

  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      response.error = `Sheet "${SHEET_NAME}" not found. Check your sheet tab name.`;
      return createResponse(response, 400);
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

    response.success = true;
    return createResponse(response, 200);
  } catch (error) {
    response.error = error.toString();
    return createResponse(response, 500);
  }
}

function createResponse(data, code) {
  const output = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  
  // Add CORS headers for web app
  output.setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  
  return output;
}

function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
}
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

