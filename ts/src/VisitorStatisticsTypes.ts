// Typed models for the VisitorStatistics SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface VisitorArrival {
  arrivals: number
  change_percentage?: number
  region: string
  year_month: string
}

export interface VisitorArrivalListMatch {
  end_date?: string
  format?: string
  language?: string
  region?: string
  start_date?: string
}

