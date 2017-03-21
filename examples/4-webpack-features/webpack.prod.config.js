const webpack = require('webpack');
const conf = require('./config/config.js');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
    devtool: 'source-map',
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
                loader: 'babel-loader'
            },
            {
                test: /\.ts$/,
                exclude: [/vendors/, /node_modules/],
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.less$/,
                // loader: 'style-loader?sourceMap=true!css-loader?importLoaders=1&sourceMap=true!postcss-loader!less-loader?sourceMap=true'
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?importLoaders=1!postcss-loader!less-loader"
                })
            },
            {
                test: /\.css$/,
                // loader: 'style-loader?sourceMap=true!css-loader?importLoaders=1&sourceMap=true!postcss-loader'
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?importLoaders=1!postcss-loader"
                })
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
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "production"
            }
        }),
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
        new webpack.HotModuleReplacementPlugin(),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.svg$|\.eot$|\.[ot]tf$|\.woff2$|\.woff$|\.js$|\.css$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                pure_funcs: ['console.log', 'window.console.log.apply']
            }
        })
    ]
};
