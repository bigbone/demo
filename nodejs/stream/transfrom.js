var fs = require('fs');
var zlib = require('zlib');

var cr = fs.createReadStream('./sample.txt');
cr.setEncoding('utf8');
var zip = zlib.createGzip();
var ws = fs.createWriteStream('./sample.gz');
cr.pipe(zip).pipe(ws);