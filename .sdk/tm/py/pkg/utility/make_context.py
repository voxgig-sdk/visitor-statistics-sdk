# VisitorStatistics SDK utility: make_context

from projectname_sdk.core.context import VisitorStatisticsContext


def make_context_util(ctxmap, basectx):
    return VisitorStatisticsContext(ctxmap, basectx)
