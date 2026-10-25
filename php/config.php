<?php
declare(strict_types=1);

// VisitorStatistics SDK configuration

class VisitorStatisticsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "VisitorStatistics",
                "slug" => "visitor-statistics",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://data.gov.hk/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "visitor_arrival" => [],
                ],
            ],
            "entity" => [
        'visitor_arrival' => [
          'fields' => [
            [
              'name' => 'arrivals',
              'title' => 'Arrivals',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Number of visitor arrivals',
            ],
            [
              'name' => 'change_percentage',
              'title' => 'Change Percentage',
              'type' => '`$NUMBER`',
              'short' => 'Percentage change compared to previous period',
              'format' => 'float',
            ],
            [
              'name' => 'region',
              'title' => 'Region',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Nationality or region of residence',
            ],
            [
              'name' => 'year_month',
              'title' => 'Year Month',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Year and month of the record in YYYY-MM format',
            ],
          ],
          'name' => 'visitor_arrival',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/visitor-arrivals',
                  'segments' => [
                    [
                      'lit' => 'visitor-arrivals',
                    ],
                  ],
                  'parts' => [
                    'visitor-arrivals',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2023-12',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'json',
                      ],
                      [
                        'name' => 'language',
                        'orig' => 'language',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                      [
                        'name' => 'region',
                        'orig' => 'region',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'Mainland China',
                        'field' => true,
                      ],
                      [
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2023-01',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'alternatives' => [
                      [
                        'binary' => true,
                        'kind' => 'raw',
                        'media' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                      ],
                      [
                        'binary' => true,
                        'kind' => 'raw',
                        'media' => 'text/csv',
                      ],
                    ],
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return VisitorStatisticsFeatures::make_feature($name);
    }
}
