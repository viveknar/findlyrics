
const musicmatch = require('./musicmatch');
const metroLyrics = require('./metrolyrics');

const {mongoose, disconnect} = require('./db/db');
const {Lyrics} = require('./models/lyric');

// const yargs = require('yargs');
// var command = yargs.argv;
//
// var songParameters = {};
//
// songParameters.q_track = command.track;
// songParameters.q_artist = command.artist;
// fetchLyrics(songParameters);

var fetchLyrics = (songParameters) => {
    console.log(`Fetching lyrics for ${songParameters.q_track} - ${songParameters.q_artist}...\n\n`);
    musicmatch.getTrackId(songParameters, function (err, fixedSongParameters) {
        if (err) {
            console.log(err);
        } else {

            metroLyrics.getLyrics(fixedSongParameters, function (err, lyrics) {
                if (err) {
                    console.log('Unable to fetch lyrics from lyrics server');
                } else {
                    Lyrics.find({
                        artistName: fixedSongParameters.artistname,
                        trackName: fixedSongParameters.trackname
                    }, function (err, res) {
                        if (err) {
                            return console.log('Unable to connect to database');
                        }
                        if (res.length == 0) {
                            var entry = new Lyrics({
                                artistName: fixedSongParameters.artistname,
                                trackName: fixedSongParameters.trackname,
                                lyricsBody: lyrics
                            });
                            entry.save();
                            console.log(`Adding lyrics for ${fixedSongParameters.artistname} - ${fixedSongParameters.trackname}`)
                            disconnect();
                        }
                        else {
                            Lyrics.update({
                                    artistName: fixedSongParameters.artistname,
                                    trackName: fixedSongParameters.trackname
                                },
                                {
                                    $set: {
                                        lyricsBody: lyrics
                                    }
                                },
                                function (err, message) {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    console.log(`Updating lyrics for ${fixedSongParameters.artistname} - ${fixedSongParameters.trackname}`);
                                    disconnect();
                                }
                            );
                        }
                    });
                }
            });
        }
    });
}

module.exports.fetchLyrics = fetchLyrics;










