const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: "production",
    entry: './src/router.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './vanilla-router.min.js',
        clean: true,
        pathinfo: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false
                    },
                },
                extractComments: false,
            }),
        ],
    }
};