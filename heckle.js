function call(route, verb, payload) {
    return {
        id: 1234,
        content: "hi!",
        status: 503
    }
}

function check(message, fn) {
    return () => {
        try {
            fn()
            console.log(`✅ Healthy: ${message}`)
        }
        catch (error) {
            // console.log(error)
            const errorMessage = typeof (error) === "string" ? error : error.message
            console.log(`⛔️ Unhealthy: ${message} — ${errorMessage}`)
        }
    }

}

module.exports = {
    call, check
}
