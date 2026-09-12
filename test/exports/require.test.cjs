const assert = require('assert');
const reduceDeep = require('reduce-deep');

describe('exports .cjs', () => {
  it('default', () => {
    assert.equal(typeof reduceDeep, 'function');
  });
});
