"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'VisitorStatistics',
        slug: "visitor-statistics",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://data.gov.hk/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            visitor_arrival: {},
        }
    };
    entity = {
        "visitor_arrival": {
            "fields": [
                {
                    "name": "arrivals",
                    "req": true,
                    "short": "Number of visitor arrivals",
                    "type": "`$INTEGER`"
                },
                {
                    "format": "float",
                    "name": "change_percentage",
                    "short": "Percentage change compared to previous period",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "region",
                    "req": true,
                    "short": "Nationality or region of residence",
                    "type": "`$STRING`"
                },
                {
                    "name": "year_month",
                    "req": true,
                    "short": "Year and month of the record in YYYY-MM format",
                    "type": "`$STRING`"
                }
            ],
            "name": "visitor_arrival",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "2023-12",
                                        "kind": "query",
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "json",
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "en",
                                        "kind": "query",
                                        "name": "language",
                                        "orig": "language",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "Mainland China",
                                        "kind": "query",
                                        "name": "region",
                                        "orig": "region",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "2023-01",
                                        "kind": "query",
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/visitor-arrivals",
                            "segments": [
                                {
                                    "lit": "visitor-arrivals"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "end_date",
                                    "format",
                                    "language",
                                    "region",
                                    "start_date"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "visitor-arrivals"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map