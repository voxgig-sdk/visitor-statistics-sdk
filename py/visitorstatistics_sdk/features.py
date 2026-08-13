# VisitorStatistics SDK feature factory

from visitorstatistics_sdk.feature.base_feature import VisitorStatisticsBaseFeature
from visitorstatistics_sdk.feature.test_feature import VisitorStatisticsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: VisitorStatisticsBaseFeature(),
        "test": lambda: VisitorStatisticsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
