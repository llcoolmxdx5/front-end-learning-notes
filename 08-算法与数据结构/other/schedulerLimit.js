class Scheduler {
  constructor(max = 1) {
    this._max = max;
    this.working = [];
  }

  add(task) {
    return new Promise((resolve) => {
      task.resolve = resolve;
      if (this.working.length < this._max) {
        this.runTask(task);
      }
    });
  }

  runTask(task) {
    this.working.push(task);
    Promise.resolve().then(() => {
      // 调用外层Promise的resolve以便add().then()的执行
      task.resolve();
      const index = this.working.indexOf(task);
      // 从正在进行的任务队列中删除
      this.working.splice(index, 1);
    });
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler(2);

// 实现一秒内最多打印 n 次
const print = (msg) => {
  scheduler.add(() => timeout(1000)).then(() => console.log(msg));
};

print("1");
print("2");
print("3");
setTimeout(() => {
  print("4");
  print("5");
  print("6");
}, 2000);
