var assert = require('assert');

var assertCalled = module.exports = function (cb) {
  var index = assertCalled.wanted.push(cb);
  return function () {
    wanted.splice(index - 1, 1);
    cb.apply(this, arguments);
  };
};

var wanted = assertCalled.wanted = [];

process.on('exit', function () {
  var msg;
  if (wanted.length) {
    msg = wanted.length + ' callback' + (wanted.length > 1 ? 's' : '') + ' not called:';
    wanted.forEach(function (func) {
      msg += '\n  ' + (func.name ? func.name : '<anonymous>');
    });
    throw new assert.AssertionError({
      message: msg,
      actual: wanted.length,
      expected: 0
    });
  }
});
