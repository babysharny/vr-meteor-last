import {SessionObject} from "../../../both/models/session.object";
console.log('relax');

import * as fs from 'fs';
import * as readline from 'readline';
import * as google from 'googleapis';
import * as googleAuth from 'google-auth-library';

// import { SessionObject } from './../'
// import { SessionObject } from './../../../../both/models/session.object';

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
let SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
let TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
let TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';

let SHEET_ID = '1wOXAU9iQHtaERYsseUjSq6QOLIVuVBp1J7uTuCsf_64';


export class GoogleApiController {

  auth;
  callback: (res: any) => void;


  constructor() {
    console.log('Token path: ', TOKEN_PATH);
  }

  start(callback: (res: any) => void) {
    this.callback = callback;
    console.log('Welcome to GoogleApiController');
    // this.callback('ready33');

    fs.readFile(
      'assets/app/client_secret.json',
      (err, content) => {
        if (err) {
          console.log('Error loading client secret file: ' + err);
          return;
        }
        // Authorize a client with the loaded credentials, then call the
        // Google Sheets API.
        this.authorize(JSON.parse(content), (auth) => {
          this.saveAuth(auth);
        });
      });
  }

  saveAuth(auth) {
    this.auth = auth;
    this.callback('ready2');
  }

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   *
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  authorize(credentials, callback) {
                console.log(this.callback);

    let clientSecret = credentials.installed.client_secret;
    let clientId = credentials.installed.client_id;
    let redirectUrl = credentials.installed.redirect_uris[0];
    let auth = new googleAuth();
    let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        this.getNewToken(oauth2Client, callback);
      } else {
                    console.log(this.callback);

        oauth2Client.credentials = JSON.parse(token);
            console.log(this.callback);

        callback(oauth2Client);
      }
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  getNewToken(oauth2Client, callback) {
    let authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oauth2Client.getToken(code, (err, token) => {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        this.storeToken(token);
        callback(oauth2Client);
      });
    });
  }

  /**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
  storeToken(token) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
  }

  /**
   * Print the names and majors of students in a sample spreadsheet:
   * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   */
  listMajors() {
    let sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
      auth: this.auth,
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      range: 'Class Data!A2:E',
    },
    (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      let rows = response.values;
      if (rows.length == 0) {
        console.log('No data found.');
      } else {
        console.log('Name, Major:');
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i];
          // Print columns A and E, which correspond to indices 0 and 4.
          console.log('%s, %s', row[0], row[4]);
        }
      }
    });
  }

  saveData(sheetId) {
    let sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
      auth: this.auth,
      spreadsheetId: sheetId,
      range: 'A2:B3',
    },
    (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      console.log(response);
      return;
      let rows = response.values;
      if (rows.length == 0) {
        console.log('No data found.');
      } else {
        console.log('Name, Major:');
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i];
          // Print columns A and E, which correspond to indices 0 and 4.
          console.log('%s, %s', row[0], row[4]);

        }
      }
    });
  }

  sessionToTable(session: SessionObject) {
    let rows = session.players.length > session.games.length ? session.players.length : session.games.length;

    console.log('rows ', rows);
    let values = [];
    for (let i = 0; i < rows; i++) {
      values[i] = [];

    console.log('rows ', i);
      // if (i == 0) {
        values[i] = [
          i == 0 ? session.steam : '',
          i == 0 ? session.startDate : '',
          i == 0 ? session.endDate : '',
          i == 0 ? session.time : '',
          session.players && session.players[i] ? session.players[i].name : '', // Players name
          session.players && session.players[i] ? session.players[i].phone : '', // Players phone
          session.games && session.games[i] ? session.games[i] : '', // game
          i == 0 ? session.discount.freeMins : '',
          i == 1 ? session.discount.discount : '',
          i == 0 ? session.money : ''
        ];
      // }
    }

    console.log('rows ', rows);  
    return values;
  }

  saveSession(session, sheetId) {
    console.log('start saving ', session);
    let values = this.sessionToTable(session);
    console.log('transform to ', values);
    let sheets = google.sheets('v4');
    sheets.spreadsheets.values.append(
      {
        auth: this.auth,
        spreadsheetId: SHEET_ID,
        range: 'sessions!A1',
        valueInputOption: 'RAW',
        insertDataOption: 'OVERWRITE',
        resource: {
          values: values
        }
      },
      (err, response) => {
        if (err) {
          console.log('The API returned an error: ' + err);
          return;
        }
        console.log(response);
        console.log('Save all right');
        return;
      });
  }

  saveDataToRow(sheetId, row) {
    console.log('sfdsdsd');
    let sheets = google.sheets('v4');
    sheets.spreadsheets.values.append(
      {
        auth: this.auth,
        spreadsheetId: sheetId,
        range: 'sessions!A1:K',
        valueInputOption: 'RAW',
        insertDataOption: 'OVERWRITE',
        resource: {
          values: [
            ['#################################################'],
            ['Session',    'Start', 'End',   'Time',   'Players',  'Phone',            'Games', 'Time'],
            ['SWITCH',     'time1', 'time2', '24 min', 'Alex',     '+7 926 644 88 16', 'Moirai', '12 min']
          ]
        }
      },
      (err, response) => {
        if (err) {
          console.log('The API returned an error: ' + err);
          return;
        }
        console.log(response);
        console.log('Save all right');
        return;
      });
  }

  getLastRow(sheetId) {
    let sheets = google.sheets('v4');
    sheets.spreadsheets.get(
      {
        auth: this.auth,
        spreadsheetId: sheetId,
        includeGridData: true
      },
      (err, response) => {
        if (err) {
          console.log('The API returned an error: ' + err);
        }
        else {
          var last_row = response.sheets[0].data[0].rowData.length;
          console.log('last row', last_row);

        }
      });
  }

}
