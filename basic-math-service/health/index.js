async function run(checks) {
  const results = {}

  const errors = []

  const checkIds = Object.keys(checks)

  for await (const checkId of checkIds) {
    const result = await checks[checkId]();
    results[checkId] = result
    if (result.error) errors.push(result.error)
  }

  return results
}

function summarizeErrors(results) {
  const errors = []
  Object.values(results).forEach(result => {
    if (result.error && errors.indexOf(result.error) < 0) {
      errors.push(result.error)
    }
  })
  return errors
}

module.exports = async function (context, req) {

  const config = require('../checks')

  const checks = config.checks

  const check = context.bindingData.check

  const results = await run(checks)

  const errors = summarizeErrors(results)

  const healthy = errors?.length === 0

  const status = healthy ? 200 : 500

  const result = {
    status: status,
    body: {
      check: check,
      healthy: healthy,
      errors: healthy ? undefined : errors,
      checks: results,
      // checks: {
      //   sum: null,
      //   difference: null,
      //   product: null,
      //   quotient: null
      // }
    }

  }

  context.res = result
}
