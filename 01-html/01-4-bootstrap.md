# 响应式开发

`<link rel="stylesheet" href="http://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">`

`<script src="http://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>`

`<script src="http://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>`

## 1.响应式网页

> 一个网页随浏览设备不同自动改变布局

### 1.网页布局方式

1.固定宽度布局：为网页设置一个固定的宽度，通常以px做为长度单位，常见于PC端网页。

2.流式布局：为网页设置一个相对的宽度，通常以百分比做为长度单位。

3.栅格化布局：将网页宽度人为的划分成均等的长度，然后排版布局时则以这些均等的长度做为度量单位，通常利用百分比做为长度单位来划分成均等的长度。

4.响应式布局：通过检测设备信息，决定网页布局方式，即用户如果采用不同的设备访问同一个网页，有可能会看到不一样的内容，一般情况下是检测设备屏幕的宽度来实现。

注：以上几种布局方式并不是独立存在的，实际开发过程中往往是相互结合使用的。

### 2.使用bootstrap框架

```html
<!DOCTYPE html>
<html>
   <head>
      <title>Bootstrap 模板</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- viewport  视口 -->
      <!-- 引入 Bootstrap -->
      <link href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
      <!-- HTML5 Shiv 和 Respond.js 用于让 IE8 支持 HTML5元素和媒体查询 -->
      <!-- 注意： 如果通过 file://  引入 Respond.js 文件，则该文件无法起效果 -->
      <!--[if lt IE 9]>
         <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
         <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
      <![endif]-->
   </head>
   <body>
      <h1>Hello, world!</h1>
      <!-- jQuery (Bootstrap 的 JavaScript 插件需要引入 jQuery) -->
      <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
      <!-- 包括所有已编译的插件 -->
      <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
   </body>
</html>
```

## 2.媒体查询

媒体:指浏览网页设备(screen(pc/pad/phone);print;tv...)

媒体查询:查询当前浏览网页设备特性(尺寸/手持方向)

兼容性:IE9 Chrome21

实现

```css
/* 语法 */
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
/* 实例 */
.example {
    padding: 20px;
    color: white;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .example {background: red;}
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .example {background: green;}
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .example {background: blue;}
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .example {background: orange;}
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .example {background: pink;}
}
```

## 3.全局样式

### 3.1按钮

```css
.btn/*  按钮基本样式 */
.btn-default/*  默认/标准按钮 */
.btn-danger/warning/success/info/primary/*  危险/警告/成功/信息/原始样式按钮 */
.btn-lg/.btn-sm/.btn-xs/*  大/小/超小按钮 */
.btn-block/*  块级按钮(拉伸至父元素100%宽度) */
<button type="button" class="btn btn-default btn-lg active">激活按钮</button>
<a href="#" class="btn btn-primary btn-lg disabled" role="button">禁用的原始链接</a>
/* 可以在 <a>、<button> 或 <input> 元素上使用按钮 class。但是建议您在 <button> 元素上使用按钮 class，避免跨浏览器的不一致性问题 */
```

![按钮1](http://www.runoob.com/wp-content/uploads/2014/06/buttonoptions_demo.jpg)

![按钮2](http://www.runoob.com/wp-content/uploads/2014/06/buttonsize_demo.jpg)

![按钮3](http://www.runoob.com/wp-content/uploads/2014/06/buttondisabledstate_demo.jpg)

### 3.2图片

```css
.img-rounded/* 为图片添加圆角 (IE8 不支持) */
.img-circle/* 将图片变为圆形 (IE8 不支持) */
.img-thumbnail/* 缩略图功能 */
.img-responsive/* 图片响应式 (将很好地扩展到父元素) */
/* .img-responsive 类将 max-width: 100%; 和 height: auto; 样式应用在图片上： */
```

![图片](http://www.runoob.com/wp-content/uploads/2014/06/image_demo.jpg)

### 3.3辅助类

```css
/* 不同的文本颜色 褐色(#a94442)/黄色(#8a6d3b)/浅蓝色(#31708f)/浅绿色(#3c763d)/蓝色(#428bca)/浅灰色(#999) */
.text-danger/warning/info/success/primary/muted
.bg-danger/.../* 不同的背景颜色 */
.text-left/center/right/justify/* 不同的文本对齐方式 */
.text-uppercase/lowercase/capitalize/* 不同的大小写转换 大写/小写/首字母大写 */
.pull-left/pull-right/clearfix/* 元素浮动到左边/右边/清除浮动 */
.show/hidden/* 强制元素显示/隐藏 */
.close/caret/* 关闭按钮/下拉功能 */
<p>插入符实例
  <span class="caret"></span>
</p>
.center-block/* 任意元素居中显示 */
.text-hide/* 将元素的文本内容替换为一张背景图 */
```

### 3.4表格

```css
.table/* 为任意 <table> 添加基本样式 (只有横向分隔线) */
.table-bordered/* 为所有表格的单元格添加边框 */
.table-hover/* 在 <tbody> 内的任一行启用鼠标悬停状态 */
.table-striped/* 在 <tbody> 内添加斑马线形式的条纹 ( IE8 不支持) */
.table-condensed/* 让表格更加紧凑*/
.table-responsive/* 响应式表格为任意table的父元素div样式 */
```

### 3.5栅格

div.container

div.row

.container > .row > .col

bootstrap 每行均分12等分

针对不屏幕设宽度占比   .col-lg-1/2.3/12 .col-md-1..  .col-sm-1  .col-xs-1.1

列适用性.col-xs-6     sm-6/md-6/lg-6

偏移列:大屏显示器 `.col-lg-offset-*` `.col-md-offset-*`

一个列可以指定在不同屏幕下宽度占比div.col-xs-12 .col-sm-6 .col-md-3

列隐藏.hidden-xs  .hidden-sm

嵌套.container > .row >.col > .row >.col

```html
<!-- 基本网格结构 -->
<div class="container">
   <div class="row">
      <div class="col-*-*"></div>
      <div class="col-*-*"></div>
   </div>
   <div class="row">...</div>
</div>
```

### 3.6居中

```css
class="text-center"/* 文本居中 */
class="center-block"/* 图片居中 */
/* 其他元素居中 */
/* bootstrap3水平居中:列偏移 */
class="col-md-6 col-md-offset-3"
/* 设定目标所占列数为6,偏移数3,即以363来展示,实现居中 */
class="m-auto"/* bootstrap4水平居中 */
```

### 3.7列表

```css
/* 这个类仅适用于直接子列表项 (如果需要移除嵌套的列表项，你需要在嵌套的列表中使用该样式) */
.list-unstyled/* 移除默认的列表样式，列表项中左对齐(<ul>和<ol>中). */
.list-inline/* 将所有列表项放置同一行 */
```

## 4.组件

### 4.1图标字体

[字体图标展示](http://www.runoob.com/try/demo_source/bootstrap3-glyph-icons.htm)

`<span class="glyphicon glyphicon-pencil"></span>`

### 4.2进度条

```html
<div class="progress">/* 标准模型 */
    <div class="progress-bar progress-bar-success" role="progressbar"
         aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
         style="width: 90%;">
        <span class="sr-only">90% 完成（成功）</span>
    </div>
</div>
.progress-bar-success/info/warning/danger/* 带颜色 */
.progress-striped/* 带条纹 */
.active/* 使之带有动画感 */
/* 多个进度条放在相同的 .progress 中即可实现堆叠 */
```

### 4.3缩略图

```html
<!-- 在图像周围添加带有 class .thumbnail 的 <a> 标签。 -->
<a href="#" class="thumbnail"><img src="" alt=""></a>
<div class="thumbnail"><!-- 我们可以向缩略图添加各种 HTML 内容，比如标题、段落或按钮 -->
    <img src="/wp-content/uploads/2014/06/kittens.jpg" alt="">
    <div class="caption">
        <h3>缩略图标签</h3>
        <p>一些示例文本。一些示例文本。</p>
        <p>
            <a href="#" class="btn btn-primary" role="button">按钮</a>
            <a href="#" class="btn btn-default" role="button">按钮</a>
        </p>
    </div>
</div>
```

### 4.4多媒体对象

在`<div>`元素上添加 `.media` 类来创建一个多媒体对象

`.media-left/right` 左/右对齐

`media-top/middle/bottom` 置顶/居中/置底

`.media-heading` 类来设置标题

文本内容放在`class="media-body"`的`div`中

```html
<div class="media">
  <div class="media-left media-bottom">
    <img src="img_avatar1.png" class="media-object" style="width:60px">
  </div>
  <div class="media-body">
    <h4 class="media-heading">置底</h4>
    <p>这是一些示例文本...</p>
  </div>
</div>
```

### 4.5面板

基本的面板:只需要向`<div>`元素添加`.panel`或`.panel-default`即可

向面板添加标题容器:`.panel-heading`

添加预定义样式的标题:`.panel-title`class的`<h1>-<h6>`

面板内容:`.panel-body`

面板脚注: `.panel-footer`面版脚注不会从带语境色彩的面板中继承颜色和边框，因为它不是前景中的内容

带语境色彩的面板:panel-primary/success/info/warning/danger

面板可以包含表格 `table.table` 或列表组 `ul.list-group`

```html
<div class="panel panel-default">
    <div class="panel-heading">
        不带 title 的面板标题
        <h3 class="panel-title">
            带有 title 的面板标题
        </h3>
    </div>
    <div class="panel-body">
        面板内容
    </div>
    <div class="panel-footer">面板脚注</div>
</div>
```

### 4.6导航

#### 4.6.1导航元素

标签式的导航菜单：`<ul class="nav nav-tabs"></ul>`

基本的胶囊式的导航菜单:`<ul class="nav nav-pills"></ul>`

垂直的胶囊式导航菜单:`<ul class="nav nav-pills nav-stacked"></ul>`

两端对齐的导航:添加`class="nav-justified"`

禁用:`class="disabled"`

#### 4.6.2下拉菜单

带有下拉菜单的标签:

```html
<ul class="nav nav-tabs">
    <li class="active"><a href="#">Home</a></li>
    <li><a href="#">SVN</a></li>
    <li><a href="#">VB.Net</a></li>
    <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
        Java <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
        <li><a href="#">Swing</a></li>
        <li><a href="#">EJB</a></li>
        <li class="divider"></li>
        <li><a href="#">分离的链接</a></li>
        </ul>
    </li>
    <li><a href="#">PHP</a></li>
</ul>
```

带有下拉菜单的胶囊:把 .nav-tabs class 改为 .nav-pills

#### 4.6.3动态标签

.tab-content与.tab-pane和data-toggle="tab"(data-toggle="pill")一同使用,设置标签页对应的内容随标签的切换而更改

```html
<div class="container">
  <ul class="nav nav-tabs">
    <li class="active"><a data-toggle="tab" href="#home">首页</a></li>
    <li><a data-toggle="tab" href="#menu1">菜单 1</a></li>
  </ul>
  <div class="tab-content">
    <div id="home" class="tab-pane fade in active">
      <h3>首页</h3>
      <p>菜鸟教程 —— 学的不仅是技术，更是梦想！！！</p>
    </div>
    <div id="menu1" class="tab-pane fade">
      <h3>菜单 1</h3>
      <p>这是菜单 1 显示的内容。这是菜单 1 显示的内容。这是菜单 1 显示的内容。</p>
    </div>
  </div>
</div>
```

### 4.7导航栏

#### 4.7.1默认的导航栏

向 `<nav>` 标签添加 class .navbar、.navbar-default。

向上面的元素添加 role="navigation"，有助于增加可访问性。

向`<div>`元素添加一个标题.navbar-header，内部包含了带有.navbar-brand的`<a>`元素。这会让文本看起来更大一号。

为了向导航栏添加链接，只需要简单地添加带有.nav、.navbar-nav的无序列表即可。

```html
<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
    <div class="navbar-header">
        <a class="navbar-brand" href="#">菜鸟教程</a>
    </div>
    <div>
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">iOS</a></li>
            <li><a href="#">SVN</a></li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    Java
                    <b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="#">jmeter</a></li>
                    <li><a href="#">EJB</a></li>
                    <li><a href="#">Jasper Report</a></li>
                    <li class="divider"></li>
                    <li><a href="#">分离的链接</a></li>
                    <li class="divider"></li>
                    <li><a href="#">另一个分离的链接</a></li>
                </ul>
            </li>
        </ul>
    </div>
    </div>
</nav>
```

#### 4.7.2响应式的导航栏

为了给导航栏添加响应式特性，您要折叠的内容必须包裹在带有 class .collapse、.navbar-collapse 的 `<div>` 中。折叠起来的导航栏实际上是一个带有 class .navbar-toggle 及两个 data- 元素的按钮。第一个是 data-toggle，用于告诉 JavaScript 需要对按钮做什么，第二个是 data-target，指示要切换到哪一个元素。三个带有 class .icon-bar 的 `<span>` 创建所谓的汉堡按钮。这些会切换为 .nav-collapse `<div>` 中的元素。为了实现以上这些功能，您必须包含 Bootstrap 折叠（Collapse）插件。

```html
<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse"
                data-target="#example-navbar-collapse">
            <span class="sr-only">切换导航</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">菜鸟教程</a>
    </div>
    <div class="collapse navbar-collapse" id="example-navbar-collapse">
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">iOS</a></li>
            <li><a href="#">SVN</a></li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    Java <b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="#">jmeter</a></li>
                    <li><a href="#">EJB</a></li>
                    <li><a href="#">Jasper Report</a></li>
                    <li class="divider"></li>
                    <li><a href="#">分离的链接</a></li>
                    <li class="divider"></li>
                    <li><a href="#">另一个分离的链接</a></li>
                </ul>
            </li>
        </ul>
    </div>
    </div>
</nav>
```

#### 4.7.3导航栏中的表单

导航栏中的表单不是使用 Bootstrap 表单 章节中所讲到的默认的 class，它是使用 .navbar-form class

```html
<form class="navbar-form navbar-left" role="search">
    <div class="form-group">
        <input type="text" class="form-control" placeholder="Search">
    </div>
    <button type="submit" class="btn btn-default">提交</button>
</form>
```

#### 4.7.4导航栏中的按钮

可以使用.navbar-btn向不在`<form>`中的`<button>`元素添加按钮，按钮在导航栏上垂直居中。.navbar-btn可被使用在`<a>`和`<input>`元素上。

不要在.navbar-nav内的`<a>`元素上使用.navbar-btn，因为它不是标准的button class

```html
<button type="button" class="btn btn-default navbar-btn">
    导航栏按钮
</button>
```

#### 4.7.5导航栏中的文本

如果需要在导航中包含文本字符串，请使用.navbar-text。这通常与`<p>`标签一起使用，确保适当的前导和颜色

```html
<div>
    <p class="navbar-text">Runoob 用户登录</p>
</div>
```

#### 4.7.6其他导航栏设置

可以使用实用工具 class .navbar-left 或 .navbar-right 向左或向右对齐导航栏中的 导航链接、表单、按钮或文本 这些组件

如果您想在常规的导航栏导航组件内使用图标，那么请使用 class glyphicon glyphicon-* 来设置图标

想要让导航栏固定在页面的顶部，请向 .navbar class 添加 class .navbar-fixed-top

为了防止导航栏与页面主体中的其他内容的顶部相交错，请向`<body`>`标签添加至少50像素的内边距（padding），内边距的值可以根据您的需要进行设置。

如果您想要让导航栏固定在页面的底部，请向 .navbar class 添加 class .navbar-fixed-bottom

如需创建能随着页面一起滚动的导航栏，请添加.navbar-static-top。该 class不要求向`<body>`添加内边距（padding）。

为了创建一个带有黑色背景白色文本的反色的导航栏，只需要简单地向.navbar添加.navbar-inverse即可

为了防止导航栏与页面主体中的其他内容的顶部相交错，请向`<body>`标签添加至少50像素的内边距（padding），内边距的值可以根据您的需要进行设置

### 4.8小组件

#### 4.8.1面包屑导航

表示当前页面在导航层次结构内的位置。

```html
<ul class="breadcrumb">
    <li><a href="#">Home</a></li>
    <li><a href="#">2013</a></li>
    <li class="active">十一月</li>
</ul>
```

#### 4.8.2分页条

默认:ul.pagination

分页状态:.active .disabled

分页大小:.pagination-lg/sm

```html
<ul class="pagination pagination-lg">
    <li><a href="#">&laquo;</a></li>
    <li><a href="#">1</a></li>
    <li><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">&raquo;</a></li>
</ul>
```

#### 4.8.3徽章

徽章（Badges）主要用于突出显示新的或未读的项。如需使用徽章，只需要把 `<span class="badge">` 添加到链接、Bootstrap 导航等这些元素上即可。

没有新的或未读的项时，通过 CSS 的 :empty 选择器，徽章会折叠起来，表示里边没有内容

可以在激活状态的胶囊式导航和列表导航中放置徽章。通过使用 `<span class="badge">` 来激活链接

```html
<ul class="nav nav-pills">
    <li class="active"><a href="#">首页<span class="badge">42</span></a></li>
    <li><a href="#">简介</a></li>
    <li><a href="#">消息<span class="badge">3</span></a></li>
</ul>
```

#### 4.8.4超大屏幕

该组件可以增加标题的大小，并为登陆页面内容添加更多的外边距（margin）

为了获得占用全部宽度且不带圆角的超大屏幕，请在所有的 .container class 外使用 .jumbotron class

div.jumbotron 也可作为div.container的子元素

```html
<div class="jumbotron">
    <div class="container">
        <h1>欢迎登陆页面！</h1>
        <p>这是一个超大屏幕（Jumbotron）的实例。</p>
        <p><a class="btn btn-primary btn-lg" role="button">
         学习更多</a>
        </p>
    </div>
</div>
```

#### 4.8.5水井(well)

Well 是一种会引起内容凹陷显示或插图效果的容器`<div>`

可以使用可选类 well-lg 或 well-sm 来改变 Well 的尺寸大小

```html
<div class="well well-lg">您好，我在大的 Well 中！</div>
<div class="well well-sm">您好，我在小的 Well 中！</div>
```

## 5.js插件

### 5.1弹出框

```html
<div class="container" style="padding: 100px 50px 10px;" >
    <button type="button" class="btn btn-default" title="Popover title"
            data-container="body" data-toggle="popover" data-placement="left"
            data-content="左侧的 Popover 中的一些内容">
        左侧的 Popover
    </button>
    <button type="button" class="btn btn-primary" title="Popover title"
            data-container="body" data-toggle="popover" data-placement="top"
            data-content="顶部的 Popover 中的一些内容">
        顶部的 Popover
    </button>
    <button type="button" class="btn btn-success" title="Popover title"
            data-container="body" data-toggle="popover" data-placement="bottom"
            data-content="底部的 Popover 中的一些内容">
        底部的 Popover
    </button>
    <button type="button" class="btn btn-warning" title="Popover title"
            data-container="body" data-toggle="popover" data-placement="right"
            data-content="右侧的 Popover 中的一些内容">
        右侧的 Popover
    </button>
</div>
```

选项名称|类型/默认值|Data 属性名称|描述
:---|:---|:---|:---
animation|boolean 默认值：true|data-animation|向弹出框应用 CSS 褪色过渡效果。
html|boolean 默认值：false|data-html|向弹出框插入 HTML。如果为 false，jQuery 的 text 方法将被用于向 dom 插入内容。如果您担心 XSS 攻击，请使用 text。
placement|string\|function 默认值：top|data-placement|规定如何定位弹出框（即 top\|bottom\|left\|right\|auto）。当指定为 auto 时，会动态调整弹出框。例如，如果 placement 是 "auto left"，弹出框将会尽可能显示在左边，在情况不允许的情况下它才会显示在右边。
selector|string 默认值：false|data-selector|如果提供了一个选择器，弹出框对象将被委派到指定的目标。
title|string \| function 默认值：''|data-title|如果未指定 title 属性，则 title 选项是默认的 title 值。
trigger|string 默认值：'hover focus'|data-trigger|定义如何触发弹出框： click\| hover \| focus \| manual。您可以传递多个触发器，每个触发器之间用空格分隔。
delay|number \| object  默认值：0|data-delay|延迟显示和隐藏弹出框的毫秒数 - 对 manual 手动触发类型不适用。如果提供的是一个数字，那么延迟将会应用于显示和隐藏。如果提供的是对象，结构如下所示：delay:{ show: 500, hide: 100 }
container|string \| false  默认值：false|data-container|向指定元素追加弹出框。实例： container: 'body'

### 5.2轮播

```html
<div id="myCarousel" class="carousel slide">
    <!-- 轮播（Carousel）指标 -->
    <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>
    <!-- 轮播（Carousel）项目 -->
    <div class="carousel-inner">
        <div class="item active">
        <!--&lt;!&ndash;移动端&ndash;&gt;
        <a href="javascript:;" class="mobileImg">
            <img src="./images/slide_01_640x340.jpg" alt="...">
        </a>
        &lt;!&ndash;非移动端&ndash;&gt;
        <a href="javascript:;" class="pcImg" style="background-image: url('./images/slide_01_2000x410.jpg');"></a>-->
        <!-- .pcImg{width: 100%;height: 410px;display: block;background-position: center center;background-size: cover;}
        .mobileImg{width: 100%;display: block;}
        .mobileImg > img{width: 100%;display: block;} -->
        <!-- cover与contain区别 图片宽高比均不变 但是cover会裁剪图片适应容器contain不会裁剪图片会有白边 -->
            <img src="/wp-content/uploads/2014/07/slide1.png" alt="First slide">
            <div class="carousel-caption">标题 1</div>
        </div>
        <div class="item">
            <img src="/wp-content/uploads/2014/07/slide2.png" alt="Second slide">
            <div class="carousel-caption">标题 2</div>
        </div>
        <div class="item">
            <img src="/wp-content/uploads/2014/07/slide3.png" alt="Third slide">
            <div class="carousel-caption">标题 3</div>
        </div>
    </div>
    <!-- 轮播（Carousel）导航 -->
    <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>
```

选项名称|类型/默认值|Data 属性名称|描述
:---|:---|:---|:---
interval|number默认值：5000|data-interval|自动循环每个项目之间延迟的时间量。如果为 false，轮播将不会自动循环。
pause|string默认值："hover"|data-pause|鼠标进入时暂停轮播循环，鼠标离开时恢复轮播循环。
wrap|boolean默认值：true|data-wrap|轮播是否连续循环。

### 5.3附加导航(Affix)

>附加导航（Affix）插件允许指定 `<div>` 固定在页面的某个位置。一个常见的例子是社交图标。它们将在某个位置开始，但当页面点击某个标记，该 `<div>` 会锁定在某个位置，不会随着页面其他部分一起滚动。

## 6.less动态样式语言

>less 动态样式语言(Sass/Stylus/Less)浏览器只能识别css静态样式语言, less编译成css

### 1. less支持所有css语法

### 2.注释

单行
    //...

多行
    /*..*/

### 3.变量

定义
    @变量名:值

使用
    color:@变量名

### 4.运算符

`+ - * / %`

### 5.混入

.选择器1{...}
.选择器2{...选择器1...}

### 6.带参数混入

.选择器1(@变量,@变量)
.选择器2{..选择器1(值1,值2)}

### 7.嵌入

.选择器1{
    .选择器2{}
}

### 8.less提供几十个内嵌函数

ceil()
floor()
darken()

### 9.引入  

01.less
02.less
    import "01.less"
