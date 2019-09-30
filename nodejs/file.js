var fs = require('fs');
var path = require('path');
var filepath = './testfile.txt';
var readfilepath = 'fileForGzip.html';
var read = './';

fs.access(filepath, function(err) {
    if (err) {
        fs.writeFile(filepath, 'helloword', 'utf8', function(err) {
            if (err) throw err;
            console.log('创建写入成功');
            console.log(readfileadirsyn(read));
            appendFile();
        });
    } else {
        var readStream = fs.createReadStream(filepath, 'utf8');
        readStream.on('data', function(chunk) {}).on('error', function(err) {
            console.log(err)
        }).on('end', function() {
            console.log('没数据');
        }).on('close', function() {
            console.log('close');
            console.log(readfileadirsyn(read));
            appendFile();
        });
    }
});

function readfileadirsyn(dir) {
    var result = [path.resolve(dir)];
    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
        file = path.resolve(file);
        try {
            var state = fs.statSync(file);

            if (state.isFile()) {
                result.push(file);
            } else if (state.isDirectory()) {
                result.concat(readfileadirsyn(file));
            }
        } catch (err) {

        }
    });
    return result;

}


function appendFile() {
    var readstream = fs.createReadStream(readfilepath, 'utf8');
    var writestream = fs.createWriteStream(filepath, 'utf8');
    writestream.write('in');
    readstream.on('data', function(data) {
        writestream.write(data);
    }).on('error', function(err) {
        console.log(err.message);
    }).on('close', function() {
        console.log('end');
        writestream.end('');
        writestream.close();
        readstream.close();
    });

    console.log(fs.readFileSync(filepath, 'utf8'));
}