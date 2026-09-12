import assert from 'assert';
import reduceDeep from 'reduce-deep';

describe('exports .mjs', () => {
  it('default', () => {
    assert.equal(typeof reduceDeep, 'function');
  });
});
