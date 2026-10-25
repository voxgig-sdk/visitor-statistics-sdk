

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { VisitorStatisticsSDK, BaseFeature, config, stdutil } from '../../..'

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


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('visitor_arrival hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of VisitorStatisticsSDK.test(offline).VisitorArrival().stream('list')) { }
    }, /offline/)

    for await (const _item of VisitorStatisticsSDK.test(offline).VisitorArrival()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = VisitorStatisticsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.VisitorArrival().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of VisitorStatisticsSDK.test().VisitorArrival().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new VisitorStatisticsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.VisitorArrival().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.VisitorArrival().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VisitorStatisticsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VisitorArrival().list({"end_date":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VISITOR_STATISTICS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'visitor_arrival.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"arrivals":{"a":true,"h":"Arrivals","n":"arrivals","r":true,"sh":"Number of visitor arrivals","t":"`$INTEGER`","key$":"arrivals","index$":0},"change_percentage":{"a":true,"fo":"float","h":"Change Percentage","n":"change_percentage","r":false,"sh":"Percentage change compared to previous period","t":"`$NUMBER`","key$":"change_percentage","index$":1},"region":{"a":true,"h":"Region","n":"region","r":true,"sh":"Nationality or region of residence","t":"`$STRING`","key$":"region","index$":2},"year_month":{"a":true,"h":"Year Month","n":"year_month","r":true,"sh":"Year and month of the record in YYYY-MM format","t":"`$STRING`","key$":"year_month","index$":3}},"name":"visitor_arrival","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /visitor-arrivals","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2023-12","k":"query","n":"end_date","or":"end_date","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"en","k":"query","n":"language","or":"language","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"Mainland China","k":"query","n":"region","or":"region","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"2023-01","k":"query","n":"start_date","or":"start_date","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/visitor-arrivals","q":{},"r":{},"rs":{"alternatives":[{"binary":true,"kind":"raw","media":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},{"binary":true,"kind":"raw","media":"text/csv"}],"kind":"json","media":"application/json"},"s":[{"lit":"visitor-arrivals"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"visitor_arrival","name__orig":"visitor_arrival","Name":"VisitorArrival","name_":"visitor_arrival","name-":"visitor-arrival","NAME":"VISITOR_ARRIVAL","index$":0}, {"active":true,"entity":"visitor_arrival","key$":"BasicVisitorArrivalFlow","kind":"basic","name":"BasicVisitorArrivalFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"visitor_arrival_ref01"}}],"index$":0}]}, 'VisitorArrival', {"GET /visitor-arrivals":{"protocol":"http","parameters":[{"name":"format","in":"query","description":"The desired response format for the data","required":false,"schema":{"type":"string","enum":["json","csv","xlsx"],"default":"json"},"index$":0},{"name":"language","in":"query","description":"The language for the response data","required":false,"schema":{"type":"string","enum":["en","zh-hant","zh-hans"],"default":"en"},"index$":1},{"name":"start_date","in":"query","description":"Start date for filtering data (YYYY-MM format)","required":false,"schema":{"type":"string","pattern":"^\\d{4}-\\d{2}$","example":"2023-01"},"index$":2},{"name":"end_date","in":"query","description":"End date for filtering data (YYYY-MM format)","required":false,"schema":{"type":"string","pattern":"^\\d{4}-\\d{2}$","example":"2023-12"},"index$":3},{"name":"region","in":"query","description":"Filter by specific nationality or region","required":false,"schema":{"type":"string","example":"Mainland China"},"index$":4}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
