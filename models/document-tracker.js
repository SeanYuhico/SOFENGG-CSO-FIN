const GoogleSpreadsheet = require('google-spreadsheet');
const {promisify} = require('util');
const creds = require ("../documentTracker.json");
const doc = new GoogleSpreadsheet('1WCw_SfCdGmOWD6UJr9spJ7F23hnddHZB07GgU4UWjeA');

exports.getSpreadsheetRows = async function accessSpreadsheet(orgName) {
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    const rows = await promisify(sheet.getRows)({
        offset: 1,
        query: "organizationsname = " + orgName
    })
    console.log("Data Loaded Successfully");
    return rows;
}
