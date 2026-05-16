<?php
declare(strict_types=1);

// VisitorStatistics SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class VisitorStatisticsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new VisitorStatisticsBaseFeature();
            case "test":
                return new VisitorStatisticsTestFeature();
            default:
                return new VisitorStatisticsBaseFeature();
        }
    }
}
