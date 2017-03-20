const request = require('request');
var cheerio = require('cheerio');

var baseRequestURL = 'https://api.musixmatch.com/ws/1.1/track.search?apikey=1c5e9d5b894d5839719e2144be47af79';

//var searchRequestURL = `${baseRequestURL}&${queryString}`;

var getSearchURLString = (songObject) => {
    var queryTerms = [];
    console.log(songObject);
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
            songParameters.artistname = res.message.body.track_list[0].track.artist_name;
            songParameters.trackname = res.message.body.track_list[0].track.track_name;
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
