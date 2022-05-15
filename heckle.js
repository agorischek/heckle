function call(route, verb, payload) {
    return {
        id: 1234,
        content: "hi!",
        status: 503
    }
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
            if (reply.status !== 200) throw "Not 200"
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

function check(message, fn) {
    return () => {
        try {
            fn()
            console.log(`✅ Healthy: ${message}`)
        }
        catch (error) {
            const errorMessage = typeof (error) === "string" ? error : error.message
            console.log(`⛔️ Unhealthy: ${message} — ${errorMessage}`)
        }
    }

}



module.exports = {
    call, check, ensure, HealthError, verify
}
