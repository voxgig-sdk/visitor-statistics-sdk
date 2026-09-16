# VisitorStatistics SDK feature factory

from visitorstatistics_sdk.feature.base_feature import VisitorStatisticsBaseFeature
from visitorstatistics_sdk.feature.ratelimit_feature import VisitorStatisticsRatelimitFeature
from visitorstatistics_sdk.feature.retry_feature import VisitorStatisticsRetryFeature
from visitorstatistics_sdk.feature.test_feature import VisitorStatisticsTestFeature
from visitorstatistics_sdk.feature.timeout_feature import VisitorStatisticsTimeoutFeature


_FEATURES = {
    "base": lambda: VisitorStatisticsBaseFeature(),
    "ratelimit": lambda: VisitorStatisticsRatelimitFeature(),
    "retry": lambda: VisitorStatisticsRetryFeature(),
    "test": lambda: VisitorStatisticsTestFeature(),
    "timeout": lambda: VisitorStatisticsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
