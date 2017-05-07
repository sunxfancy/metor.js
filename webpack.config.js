const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: "web",
    entry: {
        index: ["./src/Metor.ts"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "metor.bundle.js",
        library: 'Metor',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "test")
                ],
                exclude: [
                    /dist/,
                    /node_modules/,
                ],
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFileName: "tsconfig.json"
                        }
                    }
                ]
            }
        ]
    }
};