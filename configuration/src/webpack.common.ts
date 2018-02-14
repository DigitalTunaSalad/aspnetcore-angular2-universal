import { Configuration } from "webpack";
import { CheckerPlugin } from "awesome-typescript-loader";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as helper from "./util";
export function configure(env: any): Configuration {
    const isDevBuild: boolean = !(env && env.prod);
    const extractTextPlugin: ExtractTextPlugin = new ExtractTextPlugin({
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
            new CheckerPlugin(),
            extractTextPlugin
        ]
    };
}