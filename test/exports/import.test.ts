import assert from 'assert';
import reduceDeep from 'reduce-deep';

describe('exports .ts', () => {
  it('default', () => {
    assert.equal(typeof reduceDeep, 'function');
  });
});
