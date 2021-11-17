const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'none',
    entry: {
        main: './src/js/index.js',
        explore: './src/js/explore.js',
        gallery: './src/js/gallery.js',
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].bundle.js',
        clean: true,
    },
    devServer: {
        static: path.join(__dirname, 'build'),
        watchFiles: ['./src']
    },
    devtool: 'eval-cheap-source-map',
    plugins: [
        new HtmlWebpackPlugin({
        template: './src/explore.html',
        filename: 'index.html',
        chunks: ['main', 'explore'],
        }),
        new HtmlWebpackPlugin({
        template: './src/explore.html',
        filename: 'explore.html',
        chunks: ['main', 'explore'],
        }),
        new HtmlWebpackPlugin({
            template: './src/gallery.html',
            filename: 'gallery.html',
            chunks: ['main', 'gallery'],
        }),
        new HtmlWebpackPlugin({
            template: './src/information.html',
            filename: 'information.html',
            chunks: ['main'],
        }),
        new Dotenv(),
    ],
    resolve: {
        fallback: {
            util: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s(a|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                },
            },
        },
        ],
    },
    experiments: {
        topLevelAwait: true,
    },
};