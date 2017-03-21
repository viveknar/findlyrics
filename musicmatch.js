const request = require('request');
const cheerio = require('cheerio');
const {apiKey} = require('./config');

var baseRequestURL = `https://api.musixmatch.com/ws/1.1/track.search?apikey=${apiKey}`;


var getSearchURLString = (songObject) => {
    var queryTerms = [];
    for (var key in songObject) {
        if(songObject.hasOwnProperty(key)) {
            queryTerms.push(encodeURIComponent(key) + '=' + encodeURIComponent(songObject[key]));
        }
    }
    var queryTermsString = queryTerms.join('&');
    return queryTermsString;
};

var getTrackId = (songObject, callback) => {

    encodedSearchString = getSearchURLString(songObject);
    var songParameters = {};

    request({
        url: `${baseRequestURL}&${encodedSearchString}`,
        json: true
    }, (error, req, res) => {
        if (res.message.header.status_code === 200 && res.message.header.available !== 0) {
            songParameters.artistName = res.message.body.track_list[0].track.artist_name;
            songParameters.trackName = res.message.body.track_list[0].track.track_name;

            callback(undefined, songParameters);
        } else if(res.message.header.status_code === 401) {
            callback('Invalid API key');
        } else if(res.message.header.available === 0) {
            callback('check query parameters');
        } else {
            callback('Error making the request. Check search URL');
        }
    });
};

module.exports.getTrackId = getTrackId;
