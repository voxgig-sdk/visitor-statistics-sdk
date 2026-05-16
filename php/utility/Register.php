<?php
declare(strict_types=1);

// VisitorStatistics SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

VisitorStatisticsUtility::setRegistrar(function (VisitorStatisticsUtility $u): void {
    $u->clean = [VisitorStatisticsClean::class, 'call'];
    $u->done = [VisitorStatisticsDone::class, 'call'];
    $u->make_error = [VisitorStatisticsMakeError::class, 'call'];
    $u->feature_add = [VisitorStatisticsFeatureAdd::class, 'call'];
    $u->feature_hook = [VisitorStatisticsFeatureHook::class, 'call'];
    $u->feature_init = [VisitorStatisticsFeatureInit::class, 'call'];
    $u->fetcher = [VisitorStatisticsFetcher::class, 'call'];
    $u->make_fetch_def = [VisitorStatisticsMakeFetchDef::class, 'call'];
    $u->make_context = [VisitorStatisticsMakeContext::class, 'call'];
    $u->make_options = [VisitorStatisticsMakeOptions::class, 'call'];
    $u->make_request = [VisitorStatisticsMakeRequest::class, 'call'];
    $u->make_response = [VisitorStatisticsMakeResponse::class, 'call'];
    $u->make_result = [VisitorStatisticsMakeResult::class, 'call'];
    $u->make_point = [VisitorStatisticsMakePoint::class, 'call'];
    $u->make_spec = [VisitorStatisticsMakeSpec::class, 'call'];
    $u->make_url = [VisitorStatisticsMakeUrl::class, 'call'];
    $u->param = [VisitorStatisticsParam::class, 'call'];
    $u->prepare_auth = [VisitorStatisticsPrepareAuth::class, 'call'];
    $u->prepare_body = [VisitorStatisticsPrepareBody::class, 'call'];
    $u->prepare_headers = [VisitorStatisticsPrepareHeaders::class, 'call'];
    $u->prepare_method = [VisitorStatisticsPrepareMethod::class, 'call'];
    $u->prepare_params = [VisitorStatisticsPrepareParams::class, 'call'];
    $u->prepare_path = [VisitorStatisticsPreparePath::class, 'call'];
    $u->prepare_query = [VisitorStatisticsPrepareQuery::class, 'call'];
    $u->result_basic = [VisitorStatisticsResultBasic::class, 'call'];
    $u->result_body = [VisitorStatisticsResultBody::class, 'call'];
    $u->result_headers = [VisitorStatisticsResultHeaders::class, 'call'];
    $u->transform_request = [VisitorStatisticsTransformRequest::class, 'call'];
    $u->transform_response = [VisitorStatisticsTransformResponse::class, 'call'];
});
