const { run } = require("./heckle-azure-functions-host")

module.exports = async function (context, req) {
    return await run(context)
}