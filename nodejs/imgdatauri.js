var fs = require('fs');

var rs = fs.readFileSync('./test.jpg');
var data = rs.toString('base64');
var datauri = 'data:image/jpg;base64,' + data;
console.log(datauri);