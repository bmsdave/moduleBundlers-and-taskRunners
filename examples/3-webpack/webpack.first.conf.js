const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        bundle: [path.join(__dirname, 'src', 'index.js')]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                test: /\.html/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract("css-loader!less-loader")
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("index.css")
    ]
};
