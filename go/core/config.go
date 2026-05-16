package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "VisitorStatistics",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://data.gov.hk/api",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"visitor_arrival": map[string]any{},
			},
		},
		"entity": map[string]any{
			"visitor_arrival": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "arrival",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "change_percentage",
						"req": false,
						"type": "`$NUMBER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "region",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "year_month",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "visitor_arrival",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2023-12",
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "language",
											"orig": "language",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "Mainland China",
											"kind": "query",
											"name": "region",
											"orig": "region",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2023-01",
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/visitor-arrivals",
								"parts": []any{
									"visitor-arrivals",
								},
								"select": map[string]any{
									"exist": []any{
										"end_date",
										"format",
										"language",
										"region",
										"start_date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
