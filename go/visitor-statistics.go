package voxgigvisitorstatisticssdk

import (
	"github.com/voxgig-sdk/visitor-statistics-sdk/core"
	"github.com/voxgig-sdk/visitor-statistics-sdk/entity"
	"github.com/voxgig-sdk/visitor-statistics-sdk/feature"
	_ "github.com/voxgig-sdk/visitor-statistics-sdk/utility"
)

// Type aliases preserve external API.
type VisitorStatisticsSDK = core.VisitorStatisticsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type VisitorStatisticsEntity = core.VisitorStatisticsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type VisitorStatisticsError = core.VisitorStatisticsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewVisitorArrivalEntityFunc = func(client *core.VisitorStatisticsSDK, entopts map[string]any) core.VisitorStatisticsEntity {
		return entity.NewVisitorArrivalEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewVisitorStatisticsSDK = core.NewVisitorStatisticsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
