const fs = require('fs');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',

    devServer: {
        http2: true,
        https: {
            key: fs.readFileSync(path.resolve(__dirname, '..', 'localhost.key')),
            cert: fs.readFileSync(path.resolve(__dirname, '..', 'localhost.cert'))
        }
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin(),
        new CircularDependencyPlugin()
    ]
};
