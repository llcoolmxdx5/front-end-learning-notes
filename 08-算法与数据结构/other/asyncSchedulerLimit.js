class Scheduler {
  constructor() {
    this._max = 2;
    this.unWork = [];
    this.working = [];
  }

  add(task) {
    return new Promise((resolve) => {
      task.resolve = resolve;
      if (this.working.length < this._max) {
        this.runTask(task);
      } else {
        this.unWork.push(task);
      }
    });
  }

  runTask(task) {
    this.working.push(task);
    Promise.resolve(task()).then(() => {
      // task异步任务完成以后，再调用外层Promise的resolve以便add().then()的执行
      task.resolve();
      const index = this.working.indexOf(task);
      // 从正在进行的任务队列中删除
      this.working.splice(index, 1);
      if (this.unWork.length > 0) {
        this.runTask(this.unWork.shift());
      }
    });
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(4000, 2);
scheduler.add(() => console.log("sync"));
addTask(2000, 1);
addTask(3000, 4);
addTask(900, 3);
