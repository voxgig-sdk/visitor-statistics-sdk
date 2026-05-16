-- VisitorStatistics SDK error

local VisitorStatisticsError = {}
VisitorStatisticsError.__index = VisitorStatisticsError


function VisitorStatisticsError.new(code, msg, ctx)
  local self = setmetatable({}, VisitorStatisticsError)
  self.is_sdk_error = true
  self.sdk = "VisitorStatistics"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function VisitorStatisticsError:error()
  return self.msg
end


function VisitorStatisticsError:__tostring()
  return self.msg
end


return VisitorStatisticsError
