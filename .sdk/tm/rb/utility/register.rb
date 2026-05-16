# VisitorStatistics SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

VisitorStatisticsUtility.registrar = ->(u) {
  u.clean = VisitorStatisticsUtilities::Clean
  u.done = VisitorStatisticsUtilities::Done
  u.make_error = VisitorStatisticsUtilities::MakeError
  u.feature_add = VisitorStatisticsUtilities::FeatureAdd
  u.feature_hook = VisitorStatisticsUtilities::FeatureHook
  u.feature_init = VisitorStatisticsUtilities::FeatureInit
  u.fetcher = VisitorStatisticsUtilities::Fetcher
  u.make_fetch_def = VisitorStatisticsUtilities::MakeFetchDef
  u.make_context = VisitorStatisticsUtilities::MakeContext
  u.make_options = VisitorStatisticsUtilities::MakeOptions
  u.make_request = VisitorStatisticsUtilities::MakeRequest
  u.make_response = VisitorStatisticsUtilities::MakeResponse
  u.make_result = VisitorStatisticsUtilities::MakeResult
  u.make_point = VisitorStatisticsUtilities::MakePoint
  u.make_spec = VisitorStatisticsUtilities::MakeSpec
  u.make_url = VisitorStatisticsUtilities::MakeUrl
  u.param = VisitorStatisticsUtilities::Param
  u.prepare_auth = VisitorStatisticsUtilities::PrepareAuth
  u.prepare_body = VisitorStatisticsUtilities::PrepareBody
  u.prepare_headers = VisitorStatisticsUtilities::PrepareHeaders
  u.prepare_method = VisitorStatisticsUtilities::PrepareMethod
  u.prepare_params = VisitorStatisticsUtilities::PrepareParams
  u.prepare_path = VisitorStatisticsUtilities::PreparePath
  u.prepare_query = VisitorStatisticsUtilities::PrepareQuery
  u.result_basic = VisitorStatisticsUtilities::ResultBasic
  u.result_body = VisitorStatisticsUtilities::ResultBody
  u.result_headers = VisitorStatisticsUtilities::ResultHeaders
  u.transform_request = VisitorStatisticsUtilities::TransformRequest
  u.transform_response = VisitorStatisticsUtilities::TransformResponse
}
