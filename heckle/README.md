# 🤬 Heckle

> _v. To persistently pester a performer_

Heckle is simple service check framework that lets you verify the health of your running application with assertions - Sort of like unit tests, but in production.

## Checks

The heart of Heckle is checks. 

```js
export default check("Main function runs", ()=>{
    const result = main();
})
```

Heckle checks work similar to unit tests: If they throw an error, something's wrong; if they don't, everything's ok. So, if your application throw an error, the check will fail.

However, you'll probably want to verify more than just that your application didn't throw. For this, you can add throws in your check as well:

```js
export default check("Main function runs", ()=>{
    const result = main();
    if (!result.success) throw `Main function fails: ${result.message}`;
})
```

Beyond directly throwing, you can also use any assertion library you like, including the same one you use for unit testing:

```js
export default check("Main function runs", ()=>{
    const result = main();
    expect(result.body).toBeString();
})
```

Heckle will catch these errors and report them as failures.

Your checks can do whatever you like, but the main recommended use is to invoke the service's own production HTTP endpoints --- the same things real callers will use. Heckle provides a utility function `call` for this purpose.

```js
const reply = await call("results/1234")
```

 You pass `call`` the relative path of the endpoint, and optionally an HTTP verb (default is `GET`), as well as optionally a payload.

To avoid verbose and repetitive status code assertions in every check, Heckle provides the `ensure()` utility function. If the result of `call()` doesn't match the expect status code or class, `ensure()` will throw.

```js
const reply = await call("results/1234")
ensure(reply).successful()
```

You can also verify that invalid inputs result in expected failures:

```js
const reply = await call("results/invalid-result-id!")
ensure(reply).clientError()
```

# Health Endpoint

Unlike unit tests, which are executed directly in your development environment, Heckle checks are exposed via an HTTP endpoint. This endpoint can be called wherever your application is running, including locally on a development machine, on a build server, in a test environment, or in production. This endpoint typically has the word "health" in it, such as

```
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

```js
export const checks = {
    database: function()=>{

    }
}
```

Checks can be nested, and the nesting will be reflected in the URL structure:

```js
checks: {
    fetch: {
        product: check("Database product read availability", () => {
            const reply = call("results/products/1234")
            expect(reply.id).to.eq(1234, "Wrong product ID returned")
        }),
        seller: check("Database seller read availability", () => {
            const reply = call("results/seller/456")
            expect(reply.id).to.eq(456, "Wrong seller ID returned")
        })
    }
}
```




```js
const reply = await call("results/1234");
ensure(reply).successful();
```

Heckle checks work similar to unit tests: If they throw an error, something's wrong; if they don't, everything's ok. That means, in the simplest case, you can throw any error you like:

```js
if (reply.status === 503) throw "DATABASE_UNAVAILABLE"
```

However, it also means you can use any assertion library you like, including the same one you use for unit testing:

```js
expect(reply.status).not.to.equal(503, "DATABASE_UNAVAILABLE")
```
Heckle will catch these errors and report them as failures.

Heckle can be run locally via CLI. Just pass it either a relative path to your config file, or the URL of a health endpoint.

```sh
heckle ./checks.js --check product
```

A specific check to run can be passed via optional parameter.

```sh
heckle http://localhost/_health --check product
```



# Components

Heckle consists of a few components:

## Checks SDK

The Checks SDK lets you author production health checks inside your service's application code

## Monitor SDK

The Monitor SDK runs on a standalone service and knows how to invoke and navigate checks exposed by other services

## Host SDKs

Host SDKs provide adapters specific to different app service hosts, such as Azure Funcitons

## CLI

The CLI lets you check the health of your services, both while running locally during development, and in production.
