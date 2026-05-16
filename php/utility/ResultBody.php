<?php
declare(strict_types=1);

// VisitorStatistics SDK utility: result_body

class VisitorStatisticsResultBody
{
    public static function call(VisitorStatisticsContext $ctx): ?VisitorStatisticsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
