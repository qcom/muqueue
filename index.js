var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var parseString = require('xml2js').parseString;
var parseXmlString = Promise.promisify(parseString);
var osHomedir = require('os-homedir');

var supportedPlatforms = ['darwin','win32'];
if (supportedPlatforms.indexOf(process.platform) === -1) {
	console.log('unsupported operating system');
	process.exit(1);
}

function readLibrary() {
	var libraryPath = path.join(osHomedir(), 'Music/iTunes/iTunes Music Library.xml');
	var parseOptions = {
		explicitArray: false,
		ignoreAttrs: true
	};
	return fs.readFileAsync(libraryPath, 'utf8').then(parseXmlString, parseOptions);
}
