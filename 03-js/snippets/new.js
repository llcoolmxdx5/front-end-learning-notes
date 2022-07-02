function New(Func, ...args) {
  const obj = {};
  obj.__proto__ = Func.prototype;
  const ret = Func.apply(obj, args);
  return typeof ret === 'object' ? ret : obj;
}
const objA = New(A, 1, 2);
// equals to
const newA = new A(1, 2);
// 更优的做法
function New(Func, ...args) {
  const obj = Object.create(Func.prototype);
  const res = Func.apply(obj, args);
  return typeof res === 'object' ? res : obj;
}
