const { google } = require('googleapis');
const credentials = require('./credentials.json');

const scopes = [
    'https://www.googleapis.com/auth/drive'
];

// create a JSON Web Token object to pass as an argument when calling the Drive API
const auth = new google.auth.JWT(
    credentials.client_email, 
    null, 
    credentials.private_key, 
    scopes
);

const drive = google.drive({ version: 'v3', auth });

const requestParams = {
    pageSize: 1,
    fields: '*'
}

drive.files.list(requestParams, (err, res) => {
    if (err) throw err;
    const files = res.data.files;
    if (files.length) {
        files.map((file) => {
            console.log(file);
        });
    } else {
        console.log(`No files found`);
    }
});

// Possible request params: https://developers.google.com/drive/api/v3/reference/files/list
