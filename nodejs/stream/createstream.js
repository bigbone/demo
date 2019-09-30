var fs = require('fs');

var cs = fs.createReadStream('./sample.txt');
var content = '';
cs.setEncoding('utf8');

cs.on('data', function(data) {
    content += data;
});
cs.on('end', function() {
    console.log('文件内容为：%s', content);
    cs.close();
});