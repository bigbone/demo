var crypto = require('crypto');

function md5Pwd(input) {
    let str = '';
    var md5 = crypto.createHash('md5');
    str = md5.update(input).digest('hex');
    return str;
}

var password = '123456';
var pwd = md5Pwd(password);
console.log(pwd);

function md5Pwdsalt(input, salt) {
    let str = '';
    var md5 = crypto.createHash('md5');
    return md5.update(input + ':' + salt).digest('hex');
}
console.log(md5Pwdsalt(password, 'abc'));