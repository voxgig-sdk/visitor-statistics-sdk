
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { VisitorStatisticsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = VisitorStatisticsSDK.test()
    equal(testsdk instanceof VisitorStatisticsSDK, true,
      'VisitorStatisticsSDK.test() must return a client synchronously')
  })

})
