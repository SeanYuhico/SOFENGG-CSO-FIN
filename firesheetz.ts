import * as functions from 'firebase-functions'
import * as _ from 'lodash'
import { google } from 'googleapis'
const sheets = google.sheets('v4')
var admin = require("firebase-admin");

const spreadsheetId = '1IY0yqpUfY0qfSV97XWQVQIYjlojBaIGJSqaIHCl5S0Q'

const serviceAccount = require('path/to/serviceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sofengg-cso-fin.firebaseio.com"
  });

const jwtClient = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: [ 'https://www.googleapis.com/auth/spreadsheets' ],  // read and write sheets
})
const jwtAuthPromise = jwtClient.authorize()

type users = { string: string }

export const copyScoresToSheet = functions.database.ref('/users').onUpdate(async change => {
    const data: users = change.after.val()

    // Sort the scores.  scores is an array of arrays each containing name and score.
    const passwords = _.map<users, [string, string]>(data, (value, key) => [key, value])

    await jwtAuthPromise
    await sheets.spreadsheets.values.update({
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: 'users!A2:C50',  // update this range of cells
        valueInputOption: 'RAW',
        requestBody: { values: passwords }
    }, {})
})