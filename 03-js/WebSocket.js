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

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080");

// Connection opened
socket.addEventListener("open", function (event) {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
});
