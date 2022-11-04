const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const genPassword = require('generate-password');
const cleanRecipients = require('./utilities/cleanRecipients');

// Configure 'views' directory to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure EJS to EJS Mate for HTML boilerplates
app.engine('ejs', ejsMate);

// Configure Express to use a 'Public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse data from HTML Body
app.use(express.urlencoded({extended: true}));

// Home
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/', (req, res) => {
    let woType = req.body.ioSelect;
    res.redirect(`io/${woType}`);
});

// DPP
app.get('/io/dpp', (req, res) => {
    res.render('io/dpp');
});

app.post('/io/dpp', (req, res) => {
    let data = req.body;
    res.render('io/dpp_resolve', {data});
});

// Upload
app.get('/io/upload', (req, res) => {
    res.render('io/upload');
});

app.post('/io/upload', (req, res) => {
    let data = req.body;
    let recipientsContainer = [];

    // Update password if user chooses to automatically generate one
    if (data.upPackagePassword === 'generate') {
        data.customPass = genPassword.generate({
            length: 12,
            numbers: true,
            symbols: true
        });
    }

    // Break recipients into an array
    data.upRecipients = cleanRecipients(data.upRecipients);

    res.render('io/upload_resolve', {data});
});

// Download

app.get('/io/download', (req, res) => {
    res.render('io/download');
});

app.post('/io/download', (req, res) => {
    let data = req.body;

    console.log(data.downURL);

    if (data.downPackagePass === '') {
        data.downPackagePass = 'Not Required'
    }

    res.render('io/download_resolve', {data});
});

// SAN Copy

app.get('/io/sancopy', (req, res) => {
    res.render('io/sancopy');
});

// Listen Port
app.listen(3000, () => {
    console.log('Listening on port 3000...');
})