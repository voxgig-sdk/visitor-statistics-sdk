# frozen_string_literal: true

# Typed models for the VisitorStatistics SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# VisitorArrival entity data model.
#
# @!attribute [rw] arrival
#   @return [Integer]
#
# @!attribute [rw] change_percentage
#   @return [Float, nil]
#
# @!attribute [rw] region
#   @return [String]
#
# @!attribute [rw] year_month
#   @return [String]
VisitorArrival = Struct.new(
  :arrival,
  :change_percentage,
  :region,
  :year_month,
  keyword_init: true
)

# Request payload for VisitorArrival#list.
#
# @!attribute [rw] arrival
#   @return [Integer, nil]
#
# @!attribute [rw] change_percentage
#   @return [Float, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] year_month
#   @return [String, nil]
VisitorArrivalListMatch = Struct.new(
  :arrival,
  :change_percentage,
  :region,
  :year_month,
  keyword_init: true
)

