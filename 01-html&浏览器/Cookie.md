# Cookie

## 创建过程

服务器发送的响应报文包含 Set-Cookie 首部字段，客户端得到响应报文后把 Cookie 内容保存到浏览器中。

```bash
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choc
Set-Cookie: tasty_cookie=strawberry

[page content]
```

客户端之后对同一个服务器发送请求时，会从浏览器中取出 Cookie 信息并通过 Cookie 请求首部字段发送给服务器。

```bash
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choc; tasty_cookie=strawberry
```

## cookie 的属性

### Name

为一个 cookie 的名称（用 JavaScript 操作 Cookie 的时候注意对 Value 进行编码处理。）

### value

为一个 cookie 的值（用 JavaScript 操作 Cookie 的时候注意对 Value 进行编码处理。）

### Domain

Domain 标识指定了哪些主机可以接受 Cookie。如果不指定，默认为当前文档的主机（不包含子域名）。如果指定了 Domain，则一般包含子域名。例如，如果设置 Domain=mozilla.org，则 Cookie 也包含在子域名中（如 developer.mozilla.org）。

### Path

Path 标识指定了主机下的哪些路径可以接受 Cookie（该 URL 路径必须存在于请求 URL 中）。以字符 %x2F ("/") 作为路径分隔符，子路径也会被匹配。例如，设置 Path=/docs，则以下地址都会匹配：

- /docs
- /docs/Web/
- /docs/Web/HTTP

### Expires

字段为此 cookie`超时时间`。若设置其值为一个时间，那么当到达此时间后，此 cookie 失效。不设置的话`默认值是Session`，意思是 cookie 会和 session 一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此 cookie 失效。

```bash
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```

当为 `会话性 Cookie` 的时候，值保存在客户端内存中，并在用户关闭浏览器时失效。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期 Cookie 也会被保留下来，就好像浏览器从来没有关闭一样。

与会话性 Cookie 相对的是`持久性 Cookie`，持久性 Cookies 会保存在用户的硬盘中，直至过期或者清除 Cookie。这里值得注意的是，设定的日期和时间只与客户端相关，而不是服务端。

### Max-Age

`Max-Age`用于设置在 Cookie 失效之前需要经过的`秒数`。比如：

```bash
Set-Cookie: id=a3fWa; Max-Age=604800;
```

`Max-Age` 可以为正数、负数、甚至是 0。

- 如果 max-Age 属性为`正数`时，浏览器会将其持久化，即写到对应的 Cookie 文件中。
- 当 max-Age 属性为`负数`，则表示该 Cookie 只是一个会话性 Cookie。
- 当 max-Age 为 `0`时，则会立即删除这个 Cookie。

假如 `Expires`和 `Max-Age` 都存在，`Max-Age`优先级更高。

### Size

此 cookie 大小

### HttpOnly

标记为 HttpOnly 的 Cookie 不能被 JavaScript 脚本调用。跨站脚本攻击 (XSS) 常常使用 JavaScript 的 document.cookie API 窃取用户的 Cookie 信息，因此使用 HttpOnly 标记可以在一定程度上避免 XSS 攻击。

```bash
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

### Secure

设置是否只能通过 https 来传递此条 cookie。使用 `HTTPS`安全协议，可以保护 Cookie 在浏览器和 Web 服务器间的传输过程中不被窃取和篡改。

### SameSite

SameSite 属性可以让`Cookie`在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（`CSRF`）。

- `Strict`仅允许一方请求携带 Cookie，即浏览器将只发送`相同站点`请求的 Cookie，即当前网页 URL 与请求目标 `URL 完全一致`。
- `Lax`允许部分第三方请求携带 Cookie
- `None`无论是否跨站都会发送 Cookie

之前默认是`None` 的，Chrome80 后默认是 `Lax`。

「同站」判断：只要两个 URL 的 eTLD+1 相同即可，不需要考虑协议和端口。其中，eTLD 表示有效顶级域名，注册于 Mozilla 维护的公共后缀列表（Public Suffix List）中，例如，.com、.co.uk、.github.io 等。eTLD+1 则表示，有效顶级域名+二级域名，例如 taobao.com 等

## JavaScript

浏览器通过 document.cookie 属性可创建新的 Cookie，也可通过该属性访问非 HttpOnly 标记的 Cookie。

```js
document.cookie = "yummy_cookie=choc";
document.cookie = "tasty_cookie=strawberry";
console.log(document.cookie);
```
