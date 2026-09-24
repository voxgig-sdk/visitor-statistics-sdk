"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('VisitorArrivalEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when VISITOR_STATISTICS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('VISITOR_STATISTICS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.VisitorStatisticsSDK.test();
        const ent = testsdk.VisitorArrival();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.VISITOR_STATISTICS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'visitor_arrival.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "arrivals": { "a": true, "h": "Arrivals", "n": "arrivals", "r": true, "sh": "Number of visitor arrivals", "t": "`$INTEGER`", "key$": "arrivals", "index$": 0 }, "change_percentage": { "a": true, "fo": "float", "h": "Change Percentage", "n": "change_percentage", "r": false, "sh": "Percentage change compared to previous period", "t": "`$NUMBER`", "key$": "change_percentage", "index$": 1 }, "region": { "a": true, "h": "Region", "n": "region", "r": true, "sh": "Nationality or region of residence", "t": "`$STRING`", "key$": "region", "index$": 2 }, "year_month": { "a": true, "h": "Year Month", "n": "year_month", "r": true, "sh": "Year and month of the record in YYYY-MM format", "t": "`$STRING`", "key$": "year_month", "index$": 3 } }, "name": "visitor_arrival", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /visitor-arrivals", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2023-12", "k": "query", "n": "end_date", "or": "end_date", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "en", "k": "query", "n": "language", "or": "language", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "Mainland China", "k": "query", "n": "region", "or": "region", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "2023-01", "k": "query", "n": "start_date", "or": "start_date", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/visitor-arrivals", "q": { "exist": ["end_date", "format", "language", "region", "start_date"] }, "r": {}, "s": [{ "lit": "visitor-arrivals" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "visitor_arrival", "name__orig": "visitor_arrival", "Name": "VisitorArrival", "name_": "visitor_arrival", "name-": "visitor-arrival", "NAME": "VISITOR_ARRIVAL", "index$": 0 }, { "active": true, "entity": "visitor_arrival", "key$": "BasicVisitorArrivalFlow", "kind": "basic", "name": "BasicVisitorArrivalFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "visitor_arrival_ref01" } }], "index$": 0 }] }, 'VisitorArrival', { "GET /visitor-arrivals": { "protocol": "http", "operationId": "getVisitorArrivals", "responses": { "200": { "description": "Successful response with visitor arrival statistics", "content": { "application/json": { "schema": { "type": "object", "properties": { "metadata": { "key$": "metadata", "properties": { "data_dictionary_url": { "description": "URL to the data dictionary", "example": "https://www.censtatd.gov.hk/datagovhk/WT_data_dict_en.pdf", "format": "uri", "type": "string" }, "data_provider": { "description": "Organization providing the data", "example": "Census and Statistics Department", "type": "string" }, "last_updated": { "description": "Date when the data was last updated", "example": "2024-01-15", "format": "date", "type": "string" }, "table": { "description": "Table identifier", "example": "650-80001", "type": "string" }, "title": { "description": "Title of the dataset", "example": "Visitor arrivals by nationality/region", "type": "string" }, "update_frequency": { "description": "Frequency of data updates", "example": "Monthly", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Metadata" }, "data": { "items": { "properties": { "arrivals": { "description": "Number of visitor arrivals", "example": 2500000, "type": "integer", "key$": "arrivals" }, "change_percentage": { "description": "Percentage change compared to previous period", "example": 15.2, "format": "float", "type": "number", "key$": "change_percentage" }, "region": { "description": "Nationality or region of residence", "example": "Mainland China", "type": "string", "key$": "region" }, "year_month": { "description": "Year and month of the record in YYYY-MM format", "example": "2023-12", "pattern": "^\\d{4}-\\d{2}$", "type": "string", "key$": "year_month" } }, "required": ["year_month", "region", "arrivals"], "type": "object", "x-ref": "#/components/schemas/VisitorArrivalRecord", "index$": 0 }, "key$": "data", "type": "array" }, "total_records": { "description": "Total number of records returned", "example": 100, "key$": "total_records", "type": "integer" } }, "x-ref": "#/components/schemas/VisitorArrivalsResponse" }, "examples": { "success": { "summary": "Example visitor arrivals data", "value": { "metadata": { "table": "650-80001", "title": "Visitor arrivals by nationality/region", "update_frequency": "Monthly", "last_updated": "2024-01-15", "data_provider": "Census and Statistics Department" }, "data": [{ "year_month": "2023-12", "region": "Mainland China", "arrivals": 2500000, "change_percentage": 15.2 }, { "year_month": "2023-12", "region": "Taiwan", "arrivals": 120000, "change_percentage": 8.5 }], "total_records": 2 } } } }, "text/csv": { "schema": { "type": "string", "format": "binary" }, "example": "year_month,region,arrivals,change_percentage\n2023-12,Mainland China,2500000,15.2\n2023-12,Taiwan,120000,8.5" }, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { "schema": { "type": "string", "format": "binary" } } } }, "400": { "description": "Bad request - Invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code", "example": "INVALID_PARAMETER" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Invalid date format. Please use YYYY-MM format." } }, "required": ["code", "message"] } }, "x-ref": "#/components/schemas/ErrorResponse" }, "example": { "error": { "code": "INVALID_PARAMETER", "message": "Invalid date format. Please use YYYY-MM format." } } } } }, "404": { "description": "Data not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code", "example": "INVALID_PARAMETER" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Invalid date format. Please use YYYY-MM format." } }, "required": ["code", "message"] } }, "x-ref": "#/components/schemas/ErrorResponse" }, "example": { "error": { "code": "NOT_FOUND", "message": "No data available for the specified period." } } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code", "example": "INVALID_PARAMETER" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Invalid date format. Please use YYYY-MM format." } }, "required": ["code", "message"] } }, "x-ref": "#/components/schemas/ErrorResponse" }, "example": { "error": { "code": "INTERNAL_ERROR", "message": "An unexpected error occurred. Please try again later." } } } } } }, "parameters": [{ "name": "format", "in": "query", "description": "The desired response format for the data", "required": false, "schema": { "type": "string", "enum": ["json", "csv", "xlsx"], "default": "json" }, "index$": 0 }, { "name": "language", "in": "query", "description": "The language for the response data", "required": false, "schema": { "type": "string", "enum": ["en", "zh-hant", "zh-hans"], "default": "en" }, "index$": 1 }, { "name": "start_date", "in": "query", "description": "Start date for filtering data (YYYY-MM format)", "required": false, "schema": { "type": "string", "pattern": "^\\d{4}-\\d{2}$", "example": "2023-01" }, "index$": 2 }, { "name": "end_date", "in": "query", "description": "End date for filtering data (YYYY-MM format)", "required": false, "schema": { "type": "string", "pattern": "^\\d{4}-\\d{2}$", "example": "2023-12" }, "index$": 3 }, { "name": "region", "in": "query", "description": "Filter by specific nationality or region", "required": false, "schema": { "type": "string", "example": "Mainland China" }, "index$": 4 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let visitor_arrival_ref01_data = Object.values(setup.data.existing.visitor_arrival)[0];
        // LIST
        const visitor_arrival_ref01_ent = client.VisitorArrival();
        const visitor_arrival_ref01_match = {};
        const visitor_arrival_ref01_list = (await visitor_arrival_ref01_ent.list(visitor_arrival_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/visitor_arrival/VisitorArrivalTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.VisitorStatisticsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['visitor_arrival01', 'visitor_arrival02', 'visitor_arrival03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'VISITOR_STATISTICS_TEST_VISITOR_ARRIVAL_ENTID': idmap,
        'VISITOR_STATISTICS_TEST_LIVE': 'FALSE',
        'VISITOR_STATISTICS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['VISITOR_STATISTICS_TEST_VISITOR_ARRIVAL_ENTID'];
    const live = 'TRUE' === env.VISITOR_STATISTICS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['VISITOR_STATISTICS_TEST_VISITOR_ARRIVAL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.VisitorStatisticsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.VISITOR_STATISTICS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=VisitorArrivalEntity.test.js.map