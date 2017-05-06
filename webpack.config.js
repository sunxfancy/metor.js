const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: "web",
    entry: {
        index: ["./src/Metor.ts"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
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