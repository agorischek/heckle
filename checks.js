const expect = require('chai').expect
const { check, prod } = require('./heckle.js')

module.exports = {
    read_data: check("Database read availability", () => {
        const reply = call("results/1234")
        expect(reply.id).to.equal(12345, "Incorrect document ID was returned")
    }),
    write_data: check("Database write availability", () => {
        const payload = { id: 1234 }
        const reply = call("results").with(payload).using("post")
        expect(reply.id).to.equal(1234, "Incorrect document ID was returned")
    })
}
