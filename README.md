# 🤬 Heckle

> _v. To persistently pester a performer_

Heckle is simple service check framework that lets you verify the health of your running application using assertions - Sort of like unit tests, but in production.

## Checks

Checks are the core of Heckle:

```js
export default check("Main function runs", ()=>{
    const result = main();
})
```

Heckle checks work similar to unit tests: If they throw an error, something's wrong; if they don't, everything's ok. So, if your application throws an error, the check will fail.

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
