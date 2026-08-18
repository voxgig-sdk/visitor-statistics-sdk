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
              "name" => "arrivals",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "change_percentage",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "region",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "year_month",
              "req" => true,
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
