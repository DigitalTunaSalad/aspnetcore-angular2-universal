"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var helper = require("./util");
exports.treeShakableModules = [
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
exports.nonTreeShakableModules = [
    // 'bootstrap',
    // 'bootstrap/dist/css/bootstrap.css',
    "core-js",
    // 'es6-promise',
    // 'es6-shim',
    "event-source-polyfill",
];
exports.allModules = exports.treeShakableModules.concat(exports.nonTreeShakableModules);
function configure(env) {
    var isDevBuild = !(env && env.prod);
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
            new webpack_1.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, helper.root("client")),
            // workaround for https://github.com/angular/angular/issues/11580
            new webpack_1.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, helper.root("client")),
            // workaround for https://github.com/angular/angular/issues/14898
            new webpack_1.IgnorePlugin(/^vertx$/)
            // workaround for https://github.com/stefanpenner/es6-promise/issues/100
        ].concat(isDevBuild ? [] : [new webpack_1.optimize.UglifyJsPlugin()])
    };
}
exports.configure = configure;
