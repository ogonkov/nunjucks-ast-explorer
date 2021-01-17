const fs = require('fs');
const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = function(env, argv) {
    const devMode = argv.mode !== 'production';
    const plugins = [
        new HTMLWebpackPlugin({
            scriptLoading: 'defer',
            meta: {
                description: 'Explore Nunjucks template AST',
                viewport: 'width=device-width, initial-scale=1',
                'theme-color': '#3CB371'
            }
        }),
        new CircularDependencyPlugin()
    ];
    let devServer = {};
    if (!devMode) {
        plugins.push(new MiniCssExtractPlugin());
    } else {
        devServer = {
            http2: true,
            https: {
                key: fs.readFileSync(path.resolve(__dirname, '..', 'localhost.key')),
                cert: fs.readFileSync(path.resolve(__dirname, '..', 'localhost.cert'))
            }
        };
    }

    return {
        devServer,

        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
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

        plugins
    };
};
