import { Strategy } from "passport-http-bearer";
declare const BearerStrategy_base: new (...args: any[]) => Strategy<import("passport-http-bearer").VerifyFunctions>;
export declare class BearerStrategy extends BearerStrategy_base {
    constructor();
    validate(token: string): Promise<string | Error>;
}
export {};
