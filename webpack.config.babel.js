import { join } from 'path'
const include = join(__dirname, 'src')

export default {
    entry: './src/demo/index',
    output: {
        path: join(__dirname, 'docs'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', include },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
            },
        ],
    },
    devServer: {
        contentBase: 'docs/',
    },
}
