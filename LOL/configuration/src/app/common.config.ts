import { Configuration, Rule, Plugin } from "webpack";
import { ExtractTextPlugin } from "extract-text-webpack-plugin";
import { CheckerPlugin } from "awesome-typescript-loader";
import * as helper from "../common/path.helper";
export let isDevBuild: boolean;

export function configure(env: any): Configuration {
    isDevBuild = !(env && env.prod);
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
            rules: rules()
        },
        plugins: plugins()
    };
}

function rules(): Rule[] {
    return [
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
            use: ExtractTextPlugin.extract({
                se: [
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
    ];
}

function plugins(): Plugin[] {
    return [
        new CheckerPlugin(),
        new ExtractTextPlugin({
            filename: "theme.css",
            disable: isDevBuild
        })
    ];
}