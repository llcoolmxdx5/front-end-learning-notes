# 03-3-BOM&DOM

## DOM

### 1. 获取元素

```js
document.getElementById()
document.getElementsByTagName()
document.getElementsByClassName()
document.querySelector()
document.getElementsByName() // 用于表单元素查找，返回NodeList列表可以用forEach遍历
document.querySelectorAll() // 返回NodeList列表可以用forEach遍历
```

### 2. 事件

#### 1. 注册/移除事件的三种方式

```js
var box = document.getElementById('box');
box.onclick = function(e) {
    console.log('代码会在box被点击后执行');
    // IE6时没有e
};
box.onclick = null;
// 不能使用捕获阶段
```

```js
// IE9及以上
box.addEventListener('click', eventCode, false);
box.removeEventListener('click', eventCode, false);
// 第三个参数为true时是捕获阶段触发，为false时为冒泡阶段触发，默认是false
```

```js
// IE8及以下
box.attachEvent('onclick', eventCode);
box.detachEvent('onclick', eventCode);
```

#### 2. 事件注册/移除的兼容代码

```js
function addEventListener(element, type, fn) {
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent){
        element.attachEvent('on' + type,fn);
    } else {
        element['on'+type] = fn;
    }
}

function removeEventListener(element, type, fn) {
    if (element.removeEventListener) {
        element.removeEventListener(type, fn, false);
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, fn);
    } else {
        element['on'+type] = null;
    }
}
```

#### 3. 事件的三个阶段

> `事件对象.eventPhase`属性可以查看事件触发时所处的阶段

1. 捕获阶段

2. 当前目标阶段

3. 冒泡阶段

#### 4. 事件对象的属性和方法

```js
e || window.event  // 兼容IE6
event.type //获取事件类型
clientX/clientY     //所有浏览器都支持，窗口位置
pageX/pageY       //IE8以前不支持，页面位置
event.target || event.srcElement //用于获取触发事件的元素
event.preventDefault() //取消默认行为
event.returnValue=false  // 返回值=false 阻止默认时间 IE兼容  return false
e.stopPropagation() // 阻止冒泡/捕获
e.cancelBubble = true // IE8阻止冒泡
function clickHandler (e) {
    e.currentTarget // 就是默认的this，被监听的对象
    e.target // chrome支持 目标对象，实际监听到的对象
    e.srcElement // ie支持 chrome支持等同于e.target
}
```

#### 5. 阻止事件传播的方式

```js
标准方式 event.stopPropagation();
IE低版本 event.cancelBubble = true; //标准中已废弃
// 阻止默认事件
event.preventDefault() //取消默认行为
event.returnValue=false  // 返回值=false 阻止默认时间 IE兼容  return false
// 用途：1、表单提交与重置 2、图片拖拽阻止 3、文字选中取消 4、右键菜单显示阻止
```

#### 6. 事件类型

#### Event事件

```js
var e = new Event() //事件基类
change // 修改,一般用于表单元素改变
// 如果用于文本框,如果输入的内容在失焦后判断改变了,则会触发事件,如果没有改变不会触发事件
error // 错误 如果加载错误时触发error事件
load // 加载 图片,script,css,视频,音频,通信都是加载
reset // 针对表单的事件
submit // 针对表单的事件
resize // 更改大小,一般应用于window对象
select // 针对input文本框内容的选择事件 selectionStart selectionEnd 选择的内容开始/结束下标
scroll // 滚动条事件
```

#### focus事件

```js
var e = new FocusEvent()
// focus  blur   针对表单的子元素和超链接使用
focus // 汇聚焦距时 e.relatedTarget 上一次当前事件的目标对象
blur // 失去焦距时
```

#### 鼠标事件

```js
var e = new MouseEvent() // 鼠标事件对象
click // 点击
dblclick // 双击
mousedown // 鼠标按下键
mouseup // 鼠标释放键
mousemove // 鼠标移动
mouseover //鼠标滑过
mouseout // 鼠标滑出
mouseenter //鼠标进入 不会冒泡
mouseleave // 鼠标离开 不会冒泡
contextmenu // 右键菜单
e.altKey: false   // 是否按住alt点击
e.ctrlKey: false   // 是否按住ctrl点击
e.shiftKey: false   // 是否按住shift点击
e.metaKey: false   // 是否按住meta点击
// 移动距离坐标  主要用户mousemove事件,早期版本不兼容
// 这里的值是每次移动相对上次移动的距离
e.movementX: 0     // 正 是向右 负 是向左
e.movementY: 0     // 正 是向下 负 是向上
// 鼠标坐标,这两对是完全一样的含义
// clientX和clientY兼容早期IE浏览器
// 鼠标点击所在位置相对视口距离
e.clientX: 68
e.clientY: 53
e.x: 51
e.y: 27
```

#### input事件

```js
var e = new InputEvent()
input // input事件 针对input文本框输入做事件侦听，输入内容时触发事件
```

#### 键盘事件

```js
// 按键事件一般针对window或者document的,一般使用针对window
var e = new KeyboardEvent()
keyup // 键盘按键按下触发
keydown // 键盘按键抬起触发
e.code: "KeyA"  //按键名   正式区分按下键
e.key: "a"  //键名
e.isComposing: false  //是否启用输入法
e.keyCode: 83  //键码值    ->用这个
e.which: 83   //键码
// 左上右下键码值    37,38,39,40
// 回车键码值    13
```

#### 滚轮事件

```js
var e = new WheelEvent()
```

### 3. 属性操作

#### 1. 非表单元素的属性

> href、title、id、src、className

```js
var pic = document.getElementById('pic');
console.log(pic.src);
```

#### 2. innerHTML和innerText

```js
innerText兼容处理
function getInnerText(element) {
    return (typeof element.textContent === "string") ? element.textContent : element.innerText;
}
```

#### 3. 表单元素属性

```js
ele.value // 用于大部分表单元素的内容获取(option除外)
ele.type // 可以获取input标签的类型(输入框或复选框等)
ele.disabled // 禁用属性
ele.checked // 复选框选中属性
ele.selected // 下拉菜单选中属性
```

#### 4. 自定义属性操作

```js
element.getAttribute("属性名") // 获取标签行内属性
element.setAttribute("属性名","值") // 设置标签行内属性
element.removeAttribute("属性名") // 移除标签行内属性
// 与element.属性的区别: 上述三个方法用于获取任意的行内属性。
```

#### 5. 样式操作

```js
// ele.style是行内样式
element.style.width = "123px"
getComputedStyle(ele).width // 获取计算后样式 IE不支持
ele.currentStyle.width // 获取计算后样式 仅支持IE
```

#### 6. 类名操作

```js
element.className = "box"
```

#### 7. 自定义标签属性

单词全部小写，单词之间用-连接

### 4. 创建元素

```js
document.write()
obj.innerHTML
document.createElement()
document.createDocumentFragment() // 创建碎片容器 需要插入多个节点时，插入该碎片容器
document.createTextNode(文本内容) // 创建文本节点
```

innerHTML属性由于会对字符串进行解析，需要避免在循环内多次使用。
可以借助字符串或数组的方式进行替换，再设置给innerHTML
优化后与document.createElement性能相近

### 5. 节点操作

#### 1. 节点操作，方法

```js
element.appendChild()
element.insertBefore(child1,child2) // 将child1插入到child2之前
element.removeChild()
element.remove()
element.replaceChild(newChild, oldChild) // 替换元素
element.cloneNode(false/true) // 复制元素，为true时为深复制 浅复制时不会复制节点的子节点
```

#### 2. 节点层次，属性

```js
element.parentNode
element.childNodes
element.children
element.nextSibling/previousSibling
element.firstChild/lastChild
```

#### 3. 注意

`childNodes`和`children`的区别，`childNodes`获取的是子节点，`children`获取的是子元素
`nextSibling`和`previousSibling`获取的是节点
获取元素对应的属性是`nextElementSibling`和`previousElementSibling`
`nextElementSibling`和`previousElementSibling`有兼容性问题，IE9以后才支持

## BOM

window是浏览器的顶级对象，当调用window下的属性和方法时，可以省略window

### 1. 对话框

alert()
prompt()
confirm()

### 2. 页面加载事件

```js
window.onload = function () {
  // 当页面加载完成执行
  // 当页面完全加载所有内容（包括图像、脚本文件、CSS 文件等）执行
}
```

### 3.定时器

#### 1.setTimeout()和clearTimeout()

在指定的毫秒数到达之后执行指定的函数，只执行一次

```js
var timerId = setTimeout(function () {
    console.log('Hello World');
}, 1000);
clearTimeout(timerId);// 取消定时器的执行
```

#### 2.setInterval()和clearInterval()

定时调用的函数，可以按照给定的时间(单位毫秒)周期调用函数

```js
// 创建一个定时器，每隔1秒调用一次
var timerId = setInterval(function () {
    var date = new Date();
    console.log(date.toLocaleTimeString());
}, 1000);
clearInterval(timerId);// 取消定时器的执行
```

### 4. location对象

location可以获取或者设置浏览器地址栏的URL 使用的时候可以省略window对象
scheme://host:port/path?query#fragment

```js
location.href = "https://www.baidu.com" // 交互后执行有历史记录
location.assign("https://www.baidu.com") // 交互后执行有历史记录
location.replace("https://www.baidu.com") // 无历史记录
location.reload() // 重载页面，不会在http请求头中携带缓存标记 和ctrl+r类似
location.hash // 获取地址栏中#标志后的内容包括#
location.search // 获取地址栏中？后的内容包括？
```

### 5. history对象

```js
history.back() // 后退
history.forward() // 前进
history.go(0) // 刷新当前页面
history.go(1) // 前进一个页面
```

### 6. navigator对象

```js
navigator.userAgent  // 通过userAgent可以判断用户浏览器的类型
navigator.platform  // 通过platform可以判断浏览器所在的系统平台类型.
```

### 7. window对象 使用时可以省去window

```js
window.innerWidth // 文档宽度
window.innerHeight // 文档高度
```

## offset client scroll

### 1. 滚动偏移

```js
var box = document.getElementById('box');
// 兼容问题 高版本浏览器获取/设置scrollLeft/Top 使用HTML document.documentElement
// 低版本浏览器获取/设置scrollLeft/Top 使用body document.body
console.log(box.scrollLeft) //
console.log(box.scrollTop) // 获取位于元素顶部边界与元素中当前可见内容的最顶端之间的距离
                           // scrollTop=scrollHeight-clientHeight
                           // 包含内容的完全高度-自身高度+滚动条（不会在上方出现，为0）
console.log(box.scrollWidth) // 内容宽度+2内容border+1padding
console.log(box.scrollHeight) // 内容高度+2内容border+1padding
```

### 2.偏移量即外边距

offsetParent用于获取定位的父级元素 不能设置

```js
var box = document.getElementById('box');
console.log(box.offsetParent); // 获取距离当前元素最近的定位父元素
console.log(box.offsetLeft); // 获取box的坐标 到最近一个定位的父元素的距离
console.log(box.offsetTop);
console.log(box.offsetWidth); // 宽度+2padding+2border
console.log(box.offsetHeight); // 高度+2padding+2border
```

### 3. 客户区大小 去掉边框的大小

不能设置

```js
var box = document.getElementById('box');
console.log(box.clientLeft); // border-left的宽度
console.log(box.clientTop); // border-top的宽度
console.log(box.clientWidth); // 宽度+2padding-滚动条宽度
console.log(box.clientHeight); // 高度+2padding-滚动条高度
```
