<?php
declare(strict_types=1);

// Typed models for the VisitorStatistics SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** VisitorArrival entity data model. */
class VisitorArrival
{
    public int $arrival;
    public ?float $change_percentage = null;
    public string $region;
    public string $year_month;
}

/** Match filter for VisitorArrival#list (any subset of VisitorArrival fields). */
class VisitorArrivalListMatch
{
    public ?int $arrival = null;
    public ?float $change_percentage = null;
    public ?string $region = null;
    public ?string $year_month = null;
}

