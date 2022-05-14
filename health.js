const checks = require('./checks')

Object.keys(checks).forEach(id => {
    checks[id]();
});