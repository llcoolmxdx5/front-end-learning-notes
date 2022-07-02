// `flattenObject`：以键的路径扁平化对象

const flattenObject = (entry: Record<string, any>, obj: Record<string, any> = {}, key?: string) => {
  Object.keys(entry).forEach(item => {
    let k1 = item;
    if (key !== undefined) {
      delete obj[key];
      k1 = `${key}.${item}`;
    }
    obj[k1] = entry[item];
    if (typeof entry[item] === 'object') {
      flattenObject(entry[item], obj, k1);
    }
  });
  return obj;
};

console.log(flattenObject({ a: { b: { c: 1 } }, d: 1 })); // { 'a.b.c': 1, d: 1 }

// `unFlattenObject`：以键的路径展开对象

const unFlattenObject = (entry: Record<string, any>) => {
  const obj: Record<string, any> = {};
  Object.keys(entry).forEach(item => {
    const keys = item.split('.');
    const { length } = keys;
    const key = keys[0];
    if (length === 1) {
      obj[key] = entry[item];
    } else {
      obj[key] = {
        ...obj[key],
        ...unFlattenObject({
          [keys.slice(1).join('.')]: entry[item],
        }),
      };
    }
  });
  return obj;
};

console.log(unFlattenObject({ 'a.b.c': 1, d: 1 })); // { a: { b: { c: 1 } }, d: 1 }
