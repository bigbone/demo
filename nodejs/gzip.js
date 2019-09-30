var http = require('http');
var zlib = require('zlib');
var fs = require('fs');
var filepath = './fileForGzip.html';

var responseText = 'hello world';

var server = http.createServer(function(req, res) {
    var acceptEncoding = req.headers['accept-encoding'];
    if (acceptEncoding.indexOf('gzip') != -1) {
        res.writeHead(200, {
            'content-encoding': 'gzip'
        });
        gzip = zlib.createGzip();
        fs.createReadStream(filepath).pipe(gzip).pipe(res);
        //res.end(zlib.gzipSync('true' + responseText));
    } else {
        res.end(responseText);
    }

});

server.listen('3000');