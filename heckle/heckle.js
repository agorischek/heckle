const axios = require("axios")

async function call(route, verb, payload) {
  const response = await axios.get(route)
  // console.log(response)
  return response
  // return {
  //   id: 1234,
  //   content: "hi!",
  //   body: 3,
  //   status: 200
  // }
}

class HealthError extends Error {
  constructor(message, code) {
    super(message)
    this.name = "HealthError"
    this.code = code
  }
}

function ensure(reply) {
  return {
    informational: function () {
      if (reply.status !== 100) throw "Not 100"
    },
    successful: function () {
      if (reply.status !== 200) throw "NOT_SUCCESSFUL_RESPONSE"
    }
  }
}

// Informational responses (100–199)
// Successful responses (200–299)
// Redirection messages (300–399)
// Client error responses (400–499)
// Server error responses (500–599)

function verify(condition, err) {
  if (!condition) {
    throw err
  }
}

function check(description, fn) {
  return async () => {
    try {
      await fn()
      // console.log(`✅ Healthy: ${description}`)
      return {
        healthy: true,
        description: description,
      }
    }
    catch (error) {
      const errorMessage = typeof (error) === "string" ? error : error.message
      // console.log(`⛔️ Unhealthy: ${description} — ${errorMessage}`)
      return {
        healthy: false,
        description: description,
        error: errorMessage
      }
    }
  }

}



module.exports = {
  call, check, ensure, HealthError, verify
}
