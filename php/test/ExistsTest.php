<?php
declare(strict_types=1);

// VisitorStatistics SDK exists test

require_once __DIR__ . '/../visitorstatistics_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = VisitorStatisticsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
