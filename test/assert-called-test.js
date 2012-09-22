var assert = require('assert'),
    cb = require('../');

cb(function notCalled() {});
process.nextTick(cb(function called() {}));

process.on('uncaughtException', function (ex) {
  assert(ex instanceof assert.AssertionError);
  assert.equal(ex.message.indexOf('1 callback not called:\n  notCalled'), 0);
  assert.notEqual(ex.message.indexOf('assert-called-test.js:4:1'), -1);
  process.exit(0);
});

process.on('exit', function () {
  process.exit(1);
});
