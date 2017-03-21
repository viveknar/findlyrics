const request = require('request');

const musicmatch = require('./musicmatch');
const metroLyrics = require('./metrolyrics');

const {Lyrics} = require('./models/lyric');

// const mongoose = require('./db/db');



var fetchLyrics = (songParameters, callback) => {
    console.log(`Fetching lyrics for ${songParameters.q_track} - ${songParameters.q_artist}...\n\n`);
    musicmatch.getTrackId(songParameters, function (err, fixedSongParameters) {
        if (err) {
            console.log(err);
            callback(undefined);
        } else {

            metroLyrics.getLyrics(fixedSongParameters, function (err, lyrics) {
                if (err) {
                    console.log('Unable to fetch lyrics from lyrics server');
                    callback(undefined);
                } else {
                    // mongoose.write(fixedSongParameters, lyrics);
                    callback(new Lyrics({
                        artistName: fixedSongParameters.artistName,
                        trackName: fixedSongParameters.trackName,
                        lyricsBody: lyrics
                    }));
                }
            });
        }
    });
}

module.exports = {
    fetchLyrics: fetchLyrics
};










