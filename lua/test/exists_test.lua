-- VisitorStatistics SDK exists test

local sdk = require("visitor-statistics_sdk")

describe("VisitorStatisticsSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
