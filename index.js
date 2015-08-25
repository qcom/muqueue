var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var itunes = require('itunes-data');
var osHomedir = require('os-homedir');

var supportedPlatforms = ['darwin','win32'];
if (supportedPlatforms.indexOf(process.platform) === -1) {
	console.log('unsupported operating system');
	process.exit(1);
}

function getParser() {
	var parser = itunes.parser();
	var libraryPath = path.join(osHomedir(), 'Music/iTunes/iTunes Music Library.xml');
	fs.createReadStream(libraryPath).pipe(parser);
	return parser;
}

var count = 0;
getParser()
	.on('track', function(track) {
		// play with first object in stream
		if (++count === 1) {
			console.log(track);
		}
	});
