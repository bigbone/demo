var fs = require('fs');

var cs = fs.createReadStream('./sample.txt');
cs.setEncoding('utf8');

var end = function() {
    process.stdout.write(']');
}
cs.pipe(process.stdout);
cs.on('end', end);
process.stdout.write('内容是:[');