
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://data.gov.hk/api',

    auth: {
      prefix: 'Bearer',
    },

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
          "name": "arrival",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "change_percentage",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "region",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "year_month",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "json",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "en",
                    "kind": "query",
                    "name": "language",
                    "orig": "language",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "Mainland China",
                    "kind": "query",
                    "name": "region",
                    "orig": "region",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "2023-01",
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
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
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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

