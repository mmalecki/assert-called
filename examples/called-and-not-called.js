var cb = require('../');

function notCalling(cb) {
}

function notCalled() {
}

process.nextTick(cb(function () {
  console.log('called');
}));

notCalling(cb(notCalled));
