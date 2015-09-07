var path = require('path');
var itunes = require('itunes-data');
var osHomedir = require('os-homedir');
var fs = require('fs');
var string_score = require('string_score');

var supportedPlatforms = ['darwin','win32'];
if (supportedPlatforms.indexOf(process.platform) === -1) {
	console.log('unsupported operating system');
	process.exit(1);
}

var _tracks = [];

var library = {
	init: function() {
		var parser = itunes.parser();
		var libraryPath = path.join(osHomedir(), 'Music', 'iTunes', 'iTunes Music Library.xml');

		fs.createReadStream(libraryPath).pipe(parser);

		parser.on('track', function(track) {
			_tracks.push(track);
		});
	},
	search: function(q) {
		return _tracks.sort(function(a, b) {
			return b.Name.score(q) - a.Name.score(q);
		})[0];
	}
};

module.exports = library;
