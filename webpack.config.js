{
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const path = require('path');

    module.exports = {
        output: {
            path: path.resolve(__dirname, 'www')
        },
        plugins: [
            new MiniCssExtractPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
    }
}
