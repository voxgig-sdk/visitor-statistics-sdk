<?php
declare(strict_types=1);

// VisitorStatistics SDK base feature

class VisitorStatisticsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(VisitorStatisticsContext $ctx, array $options): void {}
    public function PostConstruct(VisitorStatisticsContext $ctx): void {}
    public function PostConstructEntity(VisitorStatisticsContext $ctx): void {}
    public function SetData(VisitorStatisticsContext $ctx): void {}
    public function GetData(VisitorStatisticsContext $ctx): void {}
    public function GetMatch(VisitorStatisticsContext $ctx): void {}
    public function SetMatch(VisitorStatisticsContext $ctx): void {}
    public function PrePoint(VisitorStatisticsContext $ctx): void {}
    public function PreSpec(VisitorStatisticsContext $ctx): void {}
    public function PreRequest(VisitorStatisticsContext $ctx): void {}
    public function PreResponse(VisitorStatisticsContext $ctx): void {}
    public function PreResult(VisitorStatisticsContext $ctx): void {}
    public function PreDone(VisitorStatisticsContext $ctx): void {}
    public function PreUnexpected(VisitorStatisticsContext $ctx): void {}
}
