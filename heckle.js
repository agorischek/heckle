function prod(route, verb, payload) {
    return {
        id: 1234,
        content: "hi!"
    }
}

function check(message, fn) {
    return () => {
        try {
            fn()
            console.log(`✅ Healthy: ${message}`)
        }
        catch (error) {
            console.log(`⛔️ Unhealthy: ${message} — ${error.message}`)
        }
    }

}

module.exports = {
    prod, check
}
