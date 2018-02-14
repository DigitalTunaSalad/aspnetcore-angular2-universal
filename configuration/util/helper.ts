import * as path from "path";
const _root: string = path.resolve(__dirname, "..");
export function root(...args: string[]): string {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}