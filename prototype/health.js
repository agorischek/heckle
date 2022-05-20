const config = require('./checks')

const checks = config.checks

Object.keys(checks).forEach(id => {
    checks[id]();
});