const yargs = require('yargs');

var musicmatch = require('./musicmatch');
var metroLyrics = require('./metrolyrics');

var command = yargs.argv;

var songParameters = {};

songParameters['q_track'] = command.track;
songParameters['q_artist'] = command.artist;

musicmatch.getTrackId(songParameters, function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
        metroLyrics.getLyrics(res, function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        });
    }
});









