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

/Users/maciej/dev/js/assert-called/lib/assert-called.js:20
    throw new assert.AssertionError({
          ^
AssertionError: 1 callback not called:
  notCalled
```

## How it works
`assert-called` attaches a `process.on('exit')` listener to make sure that
all registered callbacks are eventually called.
