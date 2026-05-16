package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewVisitorArrivalEntityFunc func(client *VisitorStatisticsSDK, entopts map[string]any) VisitorStatisticsEntity

