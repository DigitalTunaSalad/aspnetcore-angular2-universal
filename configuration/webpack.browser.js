"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var helper = require("./util/helper");
var path = require("path");
var webpack_2 = require("@ngtools/webpack");
var common = require("./webpack.common");
var merge = require("webpack-merge");
function browser(env) {
    var isDevBuild = !(env && env.prod);
    var plugins = [
        new webpack_1.DllReferencePlugin({
            context: __dirname,
            manifest: require(helper.root("wwwroot", "dist", "vendor-manifest.json"))
        })
    ];
    if (isDevBuild) {
        plugins.push(// plugins that apply in development builds only
        new webpack_1.SourceMapDevToolPlugin({
            filename: "[file].map",
            moduleFilenameTemplate: path.relative(helper.root("wwwroot", "dist"), "[resourcePath]")
            // point sourcemap entries to the original file locations on disk
        }));
    }
    else {
        plugins.push.apply(plugins, [
            // new BundleAnalyzerPlugin(),
            // plugins that apply in production builds only
            new webpack_2.AngularCompilerPlugin({
                mainPath: helper.root("client", "boot.browser.ts"),
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.module.browser#AppModule"),
                exclude: ["./**/*.server.ts"]
                // todo exclude in tsconfig exclude: ["./**/*.server.ts"]
            }),
            new webpack_1.optimize.UglifyJsPlugin({
                output: {
                    ascii_only: true
                }
            }),
        ]);
    }
    var configuration = {
        entry: {
            "app": helper.root("client", "boot.browser.ts")
        },
        output: {
            path: helper.root("wwwroot", "dist")
        },
        plugins: plugins,
        devtool: isDevBuild ? "cheap-eval-source-map" : false,
        node: {
            fs: "empty"
        }
    };
    return merge(common.configure(env), configuration);
}
exports.browser = browser;
