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

app.post('/io/sancopy', (req, res) => {
    let data = req.body;

    // Tranform Source and Destination into arrays
    if (typeof(data.sanSource) === 'string') {
        data.sanSource = [data.sanSource];
    }
    
    if (typeof(data.sanDest) === 'string') {
        data.sanDest = [data.sanDest];
    }

    // check if number of Sources and Destinations are the same
    if (req.body.sanSource.length === req.body.sanDest.length) {
        data.abMatch = true;
    } else {
        data.abMatch = false;
    }

    res.render('io/sancopy_resolve', {data});
});

// SAN to Hard Drive copies

app.get('/io/sanhdd', (req, res) => {
    res.render('io/sanhdd');
});

app.post('/io/sanhdd', (req, res) => {
    let data = req.body;

    // Break Drive Labelling, Sources and Folder Structure into arrays
    if (data.sanhddLabelInfo !== '') {
        data.sanhddLabelInfo = data.sanhddLabelInfo.split('\r\n');
    }

    
    data.sanhddSource = data.sanhddSource.split('\r\n');

    if (data.sanhddStructure !== '') {
        data.sanhddStructure = data.sanhddStructure.split('\r\n');
    } else {
        data.sanhddStructure = 'None'
    }
    
    res.render('io/sanhdd_resolve', {data});
});

// Hard drive to SAN copies

app.get('/io/hddsan', (req, res) => {
    res.render('io/hddsan');
});

app.post('/io/hddsan', (req, res) => {
    let data = req.body

    // Convert Source and Destination into arrays
    if (data.hddsanSource !== '') {
        data.hddsanSource = data.hddsanSource.split('\r\n');
    } 
    
    data.hddsanDest = data.hddsanDest.split('\r\n');

    res.render('io/hddsan_resolve', {data})
});

// LTO archives

app.get('/io/ltoarchive', (req, res) => {
    res.render('io/ltoarchive');
});

app.post('/io/ltoarchive', (req, res) => {
    let data = req.body;
    
    // Convert Spec, Label and Source into arrays
        data.ltoarchiveSpec = data.ltoarchiveSpec.split('\r\n');

    if (data.ltoarchiveLabel === '') {
        data.ltoarchiveLabel = 'None';
        data.ltoarchiveLabel = data.ltoarchiveLabel.split('\r\n');
    } else {
        data.ltoarchiveLabel = data.ltoarchiveLabel.split('\r\n');
    }

    data.ltoarchiveSource = data.ltoarchiveSource.split('\r\n');

    console.log(data);

    res.render('io/ltoarchive_resolve', {data});
});

// Listen Port
app.listen(3000, () => {
    console.log('Listening on port 3000...');
})