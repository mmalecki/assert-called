var assert = require('assert');

var assertCalled = module.exports = function (cb) {
  var index = assertCalled.wanted.push({ callback: cb, error: new Error() });
  return function () {
    wanted[index - 1] = null;
    cb.apply(this, arguments);
  };
};

var wanted = assertCalled.wanted = [];

process.on('exit', function () {
  var msg;

  wanted = wanted.filter(Boolean);

  if (wanted.length) {
    msg = wanted.length + ' callback' + (wanted.length > 1 ? 's' : '') + ' not called:';
    wanted.forEach(function (func) {
      var stack;

      msg += '\n  ' + (func.callback.name ? func.callback.name : '<anonymous>') + '\n';

      stack = func.error.stack.split('\n');
      stack.splice(0, 2);
      msg += stack.join('\n') + '\n';
    });
    throw new assert.AssertionError({
      message: msg,
      actual: wanted.length,
      expected: 0
    });
  }
});
