var fs = require('fs');

var fswritestream = fs.createWriteStream('./log.txt');

var Longger = new console.Console(fswritestream, fswritestream);

Longger.log('in');
Longger.log('out');

var sybol = Symbol('test');
console.time(sybol);
setTimeout(function() {
    console.timeEnd(sybol);
}, 1000);

var j = 0;
for (var i = 0; i < 10; i++) {
    j += i;
}
try {
    console.assert(j == 45, '1 right', '1 wrong');
    console.log('第一个正确');
    console.assert(j == 0, '2 right', '2 wrong')
} catch (e) {
    console.trace(e)
    Longger.log(e);
}

var obj2 = {
    human: {
        man: {
            info: {
                nick: 'chyingp'
            }
        }
    }
};

console.dir(obj2, { depth: 3 });