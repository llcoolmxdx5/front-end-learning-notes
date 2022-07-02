const deepClone = (obj, map = new Map()) => {
  if (obj === null) return null;
  let clone = { ...obj };
  // 解决循环引用
  if (map.get(obj)) {
    return map.get(obj);
  }
  map.set(obj, clone);
  Object.keys(clone).forEach(key => {
    if (typeof obj[key] === 'object') {
      clone[key] = deepClone(obj[key], map);
    } else {
      clone[key] = obj[key];
    }
  });
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone([a]); // a !== b, a.obj !== b.obj

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
};
target.target = target;

target.target = target;

console.log(deepClone(target));
