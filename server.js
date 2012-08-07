var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function (req, res) {

    if (req.url === "/robots.txt") {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("User-Agent: *\n");
        res.end("Disallow: /\n");
    } else if (req.url === "/") {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end("Hello!\n");    
	} else if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        var body = '';

        req.on('data', function (data) {
            body += data;

            if (body.length > 1e6) {
                req.conection.distroy();
            }
        });

        req.on('end', function () {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.write(body);
            res.end("\n");
        });
	} else if (req.url.match(/\d{3}/)) { 
	    var matches = req.url.match(/\d{3}/);
	    status = matches[0];
		res.writeHead(status, {'Content-Type': 'text/plain'});
		res.end("You requested a " + status + "\n");                
    } else {
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end("404\n");    
    }
    
    console.log(req.connection.remoteAddress + " " + req.method + " " + req.url + " " + res.statusCode + " " + req.headers['user-agent']);
    
}).listen(80, '0.0.0.0');
console.log('Server running');
