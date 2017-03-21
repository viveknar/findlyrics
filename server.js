const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.post('/postlyrics', (req, res) => {

});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
