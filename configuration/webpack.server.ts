import { Configuration, ContextReplacementPlugin, Plugin, optimize } from "webpack";
import { AngularCompilerPlugin } from "@ngtools/webpack";
import * as helper from "./util/helper";
import * as common from "./webpack.common";
import * as merge from "webpack-merge";
export function server(env: any): Configuration {
    const isDevBuild: boolean = !(env && env.prod);
    var plugins: Plugin[] = [
        new ContextReplacementPlugin(/angular(\\|\/)core/, helper.root("client")),
        new ContextReplacementPlugin(/(.+)?express(\\|\/)(.+)?/, helper.root("client")),
    ];
    if (isDevBuild) {
        plugins.push(...[
            new ContextReplacementPlugin(/angular(\\|\/)core/, helper.root("client")),
            new ContextReplacementPlugin(/(.+)?express(\\|\/)(.+)?/, helper.root("client"))
        ]);
    } else {
        plugins.push(...[
            new optimize.UglifyJsPlugin({
                mangle: false,
                compress: false,
                output: (<any>{
                    ascii_only: true,
                })
            }),
            // plugins that apply in production builds only
            new AngularCompilerPlugin({
                mainPath: helper.root("client", "boot.server.production.ts"),
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.server.module#AppModule")
                // todo: exclude in tsconfig exclude: ['./**/*.browser.ts']
            })
        ]);
    }

    return merge(common.configure(env), {
        entry: {
            "server":
                isDevBuild ? helper.root("client", "boot.server.ts") : helper.root("client", "boot.server.production.ts")
        },
        plugins: plugins,
        output: {
            libraryTarget: "commonjs",
            path:helper.root("client", "app", "dist")
        },
        target: "node",
        // switch to "inline-source-map" if you want to debug the TS during SSR
        devtool: isDevBuild ? "cheap-eval-source-map" : false
    });
}