
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'VisitorStatistics',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://data.gov.hk/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      visitor_arrival: {
      },

    }
  }


  entity = {
    "visitor_arrival": {
      "fields": [
        {
          "name": "arrivals",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "change_percentage",
          "type": "`$NUMBER`"
        },
        {
          "name": "region",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "year_month",
          "req": true,
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
              "parts": [
                "visitor-arrivals"
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
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

