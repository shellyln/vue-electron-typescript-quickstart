var path    = require('path');
var webpack = require('webpack');



module.exports = function (env) {
    return [{
        target: "electron-main",
        entry: {
            spec: [
                path.resolve(__dirname, 'src.mainproc/main.ts')
            ]
        },
        output: {
            library: 'main',

            libraryTarget: 'commonjs2',
            filename: 'main.js',
            path: path.resolve(__dirname, 'bin'),
            devtoolModuleFilenameTemplate: '../[resource-path]',
            // devtoolModuleFilenameTemplate: void 0
        },
        node: {
            __filename: false,
            __dirname: false,
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    'ts-loader?' + JSON.stringify({
                        configFile: 'tsconfig.mainproc.json'
                    }),
                ],
                exclude: /node_modules[\/\\].*$/
            }, {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules[\/\\].*$/
            }, {
                enforce: 'pre',
                test: /\.[tj]sx?$/,
                use: {
                    loader: 'source-map-loader',
                    options: {
                    }
                },
                exclude: /node_modules[\/\\].*$/
            }]
        },
        plugins: [],
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js']
        },
        devtool: 'source-map'
    },

]}