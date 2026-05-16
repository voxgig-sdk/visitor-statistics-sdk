<?php
declare(strict_types=1);

// VisitorStatistics SDK utility: result_headers

class VisitorStatisticsResultHeaders
{
    public static function call(VisitorStatisticsContext $ctx): ?VisitorStatisticsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
