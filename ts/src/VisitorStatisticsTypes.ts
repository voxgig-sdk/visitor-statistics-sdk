// Typed models for the VisitorStatistics SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface VisitorArrival {
  arrival: number
  change_percentage?: number
  region: string
  year_month: string
}

export interface VisitorArrivalListMatch {
  arrival?: number
  change_percentage?: number
  region?: string
  year_month?: string
}

