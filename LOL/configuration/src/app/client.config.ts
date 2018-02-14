import { Configuration, Plugin, DllReferencePlugin, SourceMapDevToolPlugin, optimize } from "webpack";
import * as merge from "webpack-merge";
import * as common from "./common.config";
import * as helper from "../common/path.helper";
import * as path from "path";
import { AngularCompilerPlugin } from "@ngtools/webpack";
export function configure(env: any): Configuration {
    const configuration: Configuration = {
        entry: {
            "app": helper.root("client", "boot.browser.ts")
        },
        output: {
            path: helper.root("wwwroot", "dist")
        },
        plugins: plugins(),
        devtool: common.isDevBuild ? "cheap-eval-source-map" : false,
        node: {
            fs: "empty"
        }
    };
    return merge(common.configure(env), configuration);
}


function plugins(): Plugin[] {
    if (common.isDevBuild) {
        return [
            new DllReferencePlugin({
                context: __dirname,
                manifest: require(helper.root("wwwroot", "dist", "vendor-manifest.json"))
            }),
            new SourceMapDevToolPlugin({
                filename: "[file].map", // remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(helper.root("wwwroot", "dist"), "[resourcePath]")
                // point sourcemap entries to the original file locations on disk
            })
        ];
    } else {
        return [
            new DllReferencePlugin({
                context: __dirname,
                manifest: require(helper.root("wwwroot", "dist", "vendor-manifest.json"))
            }),
            new AngularCompilerPlugin({
                mainPath: helper.root("client", "boot.browser.ts"),
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.module.browser#AppModule")
                // todo exclude in tsconfig exclude: ["./**/*.server.ts"]
            }),
            new optimize.UglifyJsPlugin({
                output: (<any>{
                    ascii_only: true,
                })
            })
        ];
    }
}