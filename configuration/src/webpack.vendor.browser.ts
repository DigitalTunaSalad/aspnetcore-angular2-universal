import * as merge from "webpack-merge";
import { Configuration, DllPlugin, optimize } from "webpack";
import * as common from "./webpack.vendor.common";
import * as  helper from "./util";
export function browser(env: any): Configuration {
    // todo check whether or not angular material scss should be included here.
    const isDevBuild: boolean = !(env && env.prod);
    return merge(common.configure(env), {
        entry: {
            vendor: isDevBuild ? common.allModules : common.nonTreeShakableModules
        },
        output: {
            path: helper.root("wwwroot", "dist")
        },
        plugins: [
            new DllPlugin({
                path: helper.root("wwwroot", "dist", "[name]-manifest.json"),
                name: "[name]_[hash]"
            })
        ]
    });
}