var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/list_user', function(req, res) {

});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('访问http://%s:%s', host, port);
});