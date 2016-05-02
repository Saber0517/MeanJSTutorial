'use strict';

// Protractor configuration
var config = {
  specs: ['modules/book-sheet/tests/e2e/*.js']
};

if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'firefox'
  };
}else {
  config.capabilities = {
    browserName: 'chrome'
  };
}

exports.config = config;
