const debounce = (func, wait = 100) => {
  let timerId;
  let start = Date.now();
  return function (...args) {
    const curr = Date.now();
    clearTimeout(timerId);
    if (curr - start >= wait) {
      // 可以保证func一定会被执行
      func.apply(this, args);
      start = curr;
    } else {
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
  };
};
