# VisitorStatistics SDK configuration


def make_config():
    return {
        "main": {
            "name": "VisitorStatistics",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://data.gov.hk/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "visitor_arrival": {},
            },
        },
        "entity": {
      "visitor_arrival": {
        "fields": [
          {
            "name": "arrival",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "change_percentage",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "region",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "year_month",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "visitor_arrival",
        "op": {
          "list": {
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
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "json",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "language",
                      "orig": "language",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "Mainland China",
                      "kind": "query",
                      "name": "region",
                      "orig": "region",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "2023-01",
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/visitor-arrivals",
                "parts": [
                  "visitor-arrivals",
                ],
                "select": {
                  "exist": [
                    "end_date",
                    "format",
                    "language",
                    "region",
                    "start_date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
