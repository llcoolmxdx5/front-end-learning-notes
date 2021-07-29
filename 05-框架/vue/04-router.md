# 路由

## 概念

> `https://router.vuejs.org/zh/guide/`

1. **后端路由：**对于普通的网站，所有的超链接都是 URL 地址，所有的 URL 地址都对应服务器上对应的资源；

2. **前端路由：**对于单页面应用程序来说，主要通过 URL 中的 hash(#号)来实现不同页面之间的切换，同时，hash 有一个特点：HTTP 请求中不会包含 hash 相关的内容；所以，单页面程序中的页面跳转主要用 hash 实现；

3. 在单页面应用程序中，这种通过 hash 改变来切换页面的方式，称作前端路由(区别于后端路由)

## 使用

```html
<!-- 1. 导入 vue-router 组件类库 -->
<script src="./lib/vue-router-2.7.0.js"></script>
<div id="app">
  <!-- 2. 使用 router-link 组件来导航 默认渲染为一个a 标签 -->
  <router-link to="/login" tag="a">登录</router-link>
  <router-link to="/register">注册</router-link>
  <!-- 3. 使用 router-view 组件来显示匹配到的组件 -->
  <!-- 可以把 router-view 认为是一个占位符 -->
  <router-view></router-view>
</div>
<script>
  // 4.1 使用 Vue.extend 来创建登录组件
  var login = Vue.extend({
    template: "<h1>登录组件</h1>",
  });
  // 4.2 使用 Vue.extend 来创建注册组件
  var register = Vue.extend({
    template: "<h1>注册组件</h1>",
  });
  // 5. 创建一个路由 router 实例，通过 routers 属性来定义路由匹配规则
  var routerObj = new VueRouter({
    routes: [
      { path: "/login", component: login },
      { path: "/register", component: register },
    ],
  });
  // 6. 创建 Vue 实例，得到 ViewModel
  var vm = new Vue({
    el: "#app",
    router: routerObj, // 将路由规则对象，注册到 vm 实例上，用来监听 URL 地址的变化，然后展示对应的组件
  });
</script>
```

## 重定向与别名

```js
const router = new VueRouter({
  routes: [
    { path: "/a", redirect: "/b" }, //从 /a 重定向到 /b
    { path: "/a", redirect: { name: "foo" } }, //重定向的目标也可以是一个命名的路由
    {
      path: "/a",
      redirect: (to) => {
        //甚至是一个方法，动态返回重定向目标
        // 方法接收 目标路由 作为参数
        // return 重定向的 字符串路径/路径对象
      },
    },
  ],
});
```

“重定向”的意思是，当用户访问 /a 时，URL 将会被替换成 /b，然后匹配路由为 /b

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。

```js
const router = new VueRouter({
  routes: [{ path: "/a", component: A, alias: "/b" }],
});
```

“别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构

## 动态路由匹配

```js
const User = {
  template: "<div>User{{ $route.params.id }}</div>",
};
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: "/user/:id", component: User },
  ],
});
```

|             模式              |      匹配路径       | \$route.params                       |
| :---------------------------: | :-----------------: | ------------------------------------ |
|        /user/:username        |     /user/evan      | { username: 'evan' }                 |
| /user/:username/post/:post_id | /user/evan/post/123 | { username: 'evan', post_id: '123' } |

当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) \$route 对象

```js
const User = {
  template: "...",
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    },
  },
};
```

## 嵌套路由

```html
<div id="app">
  <p>
    <router-link to="/user/foo">/user/foo</router-link>
    <router-link to="/user/foo/profile">/user/foo/profile</router-link>
    <router-link to="/user/foo/posts">/user/foo/posts</router-link>
  </p>
  <router-view></router-view>
</div>
<script>
  const User = {
    template: `
      <div class="user">
        <h2>User {{ $route.params.id }}</h2>
        <router-view></router-view>
      </div>
    `,
  };
  const UserHome = { template: "<div>Home</div>" };
  const UserProfile = { template: "<div>Profile</div>" };
  const UserPosts = { template: "<div>Posts</div>" };
  // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
  // 以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径
  const router = new VueRouter({
    routes: [
      {
        path: "/user/:id",
        component: User,
        children: [
          { path: "", component: UserHome },
          {
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: "profile",
            component: UserProfile,
          },
          {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 会被渲染在 User 的 <router-view> 中
            path: "posts",
            component: UserPosts,
          },
        ],
      },
    ],
  });
  const app = new Vue({ router }).$mount("#app");
</script>
```

## 路由组件传参

在组件中使用 \$route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

```js
const User = {
  template: "<div>User {{ $route.params.id }}</div>",
};
const router = new VueRouter({
  routes: [{ path: "/user/:id", component: User }],
});
```

使用 props 将组件和路由解耦

```js
const User = {
  props: ["id"],
  template: "<div>User {{ id }}</div>",
};
const router = new VueRouter({
  routes: [
    { path: "/user/:id", component: User, props: true },
    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: "/user/:id",
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false },
    },
  ],
});
```

1. 布尔模式

   如果 props 被设置为 true，route.params 将会被设置为组件属性。

2. 对象模式

   如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用

   ```js
   const router = new VueRouter({
     routes: [
       {
         path: "/promotion/from-newsletter",
         component: Promotion,
         props: { newsletterPopup: false },
       },
     ],
   });
   ```

3. 函数模式

   你可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

   ```js
   const router = new VueRouter({
     routes: [
       // URL /search?q=vue 会将 {query: 'vue'} 作为属性传递给 SearchUser 组件。
       {
         path: "/search",
         component: SearchUser,
         props: (route) => ({ query: route.query.q }),
       },
     ],
   });
   ```

   请尽可能保持 props 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 props，请使用包装组件，这样 Vue 才可以对状态变化做出反应。
