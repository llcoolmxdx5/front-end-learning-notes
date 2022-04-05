import { sleep } from "../utils";

export default {
  namespace: "counter",
  state: {
    number: 0,
  },
  reducers: {
    // 属性名就是 action-type
    add(state, { payload }) {
      return { number: state.number + (payload || 1) };
    },
    minus(state) {
      return { number: state.number - 1 };
    },
  },
  effects: {
    *asyncAdd(action, { put, call, select }) {
      const a = yield select((state) => state.counter.number);
      console.log(a);
      yield call(sleep, 1000);
      yield put({ type: "add" });
    },

    // Only catch the last one.
    // dispatch({ type: 'addDelay', payload: 2 });
    // dispatch({ type: 'addDelay', payload: 3 });
    addDelay: [
      function* ({ payload }, { call, put }) {
        console.log(1);
        yield call(sleep, 120);
        console.log(2);
        yield put({ type: "add", payload });
      },
      // 只响应最后一次
      // { type: "takeLatest" },
      { type: 'throttle', ms: 50 },
    ],

    // Only catch the first one.
    // dispatch({ type: 'addWatcher', payload: 2 });
    // dispatch({ type: 'addWatcher', payload: 3 });
    // 2
    addWatcher: [
      function* ({ take, put, call }) {
        while (true) {
          const { payload } = yield take("addWatcher");
          yield call(sleep, 100);
          yield put({ type: "add", payload });
        }
      },
      { type: "watcher" },
    ],

  },
  subscriptions: {
    changeTitle({ dispatch, history }, done) {
      history.listen(({ pathname }) => {
        console.log(pathname);
        document.title = pathname;
      });
    },
    // 默认调用
    // setup({ dispatch }) {
    //   dispatch({ type: "add" });
    // },
  },
};
