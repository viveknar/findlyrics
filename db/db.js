const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/lyricsdb');

var disconnect = () => {
    mongoose.connection.close(function() {
        console.log('closing db connection');
    });
}

module.exports = {
    mongoose: mongoose,
    disconnect: disconnect
};