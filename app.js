const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');

// Configure 'views' directory to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure EJS to EJS Mate for HTML boilerplates
app.engine('ejs', ejsMate);

// Configure Express to use a 'Public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
})

// Listen Port
app.listen(3000, () => {
    console.log('Listening on port 3000...');
})