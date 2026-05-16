# VisitorStatistics SDK utility: make_context
require_relative '../core/context'
module VisitorStatisticsUtilities
  MakeContext = ->(ctxmap, basectx) {
    VisitorStatisticsContext.new(ctxmap, basectx)
  }
end
