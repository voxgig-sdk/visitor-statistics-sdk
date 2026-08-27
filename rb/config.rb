# VisitorStatistics SDK configuration

module VisitorStatisticsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "VisitorStatistics",
        "slug" => "visitor-statistics",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "name" => "arrivals",
              "req" => true,
              "short" => "Number of visitor arrivals",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "change_percentage",
              "short" => "Percentage change compared to previous period",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "region",
              "req" => true,
              "short" => "Nationality or region of residence",
              "type" => "`$STRING`",
            },
            {
              "name" => "year_month",
              "req" => true,
              "short" => "Year and month of the record in YYYY-MM format",
              "type" => "`$STRING`",
            },
          ],
          "name" => "visitor_arrival",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2023-12",
                        "kind" => "query",
                        "name" => "end_date",
                        "orig" => "end_date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "json",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "en",
                        "kind" => "query",
                        "name" => "language",
                        "orig" => "language",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "Mainland China",
                        "kind" => "query",
                        "name" => "region",
                        "orig" => "region",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2023-01",
                        "kind" => "query",
                        "name" => "start_date",
                        "orig" => "start_date",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
