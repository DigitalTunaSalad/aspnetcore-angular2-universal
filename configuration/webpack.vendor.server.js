"use strict";
exports.__esModule = true;
var merge = require("webpack-merge");
var webpack_1 = require("webpack");
var common = require("./webpack.vendor.common");
var helper = require("./util");
function server(env) {
    // todo check whether or not angular material scss should be included here.
    return merge(common.configure(env), {
        target: "node",
        resolve: { mainFields: ["main"] },
        entry: {
            vendor: common.allModules.concat(["aspnet-prerendering"])
        },
        output: {
            path: helper.root("client", "dist"),
            libraryTarget: "commonjs2"
        },
        plugins: [
            new webpack_1.DllPlugin({
                path: helper.root("client", "dist", "[name]-manifest.json"),
                name: "[name]_[hash]"
            })
        ]
    });
}
exports.server = server;
