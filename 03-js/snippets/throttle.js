const simpleThrottle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(this, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

export function debounce(func, wait, options) {
  /**
   * maxWait 最长等待执行时间
   * lastCallTime 事件上次触发的时间，由于函数防抖，真正的事件处理程序并不一定会执行
   */
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime;

  let lastInvokeTime = 0; // 上一次函数真正调用的时间戳
  let leading = false; // 是否在等待时间的起始端触发函数调用
  let maxing = false; //
  let trailing = true; // 是否在等待时间的结束端触发函数调用

  // 如果没有传入wait参数，检测requestAnimationFrame方法是否可以，以便后面代替setTimeout,默认等待时间约16ms
  const useRAF =
    !wait && wait !== 0 && typeof requestAnimationFrame === "function";

  if (typeof func != "function") {
    // 必须传入函数
    throw new TypeError("Expected a function");
  }
  wait = +wait || 0; // wait参数转换成数字，或设置默认值0
  if (options) {
    // 规范化参数
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  // 调用真正的函数，入参是调用函数时间戳
  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  // 开启计时器方法，返回定时器id
  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      // 如果没有传入wait参数，约16ms后执行
      return requestAnimationFrame(pendingFunc);
    }
    return setTimeout(pendingFunc, wait);
  }
  // 取消定时器
  function cancelTimer(id) {
    if (useRAF) {
      return cancelAnimationFrame(id);
    }
    clearTimeout(id);
  }
  // 等待时间起始端调用事件处理程序
  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    // 事件上次触发到现在的经历的时间
    const timeSinceLastCall = time - lastCallTime;
    // 事件处理函数上次真正执行到现在经历的时间
    const timeSinceLastInvoke = time - lastInvokeTime;
    // 等待触发的时间
    const timeWaiting = wait - timeSinceLastCall;
    // 如果用户设置了最长等待时间，则需要取最小值
    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }
  // 判断某个时刻是否允许调用真正的事件处理程序
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return (
      lastCallTime === undefined || // 如果是第一次调用，则一定允许
      timeSinceLastCall >= wait || // 等待时间超过设置的时间
      timeSinceLastCall < 0 || // 当前时刻早于上次事件触发时间，比如说调整了系统时间
      (maxing && timeSinceLastInvoke >= maxWait) // 等待时间超过最大等待时间
    );
  }
  // 计时器时间到期执行的回调
  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // 重新启动计时器
    timerId = startTimer(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // 只有当事件至少发生过一次且配置了末端触发才调用真正的事件处理程序，
    // 意思是如果程序设置了末端触发，且没有设置最大等待时间，但是事件自始至终只触发了一次，则真正的事件处理程序永远不会执行
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }
  // 取消执行
  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }
  // 立即触发一次事件处理程序调用
  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }
  // 查询是否处于等待执行中
  function pending() {
    return timerId !== undefined;
  }

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}

export const throttle = (
  fn,
  wait,
  options = { leading: true, trailing: false, maxWait: wait }
) => debounce(fn, wait, options);

const print = throttle((msg) => {
  console.log(msg);
}, 500);

print("1");
print("2");
print("3");
setTimeout(() => {
  print("4");
  print("5");
  print("6");
}, 700);
