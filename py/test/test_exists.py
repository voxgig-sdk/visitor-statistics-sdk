# ProjectName SDK exists test

import pytest
from visitorstatistics_sdk import VisitorStatisticsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = VisitorStatisticsSDK.test(None, None)
        assert testsdk is not None
