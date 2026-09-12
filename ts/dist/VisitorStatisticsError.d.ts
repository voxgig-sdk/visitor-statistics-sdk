import { Context } from './Context';
declare class VisitorStatisticsError extends Error {
    isVisitorStatisticsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { VisitorStatisticsError };
