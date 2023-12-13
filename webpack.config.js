const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'prod/assets'),
        filename: 'app.js',
    },
    module: {
        rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
    },
};