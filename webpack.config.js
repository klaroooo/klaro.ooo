const
    path = require('path'),
    date = new Date(),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
    svgToMiniDataURI = require('mini-svg-data-uri'),
    src = path.resolve(__dirname, 'src'),
    pub = 'www', assets = 'res'
    ASSET_PATH = process.env.ASSET_PATH || '/',
    TerserPlugin = require('terser-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin')
;

module.exports = {
    mode: "development",
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: path.join(assets, '[name].css')
        }),
        new webpack.SourceMapDevToolPlugin(),
        new webpack.ProgressPlugin({
            percentBy: 'entries'
        })
    ],
    entry: {
        build : [
            path.resolve(__dirname, path.join(src, 'index.js')),
            path.resolve(__dirname, path.join(src, 'index.html')),
            path.resolve(__dirname, path.join(src, 'style.sass'))
        ]
    },
    output: {
        filename: path.join(assets, 'app.js'),
        path: path.resolve(__dirname, pub),
        publicPath: ASSET_PATH,
        assetModuleFilename: path.join(assets, '[ext]/[name][ext]')
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/i,
                type: 'asset/source',
                generator: {
                    filename: 'index.html'
                }
            },
            {
                test: /\.(png|jpg|jp?g|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.svg$/i,
                type: "asset/inline",
                generator: {
                    dataUrl: content => {
                        content = content.toString();
                        return svgToMiniDataURI(content);
                    }
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: path.join(assets, 'font/[hash][ext]')
                }
            },
        ]
    },
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000
    },
    optimization: {
        // minimize: true,
        // minimizer: [
        //     `...`,
        //     new TerserPlugin(),
        //     new CssMinimizerPlugin()
        // ]
    }
}