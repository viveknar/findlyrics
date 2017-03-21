const request = require('request');
const cheerio = require('cheerio');

var getLyrics = (songParameters, callback) => {
    var trackname = songParameters.trackName.split(' ').join('-');
    var artistname = songParameters.artistName.split(' ').join('-');
    console.log(`http://www.metrolyrics.com/${trackname}-lyrics-${artistname}.html`);
    request({
        url: `http://www.metrolyrics.com/${trackname}-lyrics-${artistname}.html`
    }, (err, res, body) => {
        if (res && res.statusCode === 200) {
            var $ = cheerio.load(body);
            var arr = [];
            $('#lyrics-body-text .verse').filter(function (i) {
                arr.push($(this).text());
                arr.push('\n');
            });

            if (arr.length === 0) {
                callback('no lyrics to show. Check artist name or song title');
            } else {
                var arrText = arr.join('\n');
                callback(undefined, arrText);
            }
        }
        if(res.statusCode === 404) {
            callback('Request resource not found.');
        }
    });
}


module.exports.getLyrics = getLyrics;

