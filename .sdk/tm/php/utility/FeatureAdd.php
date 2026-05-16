<?php
declare(strict_types=1);

// VisitorStatistics SDK utility: feature_add

class VisitorStatisticsFeatureAdd
{
    public static function call(VisitorStatisticsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
