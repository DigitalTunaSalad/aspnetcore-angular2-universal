import * as path from "path";
const _root: string = path.resolve(__dirname, "..", "..");
export function root(...args: string[]): string {
    return path.join(_root, ...args);
}