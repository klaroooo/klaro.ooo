const
    DevRoot = 'src', WebRoot = 'www',
    webpack = require('webpack'), path = require('path'),

    App = require('./package.json'),


    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin')
;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // mode: 'development',
    mode: 'production',

    context: path.resolve(__dirname, DevRoot),
    entry: {
        build : [
            './index.js',
        ]
    },

    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, WebRoot),
        publicPath: '',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            title: `${App.name} ( v${App.version} )`,
            template: 'index.html',
            filename: 'index.html',
            inject: true
        }),
        new webpack.ProgressPlugin({
            percentBy: 'entries'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ]
            },
            {
                test: /\.(png|jpg|jp?g|gif|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: '[file]'
                }
            },
            {
                test: /\.(ttf|eot|woff(2)?)$/,
                type: "asset/resource",
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
        ]
    },
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000
    },
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    }