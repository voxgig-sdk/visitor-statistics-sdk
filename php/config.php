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
              'req' => true,
              'short' => 'Number of visitor arrivals',
              'type' => '`$INTEGER`',
            ],
            [
              'format' => 'float',
              'name' => 'change_percentage',
              'short' => 'Percentage change compared to previous period',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'region',
              'req' => true,
              'short' => 'Nationality or region of residence',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'year_month',
              'req' => true,
              'short' => 'Year and month of the record in YYYY-MM format',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'visitor_arrival',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2023-12',
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'json',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'language',
                        'orig' => 'language',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'Mainland China',
                        'kind' => 'query',
                        'name' => 'region',
                        'orig' => 'region',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '2023-01',
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/visitor-arrivals',
                  'segments' => [
                    [
                      'lit' => 'visitor-arrivals',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'end_date',
                      'format',
                      'language',
                      'region',
                      'start_date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'visitor-arrivals',
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
