<?php
declare(strict_types=1);

// VisitorStatistics SDK utility: prepare_headers

class VisitorStatisticsPrepareHeaders
{
    public static function call(VisitorStatisticsContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
