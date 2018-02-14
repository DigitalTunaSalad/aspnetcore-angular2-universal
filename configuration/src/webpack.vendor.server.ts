import * as merge from "webpack-merge";
import { Configuration, DllPlugin, optimize } from "webpack";
import * as common from "./webpack.vendor.common";
import * as  helper from "./util";

export function server(env: any): Configuration {
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
            new DllPlugin({
                path: helper.root("client", "dist", "[name]-manifest.json"),
                name: "[name]_[hash]"
            })
        ]
    });
}