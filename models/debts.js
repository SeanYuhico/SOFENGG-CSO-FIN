const GoogleSpreadsheet = require('google-spreadsheet');
const {promisify} = require('util');
const creds = require ("../documentTracker.json");
function setSpreadsheet(debtsKey) {
    return new Promise ((resolve, reject) => {
        console.log("Set: " + debtsKey);
        let sheet = new GoogleSpreadsheet(debtsKey);
        if (sheet === null)
            return reject("null");
        else 
            return resolve(sheet);
    });
};

function accessSpreadsheet(orgName, document) {
    return new Promise (async (resolve, reject) => {
        console.log("accessSpreadsheet")
        const doc = document;
        await promisify(doc.useServiceAccountAuth)(creds);
        const info = await promisify(doc.getInfo)();
        const sheet = info.worksheets[7];
        const rows = await promisify(sheet.getRows)({
            offset: 1,
        })
        console.log("Data Loaded Successfully");
        if (rows === null)
            return reject("null");
        return resolve(rows);
    });
}

module.exports = {
    setSpreadsheet,
    accessSpreadsheet
}