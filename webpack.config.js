const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        path: path.resolve(__dirname, "src", "main.ts"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.[contenthash:8].js",
        clean: true,
    },
    devServer: {
        static: path.resolve(__dirname, "./dist"),
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", "json"],
        fallback: {
            fs: false,
        },
        alias: {
            "handlebars": "handlebars/dist/handlebars.js"
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "",
                        },
                    },
                    "css-loader",
                ],
            },
            {
                test: /\.ts$/,
                include: [path.resolve(__dirname, "src")],
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(__dirname, "tsconfig.json"),
                        },
                    }
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                parallel: true,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "style.[contenthash:8].css",
        }),
    ],
    cache: {
        type: "filesystem",
    },
};
