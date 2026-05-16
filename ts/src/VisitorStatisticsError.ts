
import { Context } from './Context'


class VisitorStatisticsError extends Error {

  isVisitorStatisticsError = true

  sdk = 'VisitorStatistics'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  VisitorStatisticsError
}

