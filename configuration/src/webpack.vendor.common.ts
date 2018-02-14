import { Configuration, ContextReplacementPlugin, IgnorePlugin, optimize } from "webpack";
import * as helper from "./util";
export const treeShakableModules: string[] = [
    "@angular/animations",
    "@angular/common",
    "@angular/compiler",
    "@angular/core",
    "@angular/forms",
    "@angular/http",
    "@angular/platform-browser",
    "@angular/platform-browser-dynamic",
    "@angular/router",
    "ngx-bootstrap",
    "zone.js",
];
export const nonTreeShakableModules: string[] = [
    // 'bootstrap',
    // 'bootstrap/dist/css/bootstrap.css',
    "core-js",
    // 'es6-promise',
    // 'es6-shim',
    "event-source-polyfill",
    // 'jquery',
];
export const allModules: string[] = [
    ...treeShakableModules,
    ...nonTreeShakableModules
];
export function configure(env: any): Configuration {
    const isDevBuild: boolean = !(env && env.prod);
    return {
        stats: { modules: false },
        resolve: { extensions: [".js"] },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: "url-loader?limit=100000" }
            ]
        },
        output: {
            publicPath: "dist/",
            filename: "[name].js",
            library: "[name]_[hash]"
        },
        plugins: [
            // new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
            // maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, helper.root("client")),
            // workaround for https://github.com/angular/angular/issues/11580
            new ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, helper.root("client")),
            // workaround for https://github.com/angular/angular/issues/14898
            new IgnorePlugin(/^vertx$/)
            // workaround for https://github.com/stefanpenner/es6-promise/issues/100
        ].concat(isDevBuild ? [] : [new optimize.UglifyJsPlugin()])
    };
}