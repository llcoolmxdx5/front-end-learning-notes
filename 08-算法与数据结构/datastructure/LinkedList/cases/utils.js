function defaultEquals(a, b) {
  if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
    return false;
  }
  if (isNaN(a) && isNaN(b)) {
    return true;
  }
  return JSON.stringify(a) === JSON.stringify(b);
}

module.exports = {
  defaultEquals,
};

// console.log(defaultEquals("", ""));
// console.log(defaultEquals(true, false));
// console.log(defaultEquals({}, {}));
