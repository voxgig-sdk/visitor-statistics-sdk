"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "visitor_arrival",
        "accessor": "VisitorArrival",
        "op": "list",
        "method": "GET",
        "path": "/visitor-arrivals",
        "args": [],
        "select": {
            "end_date": "2023-12",
            "format": "v1",
            "language": "v1",
            "region": "Mainland China",
            "start_date": "2023-01"
        },
        "headers": [],
        "query": [
            "format",
            "language",
            "start_date",
            "end_date",
            "region"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "metadata": {
                "table": "650-80001",
                "title": "Visitor arrivals by nationality/region",
                "update_frequency": "Monthly",
                "last_updated": "2024-01-15",
                "data_provider": "Census and Statistics Department"
            },
            "data": [
                {
                    "year_month": "2023-12",
                    "region": "Mainland China",
                    "arrivals": 2500000,
                    "change_percentage": 15.2
                },
                {
                    "year_month": "2023-12",
                    "region": "Taiwan",
                    "arrivals": 120000,
                    "change_percentage": 8.5
                }
            ],
            "total_records": 2
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map