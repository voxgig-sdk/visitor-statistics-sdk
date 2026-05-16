# VisitorStatistics SDK utility: feature_add
module VisitorStatisticsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
