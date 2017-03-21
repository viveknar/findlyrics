const request = require('request');

const yargs = require('yargs');
var command = yargs
    .option({
        artist: {
            demand: true,
            alias: 'a',
            describe: 'Set the artist name',
            string: true
        },

        track: {
            demand: true,
            alias: 'a',
            describe: 'Set the track name',
            string: true
        },

        port: {
            alias: 'p',
            default: 3000,
            describe: 'Set the port number of the server',
            number: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var songParameters = {};

songParameters.q_track = command.track;
songParameters.q_artist = command.artist;

var options = {
    method: 'post',
    url: `http://localhost:${command.port}/postlyrics`,
    json: true,
    body: songParameters
}

request(options, function (err, res, body) {
    console.log(body);
});