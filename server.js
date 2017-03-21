const yargs = require('yargs');

const express = require('express');
const bodyParser = require('body-parser');
const {mongoose, write} = require('./db/db');

var argv = yargs
    .option({
        port: {
            default: 3000,
            number: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


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



app.listen(argv.port, () => {
    console.log(`Listening on port ${argv.port}`);
});

module.exports.app = app;
