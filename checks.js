const expect = require('chai').expect
const { check, call } = require('./heckle.js')

module.exports = {
    read_data: check("Database read availability", () => {
        const reply = call("results/1234")
        // problems({
        //     "DB_UNAUTHORIZED": expect(reply.status).not.to.equal(401),
        //     "INVALID_SCHEMA": expect(reply.id).to.equal(12345)
        // })
    }),
    write_data: check("Database write availability", () => {
        const payload = { id: 1234 }
        // const reply = call("results").with(payload).using("post")
        const reply = call("results)")
        // expect(reply.id).to.equal(12345, "INCORRECT_ID")
        // if (reply.status === 503) throw "DATABASE_UNAVAILABLE"
        expect(reply.status).not.to.equal(503, "DATABASE_UNAVAILABLE")
        // if (reply.status === 503) throw new Error("DATABASE_UNAVAILABLE")
    })
}
