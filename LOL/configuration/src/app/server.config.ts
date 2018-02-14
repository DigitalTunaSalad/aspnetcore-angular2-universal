import { Configuration } from "webpack";
import * as merge from "webpack-merge";
import * as common from "./common.config";
export function configure(env: any): Configuration {
    const configuration: Configuration = {

    };
    return merge(common.configure(env), configuration);
}