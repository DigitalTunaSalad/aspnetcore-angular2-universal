import { Configuration } from "webpack";
import { server } from "./webpack.server";
import { browser } from "./webpack.browser";
module.exports = (env: any): Configuration[] => {
    return [browser(env), server(env)];
};