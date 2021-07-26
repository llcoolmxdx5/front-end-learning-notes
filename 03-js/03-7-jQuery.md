# jQuery

`<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>`

`<script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv-printshiv.min.js"></script>`

`<link href="https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.css" rel="stylesheet">`

`<script src="https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.js"></script>`

`<script src="https://cdn.bootcss.com/jquery-color/2.1.2/jquery.color.min.js"></script>`

`<script src="https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js"></script>`

`<script src="https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min.js"></script>`

## 1.选择器

### 1.DOM对象 和 jQuery对象之间的转换

1.将DOM对象转换为jQuery对象
  `var $变量 = $(DOM对象)`;
2.将jQuery对象转换成DOM对象
  1.var dom对象 = jQuery对象.get(0);
  2.var dom对象 = jQuery对象[0];

### 2.基本选择器

| 名称    | 用法                 | 描述                     |
| ----- | ------------------ | :--------------------- |
| ID选择器 | $(“#id”);          | 获取指定ID的元素              |
| 类选择器  | $(“.class”);       | 获取同一类class的元素          |
| 标签选择器 | $(“div”);          | 获取同一类标签的所有元素           |
| 并集选择器 | $(“div,p,li”);     | 使用逗号分隔，只要符合条件之一就可。     |
| 交集选择器 | $(“div.redClass”); | 获取class为redClass的div元素 |

### 2.层级选择器

| 名称    | 用法          | 描述                              |
| ----- | ----------- | :------------------------------ |
| 子代选择器 | $(“ul>li”); | 使用>号，获取儿子层级的元素，注意，并不会获取孙子层级的元素  |
| 后代选择器 | $(“ul li”); | 使用空格，代表后代选择器，获取ul下的所有li元素，包括孙子等 |
| 相邻兄弟选择器 | $("selector1+selector2") | 匹配紧紧跟在selector1后面且满足selector2选择器的元素 |
| 通用兄弟选择器 | $("selector1~selector2") | 匹配selector1后面所有满足selector2的元素 |

### 3.过滤选择器

| 名称         | 用法                                 | 描述                                 |
| ---------- | ---------------------------------- | :--------------------------------- |
| :eq（index） | $(“li:eq(2)”).css(“color”, ”red”); | 获取到的li元素中，选择索引号为2的元素，索引号index从0开始。|
| :odd       | $(“li:odd”).css(“color”, ”red”);   | 获取到的li元素中，选择索引号为奇数的元素              |
| :even      | $(“li:even”).css(“color”, ”red”);  | 获取到的li元素中，选择索引号为偶数的元素  |
| :first     | $(“li:first”).css(“color”, ”red”); | 只匹配到第一个元素 |
| :last      | $(“li:last”).css(“color”, ”red”);  | 只匹配到最后一个元素 |
| :not(selector) | $(“li:not(selector)”).css(“color”, ”red”); | 将满足selector选择器的元素排除在外 |
| :gt(index) | $(“li:gt(n)”).css(“color”, ”red”); | 匹配下标大于n的元素 |
| :lt(index) | $(“li:lt(n)”).css(“color”, ”red”); | 匹配下标小于index的元素 |
| [attribute] | | 匹配包含指定属性的元素 |
| [attribute=value] | $("input[type='text']") | 匹配attribute属性值为value的所有元素 |
| [attribute!=value] | | 匹配attribute属性值不是value的所有元素 |
| [attribute^=value] | | 匹配attribute属性值是以value字符作为开始的元素 |
| [attribute$=value] | | 匹配attribute属性值是以value字符作为结束的元素 |
| [attribute*=value] | | 匹配attribute属性值中包含value字符的所有元素 |
| :first-child | | 匹配属于其父元素中的首个子元素 |
| :last-child | | 匹配属于其父元素中的最后一个子元素 |
| :nth-child(n) | | 匹配属于其父元素中的第n个子元素 |

### 4.筛选选择器(方法)

| 名称                 | 用法                          | 描述                         |
| ------------------ | --------------------------- | :------------------------- |
| children(selector) | $(“ul”).children(“li”)      | 相当于$(“ul>li”)，子类选择器        |
| find(selector)     | $(“ul”).find(“li”);         | 相当于$(“ul li”),后代选择器        |
| siblings(selector) | $(“#first”).siblings(“li”); | 查找兄弟节点，不包括自己本身。            |
| parent()           | $(“#first”).parent();       | 查找父亲                       |
| eq(index)          | $(“li”).eq(2);              | 相当于$(“li:eq(2)”),index从0开始 |
| next()             | $(“li”).next()              | 找下一个兄弟                     |
| prev()             | $(“li”).prev()              | 找上一次兄弟                     |

## 2.jQuery事件

### 1.页面加载后的执行

`$(document).ready(function(){})`;
`$().ready(function(){})`;
`$(function(){})`;

### 2.jQuery的事件绑定/解绑

```js
$obj.on(events[,selector][,data],handler);//事件名称不用加on
// 第一个参数：events，绑定事件的名称可以是由空格分隔的多个事件（标准事件或者自定义事件）
// 第二个参数：selector, 执行事件的后代元素（可选），如果没有后代元素，那么事件将有自己执行。
// 第三个参数：data，传递给处理函数的数据，事件触发的时候通过event.data来使用（不常使用）
// 第四个参数：handler，事件处理函数
$(selector).on( "click","span", function() {});
$('#box').on('click','.button',function(){
    // 事件委托
    $(this).clone().appendTo('#box')
});
$obj.off() // 解绑元素所有事件
$obj.off("click") // 解绑元素点击事件
$('#box').off('click','.button'); // 取消事件委托

```

### 3.event 参数

>在绑定事件的时候，允许传递 event 参数来表示事件对象

```js
e.type
e.target
e.currentTarget
e.pageX/Y // 获取相对于页面原点的坐标
e.data // 绑定事件时传入的额外参数
e.timeStamp
```

### 4.事件冒泡

>元素中有元素,这些元素都有相同的事件,一旦最里面的元素的事件触发了,外面的所有的元素的相同的事件都会被触发

```js
e.stopPropagation()
e.preventDefault()
$("#dv3").click(function () {
    alert("dv3被点了"+$(this).attr("id"));
    return false;//取消事件冒泡 也可用于取消浏览器默认事件
});
```

### 5.模拟用户点击

```js
$('input').trigger('click') // 返回当前包含事件触发元素的 jQuery 对象(方便链式连缀调用) 会冒泡
$('input').triggerHandler('click') // 不会触发事件的默认行为 只会影响第一个匹配到的元素 返回当前事件执行的返回值
```

## 3.jQuery动画

### 1.基本显示 / 隐藏

显示：`$obj.show(speed,callback)`
隐藏：`$obj.hide(speed,callback)`
切换: `$obj.toggle(speed,callback)`
可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。
可选的 callback 参数是隐藏或显示完成后所执行的函数名称。

### 2.滑动式 显示/隐藏

显示：`$obj.slideDown(speed,callback)`
隐藏：`$obj.slideUp(speed,callback)`
切换: `$obj.slideToggle(speed,callback)`
可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。
可选的 callback 参数是隐藏或显示完成后所执行的函数名称。

### 3.淡入淡出式显示/隐藏

淡入已隐藏的元素: `$obj.fadeIn(speed,callback)`
淡出可见元素: `$obj.fadeOut(speed,callback)`
切换: `$obj.fadeToggle(speed,callback)`
`$obj.fadeTo(speed,opacity,callback)`渐变为给定的不透明度（值介于 0 与 1 之间）
可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。
可选的 callback 参数是隐藏或显示完成后所执行的函数名称。

### 4.停止动画

`$obj.stop(stopAll,goToEnd)`;
可选的 stopAll 参数规定是否应该清除动画队列。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。
可选的 goToEnd 参数规定是否立即完成当前动画。默认是 false。
因此，默认地，stop() 会清除在被选元素上指定的当前动画。

### 5.animation

```js
$('.animate').click(function(){
    $('#box').animate({
        'width':'300px',
        'height':'200px'
    },1000,function(){
        alert('动画执行完毕执行我！')
    })
})

// 必须设置绝对定位
$('.animate').click(function(){
    $('#box').animate({
        'left':'+=100px',
    });
})

$('.animate').click(function(){
    $('#box').animate({'left':'100px'})
    $('#box').animate({'top':'100px'})
    $('#box').animate({'width':'300px'})
})
$('.animate').click(function(){
    $('#box').animate({
        'left':'100px'
    }).animate({
        'top':'100px'
    }).animate({
        'width':'300px'
    })
})
```

## 4.jQueryHTML

### 1.创建对象

`$("创建的内容")`

### 2.插入元素

`$obj.append($new)`插入obj的最后一个子元素处
`$obj.prepend($new)`插入obj的第一个子元素处
`$obj.after($new)`将`$new`作为`$obj`的下一个兄弟元素插入进来
`$obj.before($new)`将`$new`作为`$obj`的上一个兄弟元素插入进来
`$obj.appendTo(document.body)`将`$obj`插入到body里
`$obj.warp($new)`在`$obj`外包裹一个`$new`
`$obj.warpAll($new)`在所有`$obj`外包裹一个`$new`
`$obj.warpInner($new)` `$obj`内的子元素包裹一个`$new`
`$obj.unwarp()` 取消包裹 删除父容器

### 3.基本操作

1. html()设置或返回所选元素的内容（包括 HTML 标记）

    ```js
    $('div').html(function(index, item){
      return `<a>${index}<a>`
    })
    ```

2. text()设置或返回所选元素的文本内容

3. val()设置或返回表单字段的值

4. attr()设置/改变属性值 单个/多个

    ```js
    $('div').attr(key, value)
    $('div').attr(key, function (index, value) {
        return index
    })
    $('div').attr({
        name: 1,
        age: 1
    })
    $('div').attr({
        name: function (index, item) {
            return index
        },
        age: 1
    })
    ```

5. removeAttr("attrName")

6. data()

7. prop()

8. clone(true/false) 复制元素 为false时不复制事件 为深复制

### 4.样式操作

1.attr("class","className")
2.addClass("className")
3.removeClass("className")
4.removeClass()
5.toggleClass("className")切换className
6.css("属性","值")设置或返回被选元素的一个或多个样式属性。
7.css({"propertyName":"value","propertyName":"value",...})设置多个 CSS 属性
8.css(['width', 'height']) 以对象的形式返回多个css样式

### width/height/偏移

`$('div').width()` 内容宽度
`$('div').innerWidth()` 内容宽度+padding
`$('div').outerWidth()` 内容宽度+padding+border
`$('div').outerWidth(true)` 内容宽度+padding+border+margin-滚动条宽度
`$(".div1").offset())` 元素相对页面左部顶端的位置
`$(".div1").offset({left:100,top:100})` 可以设置可以获取
`$(".div1").position())` 相对父容器的位置,offsetLeft和offsetTop 不可以设置
`$(".div0").scrollTop(100)`

### 5.删除节点

1. `$obj.remove()` 删除`$obj`元素 并删除事件

2. `$obj.detach()` 删除`$obj`元素 不删除事件

3. `$obj.remove("selector")` 将满足selector选择器的元素删除出去

4. `$obj.empty()` 删除`$obj`的子元素

5. `$obj.replaceWith($new)` 将`$obj`替换为`$new`

6. `$obj.replaceAll($new)` 将`$obj`全部替换为`$new`

### 6.each()方法

```js
$obj.each(function(index, element){
  // element当前元素也可用this选择器
})
$.each(obj, function(index, item){

})
```

## 5.jQueryAJAX

> AJAX 是与服务器交换数据的技术，它在不重载全部页面的情况下，实现了对部分网页的更新。

### load() 方法

从服务器加载数据，并把返回的数据放入被选元素中。

$(selector).load(URL,data,callback); URL必选

也可以把 jQuery 选择器添加到 URL 参数。
`$("#div1").load("demo_test.txt #p1");`把 "demo_test.txt" 文件中 id="p1" 的元素的内容，加载到指定的`<div>`元素中：

可选的 callback 参数规定当 load() 方法完成后所要允许的回调函数
回调函数可以设置不同的参数：
responseTxt - 包含调用成功时的结果内容
statusTXT - 包含调用的状态
xhr - 包含 XMLHttpRequest 对象

```js
$("button").click(function(){
  $("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success")
      alert("外部内容加载成功!");
    if(statusTxt=="error")
      alert("Error: "+xhr.status+": "+xhr.statusText);
  });
});
```

### get() 和 post() 方法

> jQuery get() 和 post() 方法用于通过 HTTP GET 或 POST 请求从服务器请求数据

`$.get(URL,callback)`;
`$.post(URL,data,callback)`;

### ajax

```js
function queryData(obj,callback){
    $.ajax({
        type:'get',
        url:'http://localhost/summary/select.php',
        data:obj,
        timeout:200, // ms
        dataType:'json/jsonp/html', // 返回的数据类型
        jsonp:'cb',//jsonp属性的作用就是自定义参数名字（callback=abc 这里的名字指的是等号前面的键，
                  //后端根据这个键获取方法名，jquery的默认参数名称是callback）
        jsonpCallback:'abc',//这个属性的作用就是自定义回调函数的名字
                            //（callback=abc这里的名字指的是等号后面的值）
                            //默认会是一个随机的函数名
        success:function(data){
            callback(data);
        },
        error:function(data){
            console.log(data)
        }
    });
}
```

### $.getJSON()

```js
$('input').click(function(){
    $.getJSON('test.json',function(response,status, xhr){
        alert(response[0].url)
    })
})
```

### $.getScript()方法

```js
//点击按钮后再加载 JS 文件
$('input').click(function(){
    $.getScript('test.js') // 也可以做jsonp通信
})
```

## 6.其他

### noConflict() 方法

`var jq = $.noConflict()`;
noConflict()可返回对 jQuery 的引用，您可以把它存入变量，以供稍后使用。

### JSONP

> Jsonp(JSON with Padding) 是 json 的一种"使用模式"，可以让网页从别的域名（网站）那获取资料，即跨域读取数据。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>JSONP 实例</title>
    <script src="http://cdn.static.runoob.com/libs/jquery/1.8.3/jquery.js"></script>
</head>
<body>
<div id="divCustomers"></div>
<script>
$.getJSON("http://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?", function(data) {
    var html = '<ul>';
    for(var i = 0; i < data.length; i++){
        html += '<li>' + data[i] + '</li>';
    }
    html += '</ul>';
    $('#divCustomers').html(html);
});
</script>
</body>
</html>
```

## 7.jQuery - 插件

### jquery.color.js

> animate不支持颜色的渐变，但是使用了jquery.color.js后，就可以支持颜色的渐变了

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title></title>
  <style>
    #box {
        width:100px;
        height:100px;
        background-color:red;
        cursor:pointer;
    }
  </style>
</head>
<body>
  <div class="box" id="box"></div>
  <script type="text/javascript" src="/js/jquery-1.8.3.min.js"></script>
  <script type="text/javascript" src="/js/jquery.color.js"></script>
  <script type="text/javascript">
      $(document).ready(function () {
          $("#box").mouseenter(function () {
              $(this).stop(true, true).animate({ "backgroundColor": 'blue' }, 5400, function () {
                  $(this).animate({ "backgroundColor": 'red' }, 5400);
              });
          });
      });
  </script>
</body>
</html>
```

支持的其他属性如下
backgroundColor, borderBottomColor, borderLeftColor, borderRightColor, borderTopColor, color, columnRuleColor, outlineColor, textDecorationColor, textEmphasisColor

### jquery.lazyload.js

> 用于长页面图片的延迟加载，视口外的图片会在窗口滚动到它的位置时再进行加载，这是与预加载相反的。

1.将图片路径写入data-original属性
2.给lazyload的图片增加一个名为lazy的class
3.选择所有要lazyload的图片（img.lazy），执行lazyload();

```html
<img class="lazy" data-original="img/example.jpg" style="margin-top:1000px" height="200">
<script>
    $(function(){
        $("img.lazy").lazyload();
    });
</script>
<!-- 必须设置图片的高度或者宽度，否则插件可能无法正常工作 -->
```

lazyload默认是当滚动到该图片位置时，加载该图片。但是可以通过设置Threshold参数来实现滚到距离其xx px时就加载。

```js
$(function(){
    $("img.lazy").lazyload({
        threshold :20
    });
})
```

### jquery.ui.js

> jQueryUI专指由jQuery官方维护的UI方向的插件。

`http://www.runoob.com/jqueryui/jqueryui-tutorial.html`

### jquery.qrcode.js

```js
//生成100*100(宽度100，高度100)的二维码
$('#qrcode').qrcode({
    render: "canvas", //也可以替换为table
    width: 100,
    height: 100,
    foreground: "#C00",
    background: "#FFF",
    text: "http://www.jq22.com"
});
$("#output").qrcode(encodeURI("http://中文中文"));//使用encodeURI进行转码
```
