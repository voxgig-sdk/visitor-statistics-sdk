

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { VisitorStatisticsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('VisitorArrivalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VISITOR_STATISTICS_TEST_LIVE=TRUE.
  afterEach(liveDelay('VISITOR_STATISTICS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VisitorStatisticsSDK.test()
    const ent = testsdk.VisitorArrival()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VISITOR_STATISTICS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'visitor_arrival.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"arrivals","req":true,"short":"Number of visitor arrivals","type":"`$INTEGER`","index$":0},{"active":true,"format":"float","name":"change_percentage","req":false,"short":"Percentage change compared to previous period","type":"`$NUMBER`","index$":1},{"active":true,"name":"region","req":true,"short":"Nationality or region of residence","type":"`$STRING`","index$":2},{"active":true,"name":"year_month","req":true,"short":"Year and month of the record in YYYY-MM format","type":"`$STRING`","index$":3}],"name":"visitor_arrival","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"2023-12","kind":"query","name":"end_date","orig":"end_date","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"en","kind":"query","name":"language","orig":"language","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":"Mainland China","kind":"query","name":"region","orig":"region","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"example":"2023-01","kind":"query","name":"start_date","orig":"start_date","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /visitor-arrivals","json":"{\"operationId\":\"getVisitorArrivals\",\"parameters\":[{\"description\":\"The desired response format for the data\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\",\"xlsx\"],\"type\":\"string\"}},{\"description\":\"The language for the response data\",\"in\":\"query\",\"name\":\"language\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"en\",\"zh-hant\",\"zh-hans\"],\"type\":\"string\"}},{\"description\":\"Start date for filtering data (YYYY-MM format)\",\"in\":\"query\",\"name\":\"start_date\",\"required\":false,\"schema\":{\"example\":\"2023-01\",\"pattern\":\"^\\\\d{4}-\\\\d{2}$\",\"type\":\"string\"}},{\"description\":\"End date for filtering data (YYYY-MM format)\",\"in\":\"query\",\"name\":\"end_date\",\"required\":false,\"schema\":{\"example\":\"2023-12\",\"pattern\":\"^\\\\d{4}-\\\\d{2}$\",\"type\":\"string\"}},{\"description\":\"Filter by specific nationality or region\",\"in\":\"query\",\"name\":\"region\",\"required\":false,\"schema\":{\"example\":\"Mainland China\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"success\":{\"summary\":\"Example visitor arrivals data\",\"value\":{\"data\":[{\"arrivals\":2500000,\"change_percentage\":15.2,\"region\":\"Mainland China\",\"year_month\":\"2023-12\"},{\"arrivals\":120000,\"change_percentage\":8.5,\"region\":\"Taiwan\",\"year_month\":\"2023-12\"}],\"metadata\":{\"data_provider\":\"Census and Statistics Department\",\"last_updated\":\"2024-01-15\",\"table\":\"650-80001\",\"title\":\"Visitor arrivals by nationality/region\",\"update_frequency\":\"Monthly\"},\"total_records\":2}}},\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"arrivals\":{\"description\":\"Number of visitor arrivals\",\"example\":2500000,\"type\":\"integer\"},\"change_percentage\":{\"description\":\"Percentage change compared to previous period\",\"example\":15.2,\"format\":\"float\",\"type\":\"number\"},\"region\":{\"description\":\"Nationality or region of residence\",\"example\":\"Mainland China\",\"type\":\"string\"},\"year_month\":{\"description\":\"Year and month of the record in YYYY-MM format\",\"example\":\"2023-12\",\"pattern\":\"^\\\\d{4}-\\\\d{2}$\",\"type\":\"string\"}},\"required\":[\"year_month\",\"region\",\"arrivals\"],\"type\":\"object\"},\"type\":\"array\"},\"metadata\":{\"properties\":{\"data_dictionary_url\":{\"description\":\"URL to the data dictionary\",\"example\":\"https://www.censtatd.gov.hk/datagovhk/WT_data_dict_en.pdf\",\"format\":\"uri\",\"type\":\"string\"},\"data_provider\":{\"description\":\"Organization providing the data\",\"example\":\"Census and Statistics Department\",\"type\":\"string\"},\"last_updated\":{\"description\":\"Date when the data was last updated\",\"example\":\"2024-01-15\",\"format\":\"date\",\"type\":\"string\"},\"table\":{\"description\":\"Table identifier\",\"example\":\"650-80001\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the dataset\",\"example\":\"Visitor arrivals by nationality/region\",\"type\":\"string\"},\"update_frequency\":{\"description\":\"Frequency of data updates\",\"example\":\"Monthly\",\"type\":\"string\"}},\"type\":\"object\"},\"total_records\":{\"description\":\"Total number of records returned\",\"example\":100,\"type\":\"integer\"}},\"type\":\"object\"}},\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}},\"text/csv\":{\"example\":\"year_month,region,arrivals,change_percentage\\n2023-12,Mainland China,2500000,15.2\\n2023-12,Taiwan,120000,8.5\",\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response with visitor arrival statistics\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":{\"code\":\"INVALID_PARAMETER\",\"message\":\"Invalid date format. Please use YYYY-MM format.\"}},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_PARAMETER\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Invalid date format. Please use YYYY-MM format.\",\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"error\":{\"code\":\"NOT_FOUND\",\"message\":\"No data available for the specified period.\"}},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_PARAMETER\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Invalid date format. Please use YYYY-MM format.\",\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Data not found\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"error\":{\"code\":\"INTERNAL_ERROR\",\"message\":\"An unexpected error occurred. Please try again later.\"}},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_PARAMETER\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Invalid date format. Please use YYYY-MM format.\",\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/visitor-arrivals","segments":[{"lit":"visitor-arrivals"}],"select":{"exist":["end_date","format","language","region","start_date"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"visitor_arrival","name__orig":"visitor_arrival","Name":"VisitorArrival","name_":"visitor_arrival","name-":"visitor-arrival","NAME":"VISITOR_ARRIVAL","index$":0}, {"active":true,"entity":"visitor_arrival","key$":"BasicVisitorArrivalFlow","kind":"basic","name":"BasicVisitorArrivalFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"visitor_arrival_ref01"}}],"index$":0}]}, 'VisitorArrival')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let visitor_arrival_ref01_data = Object.values(setup.data.existing.visitor_arrival)[0] as any

    // LIST
    const visitor_arrival_ref01_ent = client.VisitorArrival()
    const visitor_arrival_ref01_match: any = {}

    const visitor_arrival_ref01_list = (await visitor_arrival_ref01_ent.list(visitor_arrival_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/visitor_arrival/VisitorArrivalTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = VisitorStatisticsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['visitor_arrival01','visitor_arrival02','visitor_arrival03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VISITOR_STATISTICS_TEST_VISITOR_ARRIVAL_ENTID': idmap,
    'VISITOR_STATISTICS_TEST_LIVE': 'FALSE',
    'VISITOR_STATISTICS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VISITOR_STATISTICS_TEST_VISITOR_ARRIVAL_ENTID']

  const live = 'TRUE' === env.VISITOR_STATISTICS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VISITOR_STATISTICS_TEST_VISITOR_ARRIVAL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new VisitorStatisticsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.VISITOR_STATISTICS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
