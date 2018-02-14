"use strict";
exports.__esModule = true;
var awesome_typescript_loader_1 = require("awesome-typescript-loader");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var helper = require("./util");
function configure(env) {
    var isDevBuild = !(env && env.prod);
    var extractTextPlugin = new ExtractTextPlugin({
        filename: "theme.css",
        disable: isDevBuild
    });
    return {
        stats: {
            modules: false
        },
        context: __dirname,
        resolve: {
            extensions: [".js", ".ts"]
        },
        output: {
            filename: "[name].js",
            publicPath: "dist/" // webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: isDevBuild ? [
                        "awesome-typescript-loader?silent=true",
                        "angular2-template-loader",
                        "angular2-router-loader"
                    ] : "@ngtools/webpack"
                },
                {
                    test: /\.html$/,
                    use: "html-loader?minimize=false"
                },
                {
                    test: /\.scss$/,
                    include: helper.root("client", "app"),
                    loaders: ["raw-loader", "sass-loader"]
                },
                {
                    test: /\.scss$/,
                    exclude: helper.root("client", "app"),
                    include: helper.root("client", "theming"),
                    use: extractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader"
                            },
                            {
                                loader: "sass-loader"
                            }
                        ],
                        // use style-loader in development
                        fallback: "style-loader"
                    })
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: "url-loader?limit=25000"
                }
            ]
        },
        plugins: [
            new awesome_typescript_loader_1.CheckerPlugin(),
            extractTextPlugin
        ]
    };
}
exports.configure = configure;
