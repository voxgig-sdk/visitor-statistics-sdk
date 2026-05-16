# VisitorStatistics SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module VisitorStatisticsFeatures
  def self.make_feature(name)
    case name
    when "base"
      VisitorStatisticsBaseFeature.new
    when "test"
      VisitorStatisticsTestFeature.new
    else
      VisitorStatisticsBaseFeature.new
    end
  end
end
