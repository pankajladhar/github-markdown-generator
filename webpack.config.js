const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');


const buildFolder = path.resolve(__dirname, 'build')
const isProd = process.env.NODE_ENV === 'production' // true or false;
const cssDev = ['style-loader', "css-loader", 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", 'sass-loader'],
    publicPath: buildFolder
});
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: './src/index.js',
    output: {
        path: buildFolder,
        filename: 'static/js/app.[hash].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssProd
            },
            {
                test: /\.js$|.jsx$/,
                exclude: /node-modules/,
                loader: 'babel-loader',
                query: {
                    compact: false,
                    cacheDirectory: true
                }
            },
            {
                test: /\.(png|svg|jpe?g|gif|ttf|woff|svg)$/i,
                use: [
                    'file-loader?name=[name].[ext]&outputPath=static/images/&publicPath=/',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: buildFolder,
        compress: true,
        port: 9000,
        hot: true,
        open: true,
        publicPath: '/',
        openPage: ''
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "GitHub Markdown Generator",
            minify: {
                collapseWhitespace: true
            },
            // hash: true,
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: '/static/css/app.[hash].css',
            allChunks: true,
            disable: !isProd
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new DashboardPlugin()
    ]
}