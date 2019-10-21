const {google}  = require('googleapis');
const docsTracker = require('../json/documentTracker.json');

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
        range: 'A1:B5'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    console.log(data.data.values);
}