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

Your checks file defines a set of named checks. These checks can do whatever you like, but the recommended use is for them to invoke production HTTP endpoints exposed by the service itself. Heckle provides a utility function `prod` for this purpose. You pass it the relative path of the endpoint, and optionally an HTTP verb (default is `GET`), as well as optionally a payload.

```js
const actual = await prod("results/1234")
expect(actual.id).to.be(1234)
```