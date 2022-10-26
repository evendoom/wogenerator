const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const { redirect } = require('express/lib/response');

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
    res.redirect(`/io/${woType}`);
});

// DPP
app.get('/io/dpp', (req, res) => {
    res.render('io/dpp');
});

// Listen Port
app.listen(3000, () => {
    console.log('Listening on port 3000...');
})