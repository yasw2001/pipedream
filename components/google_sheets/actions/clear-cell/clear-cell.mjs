import googleSheets from "../../google_sheets.app.mjs";

export default {
  key: "google_sheets-clear-cell",
  name: "Clear Cell",
  description: "Delete the content of a specific cell in a spreadsheet",
  version: "0.0.2",
  type: "action",
  props: {
    googleSheets,
    drive: {
      propDefinition: [
        googleSheets,
        "watchedDrive",
      ],
      description: "The drive containing the spreadsheet to edit",
    },
    sheetId: {
      propDefinition: [
        googleSheets,
        "sheetID",
        (c) => ({
          driveId: googleSheets.methods.getDriveId(c.drive),
        }),
      ],
    },
    sheetName: {
      propDefinition: [
        googleSheets,
        "sheetName",
        (c) => ({
          sheetId: c.sheetId,
        }),
      ],
    },
    cell: {
      type: "string",
      label: "Cell",
      description: "The A1 notation of the cell to clear. E.g., `A1`",
    },
  },
  async run() {
    const request = {
      spreadsheetId: this.sheetId,
      range: `${this.sheetName}!${this.cell}`,
    };
    return await this.googleSheets.clearSheetValues(request);
  },
};
