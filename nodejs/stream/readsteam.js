var fs = require('fs');

fs.readFile('./sample.txt', 'utf8', function(error, content) {
    if (error) {
        console.log(error);
        return;
    }
    console.log('内容是%s', content);
});