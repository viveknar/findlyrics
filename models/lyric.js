var mongoose = require('mongoose');

var Lyrics = mongoose.model('Lyrics', {
    artistName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    trackName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    lyricsBody: {
        type:String,
        trim: true,
        default: null
    }
});

module.exports.Lyrics = Lyrics;