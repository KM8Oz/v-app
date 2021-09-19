const base = require('./eslint-rules/base');
const react = require('./eslint-rules/react');
const ts = require('./eslint-rules/ts');

module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript'
  ],
  env: {
        //
    browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    //
    // myGlobal: false
  },
  rules: { ...base, ...react, ...ts }
};