# Typed models for the VisitorStatistics SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class VisitorArrival:
    arrival: int
    region: str
    year_month: str
    change_percentage: Optional[float] = None


@dataclass
class VisitorArrivalListMatch:
    arrival: Optional[int] = None
    change_percentage: Optional[float] = None
    region: Optional[str] = None
    year_month: Optional[str] = None

