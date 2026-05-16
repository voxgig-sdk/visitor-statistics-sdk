package = "voxgig-sdk-visitor-statistics"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/visitor-statistics-sdk.git"
}
description = {
  summary = "VisitorStatistics SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["visitor-statistics_sdk"] = "visitor-statistics_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
