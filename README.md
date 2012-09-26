# assert-called [![Build Status](https://secure.travis-ci.org/mmalecki/assert-called.png)](http://travis-ci.org/mmalecki/assert-called)
Assert that your callback got called.

## Installation

    npm install assert-called

## Usage
```js
var cb = require('assert-called');

function notCalling(cb) {
}

function notCalled() {
}

process.nextTick(cb(function () {
  console.log('called');
}));

notCalling(cb(notCalled));
```

Will output:

```
called

/Users/maciej/dev/js/assert-called/lib/assert-called.js:26
    throw new assert.AssertionError({
          ^
AssertionError: 1 callback not called:
  notCalled
    at Object.<anonymous> (/Users/maciej/dev/js/assert-called/examples/called-and-not-called.js:13:12)
    at Module._compile (module.js:454:26)
    at Object.Module._extensions..js (module.js:472:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Module.runMain (module.js:497:10)
    at process.startup.processNextTick.process._tickCallback (node.js:325:13)
```

## How it works
`assert-called` attaches a `process.on('exit')` listener to make sure that
all registered callbacks are eventually called.
