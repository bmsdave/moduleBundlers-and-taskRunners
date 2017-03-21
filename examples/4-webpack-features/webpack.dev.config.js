const webpack = require('webpack');
const conf = require('./config/config.js');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

function createHappyPlugin(id, loaders) {
    return new HappyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool,

        // disable happy caching with HAPPY_CACHE=0
        cache: process.env.HAPPY_CACHE !== '0',

        // make happy more verbose with HAPPY_VERBOSE=1
        verbose: process.env.HAPPY_VERBOSE === '1',
    });
}

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        vendors: [
            "jquery",
            "jquery-mousewheel",
            "jquery-mask-plugin",
            'stacktrace-js'
        ],
        ngVendors: [
            'angular',
            'angular-resource',
            'angular-sanitize',
            'angular-translate',
            'ng-file-upload',
            'ui-select',
            'ng-mask'
        ],
        app: [path.join(__dirname, conf.paths.src, 'index.js')],
        'polyfill': 'babel-polyfill'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, conf.paths.dst)
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/karma/, /vendors/, /node_modules/],
                loader: 'happypack/loader?id=js'
            },
            {
                test: /\.ts$/,
                exclude: [/vendors/, /node_modules/],
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("css-loader?importLoaders=1&sourceMap=true!postcss-loader?sourceMap=true!less-loader?sourceMap=true")
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader?sourceMap")
            },
            {test: /\.html$/, loader: 'raw-loader'},
            {
                test: /\.(png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader",
                options: {
                    name: "assets/img/[name].[ext]"
                }
            },
            {test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=assets/fonts/[name].[ext]'},
            {
                test: /\.woff$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.woff2$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff2&name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.[ot]tf$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.eot$/,
                loader: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        createHappyPlugin('js', ['babel-loader?cacheDirectory=true']),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "jquery-ui": "./vendors/jquery-ui/js/jquery-ui-1.10.4.custom.js"
        }),
        new webpack.optimize.CommonsChunkPlugin({

            // filename: "vendor.js"
            names: ['vendors', 'ngVendors', 'polyfill'],

            // (Give the chunk a different name)
            minChunks: Infinity
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.HotModuleReplacementPlugin()
    ]
};
