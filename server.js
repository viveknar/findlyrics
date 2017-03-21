const express = require('express');
const bodyParser = require('body-parser');
const {mongoose, write} = require('./db/db');


const {fetchLyrics} = require('./fetchLyrics');

var app = express();

app.use(bodyParser.json());

app.post('/postlyrics', (req, res) => {
    console.log(req.body);

    var songObj = fetchLyrics({
        q_track: req.body.q_track,
        q_artist: req.body.q_artist
    }, (songObj) => {
        if (!songObj) {
            res.status(404).send('Unable to find lyrics. Refine search parameters');
        } else {
            write(songObj, function(err, body) {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).send(body);
            });
        }
    });

});



app.listen(4000, () => {
    console.log('Listening on port 4000');
});

module.exports.app = app;
