const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');


const buildFolder = path.resolve(__dirname, 'build')
const isProd = process.env.NODE_ENV === 'production' // true or false;
const cssDev = ['style-loader', "css-loader", 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
        {
            loader: "style-loader"
        },
        {
            loader: "css-loader", options: { sourceMap: true }
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                    }),
                ],
            }
        },
        {
            loader: "sass-loader"
        }
    ],
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
                exclude: /node-modules/,
                use: cssConfig
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