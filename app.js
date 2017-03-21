const request = require('request');

const yargs = require('yargs');
var command = yargs.argv;

var songParameters = {};

songParameters.q_track = command.track;
songParameters.q_artist = command.artist;

var options = {
    method: 'post',
    url: 'http://localhost:4000/postlyrics',
    json: true,
    body: songParameters
}

request(options, function (err, res, body) {
    console.log(body);
});