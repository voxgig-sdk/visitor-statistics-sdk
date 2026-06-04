# VisitorStatistics SDK

Hong Kong visitor arrival counts broken down by country/region of residence

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Visitor Statistics API

This SDK wraps a public statistics feed from the [Hong Kong Census and Statistics Department](https://www.censtatd.gov.hk/) (C&SD), surfaced via [data.gov.hk](https://data.gov.hk/). It exposes Table `650-80001` — visitor arrivals to Hong Kong broken down by the visitor's country or region of residence.

What you can pull from the API:
- Visitor arrival counts to Hong Kong, time-series
- Breakdowns by country / region of residence
- Available in JSON, CSV, XML, SDMX, and XLSX representations
- Language toggle (e.g. `lang=en`) and `full_series=1` for the entire history

The underlying endpoint is hosted by C&SD at `https://www.censtatd.gov.hk/api/get.php`, parameterised by the table `id`. CORS is not enabled, so browser-side calls typically need a proxy; server-side calls work without authentication.

## Try it

**TypeScript**
```bash
npm install visitor-statistics
```

**Python**
```bash
pip install visitor-statistics-sdk
```

**PHP**
```bash
composer require voxgig/visitor-statistics-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/visitor-statistics-sdk/go
```

**Ruby**
```bash
gem install visitor-statistics-sdk
```

**Lua**
```bash
luarocks install visitor-statistics-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { VisitorStatisticsSDK } from 'visitor-statistics'

const client = new VisitorStatisticsSDK({})

// List all visitorarrivals
const visitorarrivals = await client.VisitorArrival().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o visitor-statistics-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "visitor-statistics": {
      "command": "/abs/path/to/visitor-statistics-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **VisitorArrival** | Time-series records of visitor arrivals to Hong Kong by country/region of residence, sourced from C&SD table `650-80001` (e.g. `GET /get.php?id=650-80001&lang=en&full_series=1`). | `/visitor-arrivals` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from visitorstatistics_sdk import VisitorStatisticsSDK

client = VisitorStatisticsSDK({})

# List all visitorarrivals
visitorarrivals, err = client.VisitorArrival(None).list(None, None)
```

### PHP

```php
<?php
require_once 'visitorstatistics_sdk.php';

$client = new VisitorStatisticsSDK([]);

// List all visitorarrivals
[$visitorarrivals, $err] = $client->VisitorArrival(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/visitor-statistics-sdk/go"

client := sdk.NewVisitorStatisticsSDK(map[string]any{})

// List all visitorarrivals
visitorarrivals, err := client.VisitorArrival(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "VisitorStatistics_sdk"

client = VisitorStatisticsSDK.new({})

# List all visitorarrivals
visitorarrivals, err = client.VisitorArrival(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("visitor-statistics_sdk")

local client = sdk.new({})

-- List all visitorarrivals
local visitorarrivals, err = client:VisitorArrival(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = VisitorStatisticsSDK.test()
const result = await client.VisitorArrival().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = VisitorStatisticsSDK.test(None, None)
result, err = client.VisitorArrival(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = VisitorStatisticsSDK::test(null, null);
[$result, $err] = $client->VisitorArrival(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.VisitorArrival(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = VisitorStatisticsSDK.test(nil, nil)
result, err = client.VisitorArrival(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:VisitorArrival(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Visitor Statistics API

- Upstream: [https://data.gov.hk/](https://data.gov.hk/)
- API docs: [https://www.censtatd.gov.hk/en/web_table.html?id=650-80001](https://www.censtatd.gov.hk/en/web_table.html?id=650-80001)

- Published under the Hong Kong Open Data Licence via data.gov.hk.
- Source: Census and Statistics Department (C&SD) of the HKSAR Government.
- Attribution to the originating department is expected when republishing.
- Confirm terms on the dataset page before redistribution.

---

Generated from the Visitor Statistics API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
