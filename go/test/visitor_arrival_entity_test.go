package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/visitor-statistics-sdk/go"
	"github.com/voxgig-sdk/visitor-statistics-sdk/go/core"

	vs "github.com/voxgig-sdk/visitor-statistics-sdk/go/utility/struct"
)

func TestVisitorArrivalEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.VisitorArrival(nil)
		if ent == nil {
			t.Fatal("expected non-nil VisitorArrivalEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := visitor_arrivalBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "visitor_arrival." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set VISITORSTATISTICS_TEST_VISITOR_ARRIVAL_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		visitorArrivalRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.visitor_arrival", setup.data)))
		var visitorArrivalRef01Data map[string]any
		if len(visitorArrivalRef01DataRaw) > 0 {
			visitorArrivalRef01Data = core.ToMapAny(visitorArrivalRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = visitorArrivalRef01Data

		// LIST
		visitorArrivalRef01Ent := client.VisitorArrival(nil)
		visitorArrivalRef01Match := map[string]any{}

		visitorArrivalRef01ListResult, err := visitorArrivalRef01Ent.List(visitorArrivalRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, visitorArrivalRef01ListOk := visitorArrivalRef01ListResult.([]any)
		if !visitorArrivalRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", visitorArrivalRef01ListResult)
		}

	})
}

func visitor_arrivalBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "visitor_arrival", "VisitorArrivalTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read visitor_arrival test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse visitor_arrival test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"visitor_arrival01", "visitor_arrival02", "visitor_arrival03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("VISITORSTATISTICS_TEST_VISITOR_ARRIVAL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"VISITORSTATISTICS_TEST_VISITOR_ARRIVAL_ENTID": idmap,
		"VISITORSTATISTICS_TEST_LIVE":      "FALSE",
		"VISITORSTATISTICS_TEST_EXPLAIN":   "FALSE",
		"VISITORSTATISTICS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["VISITORSTATISTICS_TEST_VISITOR_ARRIVAL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["VISITORSTATISTICS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["VISITORSTATISTICS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewVisitorStatisticsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["VISITORSTATISTICS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["VISITORSTATISTICS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
