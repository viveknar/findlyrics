const request = require('request');
const cheerio = require('cheerio');

var getLyrics = (songParameters, callback) => {
    var trackname = songParameters.trackname.split(' ').join('-');
    var artistname = songParameters.artistname.split(' ').join('-');
    request({
        url: `http://www.metrolyrics.com/${trackname}-lyrics-${artistname}.html`
    }, (err, res, body) => {
        console.log(`http://www.metrolyrics.com/${trackname}-lyrics-${artistname}.html`);
        if (res && res.statusCode === 200) {
            var $ = cheerio.load(body);
            var arr = []
            $('#lyrics-body-text').each(function (i) {
                arr[i] = $(this).text();
            });
            if (arr.length === 0) {
                callback('no lyrics to show');
            } else {
                var arrText = arr.join('\n');
                callback(undefined, arrText);
            }
        }
    });
}


module.exports.getLyrics = getLyrics;

