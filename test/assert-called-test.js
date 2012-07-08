var assert = require('assert'),
    cb = require('../');

cb(function notCalled() {});
process.nextTick(cb(function called() {}));

process.on('uncaughtException', function (ex) {
  assert(ex instanceof assert.AssertionError);
  assert.equal(ex.message, '1 callback not called:\n  notCalled');
  process.exit(0);
});

process.on('exit', function () {
  process.exit(1);
});
