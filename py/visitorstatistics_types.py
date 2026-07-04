# Typed models for the VisitorStatistics SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class VisitorArrivalRequired(TypedDict):
    arrival: int
    region: str
    year_month: str


class VisitorArrival(VisitorArrivalRequired, total=False):
    change_percentage: float


class VisitorArrivalListMatch(TypedDict, total=False):
    arrival: int
    change_percentage: float
    region: str
    year_month: str
