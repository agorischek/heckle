# 🤬 Heckle

> _v. To persistently pester a performer_

Heckle is simple service check framework that lets you verify the health of your running application using assertions — Sort of like unit tests, but in production.

## Checks

Heckle is based on checks, which are functions that work similar to unit tests: If they throw an error, something's wrong; if they don't, everything's ok.

If the `main` method in this application throws an error, the check will fail:

```js
export default check("Main function runs", ()=>{
    const result = main();
})
```

However, you'll probably want to verify more than just that your application didn't throw. For this, you can add throws in your check as well:

```js
export default check("Main function runs", ()=>{
    const result = main();
    if (!result.success) throw `Main function fails: ${result.message}`;
})
```

You can also use any assertion library you like — including the same one you use for unit testing. Heckle will catch these errors and report them as failures.

```js
export default check("Main function runs", ()=>{
    const result = main();
    expect(result.body).toBeString();
})
```

Your checks can do whatever you like, but the main recommended use is to invoke the service's own production HTTP endpoints — the same things real callers will use. Heckle provides a utility function `call` for this purpose.

```js
const reply = await call("results/1234")
```

You pass `call` the relative path of the endpoint, and optionally an HTTP verb (default is `GET`) and a payload.

To avoid verbose and repetitive status code assertions in every check, Heckle provides the `ensure()` utility function. If the result of `call()` doesn't match the expect status code class, `ensure()` will throw.

```js
const reply = await call("results/1234")
ensure(reply).successful()
```

You can also verify that invalid inputs result in expected failures:

```js
const reply = await call("results/invalid-result-id!")
ensure(reply).clientError()
```

If you want to use an assertion library, but also want to directly control your errors, you can use `try`/`catch`:

```js
const reply = await call("results/2345")
try{
    expect(reply.data.id).toBe(2345)
} catch (e) {
    throw new Error(`My error message: ${e.message}`)
}
```

## Health Endpoint

Unlike unit tests, which are executed directly in your development environment, Heckle checks are exposed via an HTTP endpoint. This endpoint can be called wherever your application is running, including locally on a development machine, on a build server, in a test environment, or in production. This endpoint typically has the word "health" in it, such as:

```sh
https://my-cool-service.example.com/_health
```

Checks are defined via the `checks.config.js` file:

```js
module.exports = {
  checks: { difference, product, quotient, sum },
}
```

Although you can define checks directly in the config file, you're encouraged to store your checks directly next to the application code they cover (e.g. `my-method.checks.js`), and import them into the config file instead:

```js
import myMethod from '../my-method.checks'

module.exports = {
  checks: { myMethod },
}
```

Because any code running in production is potentially dangerous, Heckle _does not_ autodiscover checks that way that unit testing frameworks typically discover tests. Instead, once a check is ready to use, you must explicitly configure how it's exposed (via `checks.config.js`).

The `checks.config.js` file is also the place to define the root URL and any necessary parameters (e.g. authentication keys) for the `call()` function. You can hardcode these as keys, or you can pull them from environment variables, separate files, etc.

```js
module.exports = {
  root: process.env.SELF_URL,
  params: {
    code: process.env.SELF_KEY,
  },
  checks: {
    difference,
    product,
    quotient,
    sum,
  },
};
```

To be able to call your health endpoint, you'll need to expose an HTTP route.

```js
// my-health-function.js
const { health } = require('@heckle/health')

async function myHealthFunction() {
  return await health();
};
```

If you're using Azure Functions, Heckle provides a host adapter:

```js
const run = require('@heckle/health').azureFunctions;

module.exports = async function (context) {
  context.res = await run(context);
};
```

Then, make sure to match anything under your endpoint in `function.json`:

```jsonc
// ...
    "route": "_health/{**subroute}"
// ...
```

## CLI

To manually check the health of your service — whether running locally, in a test environment, in production, etc. — use the Heckle CLI. Targets are defined in a `heckle.config.js` file:

```js
export default {
  targets: {
    prod:  'https://example.org/_health/',
    local: 'http://localhost:7071/_health',
  },
};
```

Once your targets are defined, just call `heckle` with the target name.

```js
heckle prod
```

You'll get a print-out of all the checks run and whether they're healthy.

```sh
Health Check: http://localhost:7071/_health

1 out of 4 checks failed

[ HEALTHY ] 
✔ Product calculates correctly (product)
✔ Quotient calculates correctly (quotient)
✔ Sum calculates correctly (sum)

[ UNHEALTHY ]
× Difference calculates incorrectly (1 - 2): expected 3 to equal -1 (difference)
```

## Components

`@heckle/health` is the main Heckle component, which packages up functionality from:

* [`@heckle/cli`](https://www.npmjs.com/package/@heckle/cli) — The command-line interface:
* [`@heckle/core`](https://www.npmjs.com/package/@heckle/core) — The core logic
* [`@heckle/hosts`](https://www.npmjs.com/package/@heckle/hosts) — The service host adapters 


## Q&A

### Do health checks replace my unit tests?

Definitely not! Health checks require booting your application. Unit tests should run directly against your source or your build output. Both are valuable and complementary quality assurance strategies.

### Do health checks replace monitoring user traffic?

Nope! Users will always find ways to interact with your service that you didn't expect. Health checks can provide an early warning signal, but they don't replace monitoring real usage.

### Isn't running tests in production dangerous?

Depends on what they do! Checks are completely in your control, and it's your responsibility to make sure they're safe. For example, you should be careful to ensure they don't add undue traffic load and don't corrupt production data.

