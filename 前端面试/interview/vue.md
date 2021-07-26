# vue

## computed和watch的区别

1. computed和watch都是观察页面的数据变化的。
2. computed只有当页面数据变化时才会计算，当数据没有变化时，它会读取缓存。而watch每次都需要执行函数，methods也是每次都需要执行
3. 数据变化时执行异步操作或开销较大的操作，这个时候使用watch是合适的
4. 先执行computed,后执行watch

## watch实现原理 有几种写法

`vm` 调用 `$watch` 后，首先调用 `observe` 函数 创建 `Observer` 实例观察数据，`Observer` 又创建 `Dep` , `Dep` 用来维护订阅者。然后创建 `Watcher` 实例提供 `update`函数。一旦数据变动，就层层执行回调函数。

```js
watch: { // 不应该使用箭头函数来定义 watcher 函数
  a: function (val, oldVal) {
    console.log('new: %s, old: %s', val, oldVal)
  },
  b: 'someMethod',// 方法名
  c: {
    handler: function (val, oldVal) { /* ... */ },
    deep: true// 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
  },
  d: {
    handler: 'someMethod',
    immediate: true// 该回调将会在侦听开始之后被立即调用
  },
  e: [
    'handle1',
    function handle2 (val, oldVal) { /* ... */ },
    {
      handler: function handle3 (val, oldVal) { /* ... */ },
      /* ... */
    }
  ],
  // watch vm.e.f's value: {g: 5}
  'e.f': function (val, oldVal) { /* ... */ }
}
```

## computed 的原理

计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果某个依赖 (比如非响应式属性) 在该实例范畴之外，则计算属性是不会被更新的。

```js
const vm = {
  dependencies: [],
  obj: {
    get a() {
      // this 指向 vm 对象。
      this.dependencies.push('a');
      return this.obj.b;
    },
    get b() {
      this.dependencies.push('b');
      return 1;
    }
  },
  computed: {
    c: {
      get() {
        // this 指向 vm 对象。
        return this.obj.a;
      }
    }
  }
};
vm.dependencies = [];
console.log(vm.c);
console.log('vm.c 依赖项：', vm.dependencies); // 输出： vm.c 依赖项： a, b
```

访问 vm.c 之前，清空了一下 vm.dependencies 数组，访问 vm.c 的时候，会调用相应的 get() 方法，在 get() 方法中，访问了 this.obj.a ，而对于 this.obj.a 的访问，又会调用相应的 get 方法，在该 get 方法中，有一句代码 this.dependencies.push('a') ，往 vm.dependencies 中放置了当前执行流程中依赖到的属性，然后以此类推，在 vm.c 访问结束之后， vm.dependencies 里面就记录了 vm.c 的依赖 ['a', 'b'] 了

链接：`https://www.jianshu.com/p/b38f826f42bc`

