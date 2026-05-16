<?php
declare(strict_types=1);

// VisitorStatistics SDK utility: prepare_body

class VisitorStatisticsPrepareBody
{
    public static function call(VisitorStatisticsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
