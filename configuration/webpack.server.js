"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var webpack_2 = require("@ngtools/webpack");
var helper = require("./util/helper");
var common = require("./webpack.common");
var merge = require("webpack-merge");
function server(env) {
    var isDevBuild = !(env && env.prod);
    var plugins = [
        new webpack_1.ContextReplacementPlugin(/angular(\\|\/)core/, helper.root("client")),
        new webpack_1.ContextReplacementPlugin(/(.+)?express(\\|\/)(.+)?/, helper.root("client")),
    ];
    if (isDevBuild) {
        plugins.push.apply(plugins, [
            new webpack_1.ContextReplacementPlugin(/angular(\\|\/)core/, helper.root("client")),
            new webpack_1.ContextReplacementPlugin(/(.+)?express(\\|\/)(.+)?/, helper.root("client"))
        ]);
    }
    else {
        plugins.push.apply(plugins, [
            new webpack_1.optimize.UglifyJsPlugin({
                mangle: false,
                compress: false,
                output: {
                    ascii_only: true
                }
            }),
            // plugins that apply in production builds only
            new webpack_2.AngularCompilerPlugin({
                mainPath: helper.root("client", "boot.server.production.ts"),
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.server.module#AppModule")
                // todo: exclude in tsconfig exclude: ['./**/*.browser.ts']
            })
        ]);
    }
    return merge(common.configure(env), {
        entry: {
            "server": isDevBuild ? helper.root("client", "boot.server.ts") : helper.root("client", "boot.server.production.ts")
        },
        plugins: plugins,
        output: {
            libraryTarget: "commonjs",
            path: helper.root("client", "app", "dist")
        },
        target: "node",
        // switch to "inline-source-map" if you want to debug the TS during SSR
        devtool: isDevBuild ? "cheap-eval-source-map" : false
    });
}
exports.server = server;
