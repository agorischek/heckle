# 🤬 Heckle

> _v. To persistently pester a performer_

Heckle is simple service check framework that lets you verify the health of your running application using assertions — Sort of like unit tests, but in production.

## Checks

Heckle is based on checks, which are functions that work similar to unit tests: If they throw an error, something's wrong; if they don't, everything's ok.

If the `main()` method in this application throws an error, the check will fail:

```js
const { check } = require('@heckle/health');

module.exports = check('Main function runs', () => {
    main();
})
```

However, you'll probably want to verify more than just that your application didn't throw. For this, you can add throws in your check as well:

```js
const { check } = require('@heckle/health');

module.exports = check('Main function runs', () => {
    const result = main();
    if (!result.success) throw `Main function fails: ${result.message}`;
})
```

You can also use any assertion library you like — including the same one you use for unit testing. (Note: If you do use an assertion library in your checks, be sure it's a production `dependency`, not a `devDependency`!) Heckle will catch these errors and report them as failures.

```js
const { check } = require('@heckle/health');
const { expect } = require('chai');

module.exports = check('Main function runs', () => {
    const result = main();
    expect(result.body).toBeString();
})
```

Your checks can do whatever you like, but a key recommended pattern is to invoke the service's own production HTTP endpoints — the same things real callers will use. Heckle provides a utility function `call` for this purpose.

```js
const { call } = require('@heckle/health');

const reply = await call('results/1234')
```

You pass `call` the relative path of the endpoint, and optionally an HTTP verb (default is `GET`) and a payload.

Before inspecting the body of the response, you'll likely want to make sure the request succeeded. To avoid verbose and repetitive status code assertions in every check, Heckle provides the `ensure()` utility function. If the result of `call()` doesn't match the expect status code class, `ensure()` will throw. You can optionally pass in a custom message that will be displayed if the assertion fails.

```js
const { call, ensure } = require('@heckle/health');

const reply = await call('results/1234')
ensure(reply).successful('Result 1234 was not returned.')
```

So, altogether, a simple check might look like this:

```js
const { call, check, ensure } = require('@heckle/health');
const { expect } = require('chai');

module.exports = check('Difference calculates correctly', async () => {
  const reply = await call(`difference?a=1&b=2`);
  ensure(reply).successful(`Difference returns ${reply.status} (1 - 2)`);
  expect(reply.data).to.equal(-1, 'Difference calculates incorrectly (1 - 2)');
});

```

## Health Endpoint

Unlike unit tests, which are executed directly in your development environment, Heckle checks are exposed via an HTTP endpoint. This endpoint can be called wherever your application is running, including locally on a development machine, on a build server, in a test environment, or in production. This endpoint typically has the word "health" in it, such as:

```sh
https://my-cool-service.example.org/_health
```

Checks are defined via the `checks.config.js` file:

```js
const { check } = require('@heckle/health');
const main = require('./main.js');

module.exports = {
  checks: { 
    main: check('Main method works', () => {
      main();
    })
  },
}
```

Although you can define checks directly in the config file, you're encouraged to store your checks next to the application code they cover (e.g. `main.checks.js` as a peer of `main.js`), and import them into the config file instead:

```js
const main = require('./main.checks.js');

module.exports = {
  checks: { main },
}
```

Because any code running in production is potentially dangerous, Heckle _does not_ autodiscover checks the way that unit testing frameworks typically discover tests. Rather, once a check is ready to use, you must explicitly configure it in `checks.config.js`.

The `checks.config.js` file is also the place to define the root URL and any necessary parameters (e.g. authentication keys) for the `call()` function. You can hardcode these as values (but don't hardcode secrets!), or you can pull them from environment variables, separate files, etc.

```js
const main = require('./main.checks.js');

module.exports = {
  root: process.env.SELF_URL,
  params: {
    code: process.env.SELF_KEY,
  },
  checks: { main },
};
```

To be able to call your health endpoint, you'll need to expose an HTTP route. How you do this will depend on the server technology you're using, but it might look something like:

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

To manually check the health of your service — whether running locally, in a test environment, in production, etc. — use the Heckle CLI. Define your targets in a `heckle.config.js` file:

```js
module.exports = {
  targets: {
    prod:  'https://my-cool-service.example.org/_health',
    local: 'http://localhost:7071/_health',
  },
};
```

Then add a script in your `package.json`:

```jsonc
  "scripts": {
    // ...
    "health": "heckle"
  },
```

Once your targets and script are defined, just call the script with the target name.

```js
npm run health prod
```

You'll get a print-out of all the checks run and whether they're healthy.

```sh
Health Check: https://my-cool-service.example.org/_health

1 out of 4 checks failed

[ HEALTHY ] 
✔ Product calculates correctly (product)
✔ Quotient calculates correctly (quotient)
✔ Sum calculates correctly (sum)

[ UNHEALTHY ]
× Difference calculates incorrectly (1 - 2): expected 3 to equal -1 (difference)
```

### Monitor Services

In addition to manually checking service health via CLI, you may also want to automate your health checks and write the results to a telemetry or monitoring service. For this purpose, Heckle provides monitor adapters.

Monitoring targets are defined in a `monitor.config.js` file:

```js
module.exports = {
  location: "Seattle, WA",
  targets: {
    basicMathService: {
      name: "Basic Math Service",
      telemetryKey: process.env.TELEMETRY_KEY,
      endpoint: "https://basic-math-service.azurewebsites.net/_health/",
      params: {
        code: process.env.SERVICE_KEY,
      },
    },
  },
};
```
Unlike the `heckle.config.js` CLI config, which should have one target per environment that a service can run in, the `monitor.config.js` file should have one target per service that can run in the same environment.

If you're logging to App Insights, Heckle provides an adapter for that:

```js
const monitor = require("@heckle/monitors").appInsights;

module.exports = async function (context) {
  await monitor(context);
};
```

## Components

`@heckle/health` is the main Heckle component, which packages up functionality from:

* [`@heckle/cli`](https://www.npmjs.com/package/@heckle/cli) — The command-line interface:
* [`@heckle/core`](https://www.npmjs.com/package/@heckle/core) — The core logic
* [`@heckle/hosts`](https://www.npmjs.com/package/@heckle/hosts) — The service host adapters 
* [`@heckle/monitors`](https://www.npmjs.com/package/@heckle/hosts) — The monitoring telemetry adapters 

You can import the `health` package to get everything, or you can choose individual packages for specific contexts.

## Additional Patterns

Your checks can be as simple or complex as you like — Below are a few other techniques to consider.

You can intentionally submit invalid parameters and verify that you recieve an error response code:

```js
const { call, check, ensure } = require('@heckle/health');

module.exports = check('Difference rejects missing parameter', async () => {
  const reply = await call(`difference?a=1`);
  ensure(reply).clientError(`Difference returns ${reply.status} with missing parameter`);
});

```

If you want to use an assertion library, but also want to fully control your errors, you can use `try`/`catch`:

```js
const { call, check } = require('@heckle/health');
const { expect } = require('chai');

module.exports = check('Difference calculates correctly', async () => {
  const reply = await call(`difference?a=1&b=2`);
  try{
    expect(reply.data).to.equal(-1);
  } catch (e) {
    throw new Error(`My error message: ${e.message}`)
  }
});

```

## Q&A

### Do health checks replace my unit tests?

Definitely not! Health checks require booting your application. Unit tests should run directly against your source or your build output. Both unit tests and service health checks are valuable and complementary quality assurance strategies.

### Do health checks replace monitoring user traffic?

Nope! Users will always find ways to interact with your service that you didn't expect. Health checks can provide an early warning signal, but they don't replace monitoring real usage.

### Isn't running tests in production dangerous?

Maybe... Depends on what they do! Checks are completely in your control, and it's your responsibility to make sure they're safe. For example, you should be careful not to add undue traffic load or corrupt production data.

