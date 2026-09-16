# VisitorStatistics SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module VisitorStatisticsFeatures
  def self.make_feature(name)
    case name
    when "base"
      VisitorStatisticsBaseFeature.new
    when "ratelimit"
      VisitorStatisticsRatelimitFeature.new
    when "retry"
      VisitorStatisticsRetryFeature.new
    when "test"
      VisitorStatisticsTestFeature.new
    when "timeout"
      VisitorStatisticsTimeoutFeature.new
    else
      VisitorStatisticsBaseFeature.new
    end
  end
end
