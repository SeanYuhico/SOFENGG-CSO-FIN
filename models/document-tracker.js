/*const {google}  = require('googleapis');
const docsTracker = require('../documentTracker.json');

const client = new google.auth.JWT(
    docsTracker.client_email,
    null,
    docsTracker.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens){

    if(err){
        console.log(err);
        return;
    }
    else
        console.log('Connected DTS!');
        gsrun(client);
});

async function gsrun(cl){
    const gsapi = google.sheets({version:'v4', auth: cl});

    const opt = {
        spreadsheetId: '1z_6sjroYPL8_TzMf6BGqWIoDzQoC8dnAIDgRjVVTNPQ',
        range: 'A1:AJ2'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    var tableHeader = new Array();
    tableHeader = (data.data.values);

    console.log(tableHeader);
}*/ 

// let docsRows; 

// const GoogleSpreadsheet = require('google-spreadsheet');
// const {promisify} = require('util');

// const creds = require ('../documentTracker.json');
// const doc = new GoogleSpreadsheet('1z_6sjroYPL8_TzMf6BGqWIoDzQoC8dnAIDgRjVVTNPQ');

// function printDocument(docs){
//     console.log(`Timestamp: ${docs.timestamp}`);
//     console.log(`Date of Submission: ${docs.dateofsubmission}`);
//     console.log(`Submitted By: ${docs.submittedby}`);
//     console.log(`Organization's Name: ${docs.organizationsname}`);
//     console.log(`Title of Activity: ${docs.titleofactivity}`);
//     console.log("--------------")
// }

// async function accessSpreadsheet() {
//     await promisify(doc.useServiceAccountAuth)(creds);
//     const info = await promisify(doc.getInfo)();
//     const sheet = info.worksheets[0];
//     const rows = await promisify(sheet.getRows)({
//         offset: 1
//     })
//     docsRows = rows;
//     rows.forEach(row =>{
//         printDocument(row)
//     })
// }

// accessSpreadsheet();