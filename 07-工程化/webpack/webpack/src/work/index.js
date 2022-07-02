// 下面的代码属于业务逻辑
const worker = new Worker(new URL('./work.js', import.meta.url));

worker.postMessage({
  question: 'hi, 那边的 worker 线程，请告诉我今天的幸运数字是多少?',
});

worker.onmessage = ({ data: { answer } }) => {
  console.log(answer);
};
