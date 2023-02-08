const path = require('path')

module.exports = {
    entry: './frontend/assets/main.js',
    output: {
        path: path.resolve(__dirname, 'public','assets','js'),
        filename: 'bundle.js' 
    },
    mode: 'development',
    devtool:'source-map',
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            },
            {
              test: /\.css$/i,
              use: ["style-loader", "css-loader"],
            }
        ]
    }
}
