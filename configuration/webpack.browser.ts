import { Configuration, DllReferencePlugin, Plugin, SourceMapDevToolPlugin, optimize } from "webpack";
import * as helper from "./util/helper";
import * as path from "path";
import { AngularCompilerPlugin } from "@ngtools/webpack";
import * as common from "./webpack.common";
import * as merge from "webpack-merge";
export function browser(env: any): Configuration {
    const isDevBuild: boolean = !(env && env.prod);
    var plugins: Plugin[] = [
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(helper.root("wwwroot", "dist", "vendor-manifest.json"))
        })
    ];

    if (isDevBuild) {
        plugins.push( // plugins that apply in development builds only
            new SourceMapDevToolPlugin({
                filename: "[file].map", // remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(helper.root("wwwroot", "dist"), "[resourcePath]")
                // point sourcemap entries to the original file locations on disk
            }));
    } else {
        plugins.push(...[
            // new BundleAnalyzerPlugin(),
            // plugins that apply in production builds only
            new AngularCompilerPlugin({
                mainPath: helper.root("client", "boot.browser.ts"),
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.module.browser#AppModule"),
                // todo exclude in tsconfig exclude: ["./**/*.server.ts"]
            }),
            new optimize.UglifyJsPlugin({
                output: (<any>{
                    ascii_only: true,
                })
            }),
        ]);
    }

    return merge(common.configure(env), {
        entry: {
            "app": helper.root("client", "boot.browser.ts")
        },
        output: {
            path: path.join(__dirname, helper.root("wwwroot", "dist"))
        },
        plugins: plugins,
        devtool: isDevBuild ? "cheap-eval-source-map" : false,
        node: {
            fs: "empty"
        }
    });
}