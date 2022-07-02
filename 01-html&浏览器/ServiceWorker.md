# Service Worker

IE 不支持, 移动端不支持

[帮助文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)

作为一个比较新的技术，大家可以把 Service Worker 理解为一个介于客户端和服务器之间的一个代理服务器。在 Service Worker 中我们可以做很多事情，比如拦截客户端的请求、向客户端发送消息、向服务器发起请求等等，其中最重要的作用之一就是离线资源缓存。

![alt](https://tva1.sinaimg.cn/large/00831rSTgy1gce6jy0v7tj30ji0j1q43.jpg)

## 注册安装

```js
// index.js
if ('serviceWorker' in window.navigator) {
  navigator.serviceWorker
    .register('./sw.js', { scope: './' })
    .then(function (reg) {
      console.log('success', reg);
    })
    .catch(function (err) {
      console.log('fail', err);
    });
}
```

## 缓存指定静态资源

```js
// sw.js
globalThis.addEventListener('install', function (event) {
  console.log('install');
  event.waitUntil(
    caches.open('sw_demo').then(function (cache) {
      return cache.addAll(['/style.css', '/panda.jpg', './main.js']);
    }),
  );
});
```

## 动态缓存静态资源

```js
globalThis.addEventListener('fetch', function (event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(res => {
      return (
        res ||
        fetch(event.request)
          .then(response => {
            const responseClone = response.clone();
            caches.open('sw_demo').then(cache => {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch(err => {
            console.log(err);
          })
      );
    }),
  );
});
```

### 缓存版本管理

版本修改的时候会触发 activate，将旧版本的缓存清理掉。

```js
var OFFLINE_PREFIX = 'offline-';
var CACHE_NAME = 'main_v1.0.0';
globalThis.addEventListener('activate', function (event) {
  var mainCache = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (mainCache.indexOf(cacheName) === -1 && cacheName.indexOf(OFFLINE_PREFIX) === -1) {
            // When it doesn't match any condition, delete it.
            console.info('SW: deleting ' + cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  return globalThis.clients.claim();
});
```
