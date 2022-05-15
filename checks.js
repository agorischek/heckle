const expect = require('chai').expect
const { check, call, ensure, verify, HealthError } = require('./heckle.js')

module.exports = {
    root: process.env.root,
    checks: {
        read_data: check("Database read availability", () => {
            const reply = call("results/1234");
            ensure(reply).successful();
            // validate(reply).status(200)
            // validate(reply).status("success")
            // expect(reply.status).not.to.be.oneOf([500, 501, 503], "Server returned error status")
            // expect(reply.id).to.eq(12345, "Wrong ID returned")
        }, "DB_ERROR"),
        // write: check("Database write availability", () => {
        //     const payload = { id: 1234 }
        //     const reply = call("results", "POST", payload)
        //     verify(reply.id === "cool", new HealthError("Bad content", "BAD_CONTENT"))

        // })
    }
}

// write_data: check("Database write availability", () => {
//     const payload = { id: 1234 }
//     const reply = call("results", "POST", payload)
//     verify(reply.status !== 404, "Resource not found")
//     verify(reply.id === "cool", new HealthError("Bad content", "BAD_CONTENT"))

// })


// write_data: check("Database write availability", () => {
//     const payload = { id: 1234 }
//     // const reply = call("results").with(payload).using("post")
//     const reply = call("results")
//     verify(reply.status !== 503, new Error("Something bad happened"))
//     // expect(reply.id).to.equal(12345, "INCORRECT_ID")
//     // if (reply.status === 503) throw "DATABASE_UNAVAILABLE"
//     // expect(reply.status).not.to.equal(503, "DATABASE_UNAVAILABLE")
//     // if (reply.status === 503) throw new Error("DATABASE_UNAVAILABLE")
// })
