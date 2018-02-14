"use strict";
exports.__esModule = true;
var merge = require("webpack-merge");
var webpack_1 = require("webpack");
var common = require("./webpack.vendor.common");
var helper = require("./util");
function browser(env) {
    // todo check whether or not angular material scss should be included here.
    var isDevBuild = !(env && env.prod);
    return merge(common.configure(env), {
        entry: {
            vendor: isDevBuild ? common.allModules : common.nonTreeShakableModules
        },
        output: {
            path: helper.root("wwwroot", "dist")
        },
        plugins: [
            new webpack_1.DllPlugin({
                path: helper.root("wwwroot", "dist", "[name]-manifest.json"),
                name: "[name]_[hash]"
            })
        ]
    });
}
exports.browser = browser;
