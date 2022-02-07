// WebSocket 对象提供了用于创建和管理 WebSocket 连接，以及可以通过该连接发送和接收数据的 API。
// 方法
//   WebSocket.close([code[, reason]]) 关闭当前链接。
//   WebSocket.send(data) 对要传输的数据进行排队。
// 事件
//  使用 addEventListener() 或将一个事件监听器赋值给本接口的 onEventName 属性，来监听下面的事件。
//  close
//    当一个 WebSocket 连接被关闭时触发。
//    也可以通过 onclose 属性来设置。
//  error
//    当一个 WebSocket 连接因错误而关闭时触发，例如无法发送数据时。
//    也可以通过 onerror 属性来设置.
//  message
//    当通过 WebSocket 收到数据时触发。
//    也可以通过 onmessage 属性来设置。
//  open
//    当一个 WebSocket 连接成功时触发。
//    也可以通过 onopen 属性来设置。

const ws = new WebSocket("ws://localhost:8080");
// 初始化事件函数
const initEventHandle = (wsUrl) => {
  ws.onclose = () => {
    reconnect(wsUrl);
  };
  ws.onerror = (err) => {
    reconnect(wsUrl);
  };
  ws.onopen = () => {
    heartCheck.reset().start(); // 心跳检测重置
  };
  ws.onmessage = (msg) => {
    heartCheck.reset().start(); // 拿到任何消息都说明当前连接是正常的
    console.log(msg.data);
    ws.send("msg");
  };
};
// 实例websocket
const createWebSocket = (url) => {
  try {
    if ("WebSocket" in window) {
      ws = new WebSocket(url);
    } else if ("MozWebSocket" in window) {
      ws = new MozWebSocket(url);
    } else {
      alert("当前浏览器不支持websocket协议,建议使用现代浏览器", 3000);
    }
    initEventHandle();
  } catch (e) {
    reconnect(url);
  }
};
const reconnect = () => {
  if (reconnect.lockReconnect) return;
  reconnect.lockReconnect = true;
  setTimeout(() => {
    createWebSocket(url);
    reconnect.lockReconnect = false;
  }, 2000);
};
const heartCheck = {
  timeout: 60000, //  心跳检测时长
  timeoutObj: null, // 定时变量
  reset: () => {
    // 重置定时
    clearTimeout(this.timeoutObj);
    return this;
  },
  start: () => {
    // 开启定时
    this.timeoutObj = setTimeout(() => {
      // 心跳时间内收不到消息，主动触发连接关闭，开始重连
      ws.close();
    }, this.timeout);
  },
};
