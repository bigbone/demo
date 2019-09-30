if (process.env.NODE_ENV === 'production') {
    console.log('生产环境');
} else {
    console.log('非生产环境');
}

process.stdin.setEncoding('utf8');

/*process.stdin.on('readable', () => {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        process.stdout.write(`data: ${chunk}`);
    }
});

process.stdin.on('end', () => {
    process.stdout.write('end');
});*/

process.on('SIGHUP', () => {
    console.log('Got SIGHUP signal.');
});

setTimeout(function() {
    console.log('Exiting.');
}, 0);

console.log('hello');

process.kill(process.pid, 'SIGHUP');

console.log('world');