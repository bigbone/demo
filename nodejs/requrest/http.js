var https = require('https');
var querystring = require('querystring');


const formData = {
    username: 'liupingtest4@126.com',
    password: 'liuping123'
};


var options = {
    hostname: 'passport.weibo.cn',
    port: 443,
    path: '/sso/login?client=ssologin.js',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': querystring.stringify(formData).length
    },
    json: true,
    resolveWithFullResponse: true
};


var req = https.request(options, function(res) {
    console.log('STATUS:' + res.statusCode);
    console.log('HEADERS:' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log('BODY:' + chunk);
    });
});
// write data to request body
req.write(querystring.stringify(formData));
req.end();