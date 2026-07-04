# VisitorStatistics SDK configuration

module VisitorStatisticsConfig
  def self.make_config
    {
      "main" => {
        "name" => "VisitorStatistics",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://data.gov.hk/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "visitor_arrival" => {},
        },
      },
      "entity" => {
        "visitor_arrival" => {
          "fields" => [
            {
              "active" => true,
              "name" => "arrival",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "change_percentage",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "region",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "year_month",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 3,
            },
          ],
          "name" => "visitor_arrival",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "2023-12",
                        "kind" => "query",
                        "name" => "end_date",
                        "orig" => "end_date",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => "json",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => "en",
                        "kind" => "query",
                        "name" => "language",
                        "orig" => "language",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => "Mainland China",
                        "kind" => "query",
                        "name" => "region",
                        "orig" => "region",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => "2023-01",
                        "kind" => "query",
                        "name" => "start_date",
                        "orig" => "start_date",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/visitor-arrivals",
                  "parts" => [
                    "visitor-arrivals",
                  ],
                  "select" => {
                    "exist" => [
                      "end_date",
                      "format",
                      "language",
                      "region",
                      "start_date",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    VisitorStatisticsFeatures.make_feature(name)
  end
end
