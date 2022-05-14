# Heckle

Service health check framework

## Checks

Heckle provides a 

```js
export const checks = {
    database: function()=>{

    }
}
```

Your checks file defines a set of named checks. These checks can do whatever you like, but the recommended use is to invoke the service's own production HTTP endpoints. Heckle provides a utility function `call` for this purpose. You pass it the relative path of the endpoint, and optionally an HTTP verb (default is `GET`), as well as optionally a payload.

```js
const reply = await call("results/1234")
expect(reply.id).to.be(1234)
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