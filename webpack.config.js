var webpack = require('webpack');
var path = require('path');

module.exports = {
    output: {
        filename: './main.js',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    {
                        loader: "jshint-loader"
                    },
                ],
            },
        ],
    },
};
