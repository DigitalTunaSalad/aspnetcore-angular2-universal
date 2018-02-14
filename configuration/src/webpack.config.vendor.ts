import { Configuration } from "webpack";
import { server } from "./webpack.vendor.server";
import { browser } from "./webpack.vendor.browser";
module.exports = (env: any): Configuration[] => {
    return [browser(env), server(env)];
};