var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: __dirname + "/src/js/index.js",
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'style-loader!css-loader'
        }, ]
    },
    output: {
        path: __dirname + '/dest',
        filename: "bundle.js",
        publicPath: '/dest1/'
    }
}