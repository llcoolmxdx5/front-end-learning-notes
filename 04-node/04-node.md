# nodejs

```js
const http = require("http");
const queryString = require("querystring");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});
connection.connect();
connection.query("", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});
const server = http.createServer(function (req, res) {
  req.on("data", function (_data) {
    console.log(_data); // post时携带的数据
  });
  req.on("end", function () {
    if (req.url.indexOf("favicon.ico") > -1) return;
    let str = req.url.split("?")[1];
    let obj = queryString.parse(str);
    console.log(obj);
    res.writeHead(200, {
      "content-type": "text/html; charset=UTF-8",
      "Access-Control-Allow-Origin": "*", // cors跨域
      "Access-Control-Allow-Headers": "*",
    });
    res.write("你好!");
    res.end();
  });
});
server.listen(4001, "10.9.42.247", function () {
  console.log("开启服务");
});
```
