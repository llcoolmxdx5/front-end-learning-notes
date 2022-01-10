# http 缓存

## 强缓存

### Expires

Expires 是 http1.0 的规范.当我们请求一个资源，服务器返回时，可以在 Response Headers 中增加 expires 字段表示资源的过期时间。

```bash
expires: Thu, 03 Jan 2019 11:43:04 GMT
```

它是一个时间戳（准确点应该叫格林尼治时间），当客户端再次请求该资源的时候，会把客户端时间与该时间戳进行对比，如果大于该时间戳则已过期，否则直接使用该缓存资源。

但是，有个大问题，发送请求时是使用的客户端时间去对比。一是客户端和服务端时间可能快慢不一致，另一方面是客户端的时间是可以自行修改的（比如浏览器是跟随系统时间的，修改系统时间会影响到），所以不一定满足预期。

### Cache-Control

Cache-Control 是在 http1.1 中出现的

```bash
cache-control: public, max-age=3600, s-maxage=3600
```

1. no-cache：不使用本地缓存。需要使用缓存协商，先与服务器确认返回的响应是否被更改，如果之前的响应中存在 ETag，那么请求的时候会与服务端验证，如果资源未被更改，则可以避免重新下载。
2. no-store：直接禁止浏览器缓存数据，每次用户请求该资源，都会向服务器发送一个请求，每次都会下载完整的资源。
3. public：可以被所有的用户缓存，包括终端用户和 CDN 等中间代理服务器。
4. private：只能被终端用户的浏览器缓存，不允许 CDN 等中继缓存服务器对其缓存。
5. Cache-Control 与 Expires 可以在服务端配置同时启用，同时启用的时候 Cache-Control 优先级高。

max-age 和 s-maxage

两者是 cache-control 的主要字段，它们是一个数字，表示资源过了多少秒之后变为无效。在浏览器中，max-age 和 s-maxage 都起作用，而且 s-maxage 的优先级高于 max-age。在代理服务器中，只有 s-maxage 起作用。 可以通过设置 max-age 为 0 表示立马过期来向服务器请求资源。

### pragma

既然讲到了 no-cache 和 no-store，就顺便把 pragma 也讲了。他的值有 no-cache 和 no-store，表示意思同 cache-control，优先级高于 cache-control 和 expires，即三者同时出现时，先看 pragma -> cache-control -> expires。

```bash
pragma: no-cache
```

## 协商缓存

协商缓存就是由服务器来确定缓存资源是否可用，所以客户端与服务器端要通过某种标识来进行通信，从而让服务器判断请求资源是否可以缓存访问。

普通刷新会启用弱缓存，忽略强缓存。只有在地址栏或收藏夹输入网址、通过链接引用资源等情况下，浏览器才会启用强缓存，这也是为什么有时候我们更新一张图片、一个 js 文件，页面内容依然是旧的，但是直接浏览器访问那个图片或文件，看到的内容却是新的。

主要涉及到两组 header 字段：Etag 和 If-None-Match、Last-Modified 和 If-Modified-Since

### last-modified

last-modified 记录资源最后修改的时间。启用后，请求资源之后的响应头会增加一个 last-modified 字段，如下：

```bash
last-modified: Thu, 20 Dec 2018 11:36:00 GMT
```

当再次请求该资源时，请求头中会带有 if-modified-since 字段，值是之前返回的 last-modified 的值，如：if-modified-since:Thu, 20 Dec 2018 11:36:00 GMT。服务端会对比该字段和资源的最后修改时间，若一致则证明没有被修改，告知浏览器可直接使用缓存并返回 304；若不一致则直接返回修改后的资源，并修改 last-modified 为新的值。

但 last-modified 有以下两个缺点：

- 只要编辑了，不管内容是否真的有改变，都会以这最后修改的时间作为判断依据，当成新资源返回，从而导致了没必要的请求响应，而这正是缓存本来的作用即避免没必要的请求。
- 时间的精确度只能到秒，如果在一秒内的修改是检测不到更新的，仍会告知浏览器使用旧的缓存。

### etag

为了解决 last-modified 上述问题，有了 etag。 etag 会基于资源的内容编码生成一串唯一的标识字符串，只要内容不同，就会生成不同的 etag。启用 etag 之后，请求资源后的响应返回会增加一个 etag 字段，如下：

```bash
etag: "FllOiaIvA1f-ftHGziLgMIMVkVw_"
```

当再次请求该资源时，请求头会带有 if-none-match 字段，值是之前返回的 etag 值，如：`if-none-match: "FllOiaIvA1f-ftHGziLgMIMVkVw_"`。服务端会根据该资源当前的内容生成对应的标识字符串和该字段进行对比，若一致则代表未改变可直接使用本地缓存并返回 304；若不一致则返回新的资源（状态码 200）并修改返回的 etag 字段为新的值。

可以看出 etag 比 last-modified 更加精准地感知了变化，所以 etag 优先级也更高。不过从上面也可以看出 etag 存在的问题，就是每次生成标识字符串会增加服务器的开销。所以要如何使用 last-modified 和 etag 还需要根据具体需求进行权衡。
