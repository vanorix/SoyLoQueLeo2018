var fileSystem = require('fs');
var http = require("http");
filed = require('filed');

// Create an instance of our http server.
var httpServer = http.createServer(
	function handleRequest(req, res) {

		if (req.url === "/") {
			req.pipe(filed('./public/index.html')).pipe(resp);
		} else {
			req.pipe(filed("./public" + req.url)).pipe(resp);
		}

	}
);

httpServer.listen(3000);
var guid = function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var saveToFileSystem = function(imagedata) {
	var fileName = guid() + '.png';
	fileSystem.writeFile(fileName, imagedata, 'binary', function(err) {
		if (err) throw err
		console.log('File saved.')
	})
};