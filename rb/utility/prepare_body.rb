# VisitorStatistics SDK utility: prepare_body
require_relative 'media'
module VisitorStatisticsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return VisitorStatisticsUtilities.raw_body(ctx.reqdata) if VisitorStatisticsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
