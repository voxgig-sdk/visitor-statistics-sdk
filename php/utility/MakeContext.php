<?php
declare(strict_types=1);

// VisitorStatistics SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class VisitorStatisticsMakeContext
{
    public static function call(array $ctxmap, ?VisitorStatisticsContext $basectx): VisitorStatisticsContext
    {
        return new VisitorStatisticsContext($ctxmap, $basectx);
    }
}
