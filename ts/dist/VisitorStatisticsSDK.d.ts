import { VisitorArrivalEntity } from './entity/VisitorArrivalEntity';
export type * from './VisitorStatisticsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { VisitorStatisticsEntityBase } from './VisitorStatisticsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class VisitorStatisticsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    VisitorArrival(entopts?: Record<string, any>): VisitorArrivalEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): VisitorStatisticsSDK;
    tester(testopts?: any, sdkopts?: any): VisitorStatisticsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof VisitorStatisticsSDK;
export { stdutil, config, BaseFeature, VisitorStatisticsEntityBase, VisitorStatisticsSDK, SDK, };
