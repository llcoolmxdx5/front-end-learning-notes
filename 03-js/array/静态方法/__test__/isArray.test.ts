import isArray from '../isArray'

describe('Array.isArray', function() {
  test('isArray true', function() {
    expect(isArray([])).toBe(true)
    expect(isArray([1])).toBe(true)
    expect(isArray(new Array())).toBe(true)
    expect(isArray(new Array('a', 'b', 'c', 'd')))
    // 鲜为人知的事实：其实 Array.prototype 也是一个数组。
    expect(isArray(Array.prototype)).toBe(true)
  });

  test('isArray false', function() {
    // @ts-ignore
    expect(isArray()).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray(17)).toBe(false);
    expect(isArray('Array')).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(false)).toBe(false);
    expect(isArray(new Uint8Array(32))).toBe(false)
    expect(isArray({ __proto__: Array.prototype })).toBe(false);
  });
});
