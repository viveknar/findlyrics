const mongoose = require('mongoose');

const {Lyrics} = require('../models/lyric');

mongoose.connect('mongodb://127.0.0.1:27017/lyricsdb');

var disconnect = () => {
    mongoose.connection.close(function () {
        console.log('closing db connection');
    });
}

var write = (songObj, callback) => {
    Lyrics.find({
        artistName: songObj.artistName,
        trackName: songObj.trackName
    }, function (err, res) {
        if (err) {
            callback('Unable to connect to database');
        }
        if (res.length == 0) {
            console.log('new entry');
            songObj.save();
            console.log(`Adding lyrics for ${songObj.artistName} - ${songObj.trackName}`)
            callback(undefined, songObj.lyricsBody)
        }
        else {
            Lyrics.update({
                    artistName: songObj.artistName,
                    trackName: songObj.trackName
                },
                {
                    $set: {
                        lyricsBody: songObj.lyricsBody
                    }
                },
                function (err, message) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(`Updating lyrics for ${songObj.artistName} - ${songObj.trackName}`);
                    callback(undefined, songObj.lyricsBody);
                }
            );
        }
    });
}


module.exports = {
    mongoose: mongoose,
    disconnect: disconnect,
    write:write
};