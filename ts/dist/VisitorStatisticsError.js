"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorStatisticsError = void 0;
class VisitorStatisticsError extends Error {
    isVisitorStatisticsError = true;
    sdk = 'VisitorStatistics';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.VisitorStatisticsError = VisitorStatisticsError;
//# sourceMappingURL=VisitorStatisticsError.js.map