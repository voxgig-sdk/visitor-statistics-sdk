import { VisitorStatisticsEntityBase } from '../VisitorStatisticsEntityBase';
import type { VisitorStatisticsSDK } from '../VisitorStatisticsSDK';
import type { Control } from '../types';
import type { VisitorArrival, VisitorArrivalListMatch } from '../VisitorStatisticsTypes';
declare class VisitorArrivalEntity extends VisitorStatisticsEntityBase<VisitorArrival> {
    constructor(client: VisitorStatisticsSDK, entopts: any);
    make(this: VisitorArrivalEntity): VisitorArrivalEntity;
    list(this: any, reqmatch?: VisitorArrivalListMatch, ctrl?: Control): Promise<VisitorArrivalEntity[]>;
}
export { VisitorArrivalEntity };
