# 01-HTML总结

## 1.浏览器引擎

Chrome&Opera：blink
IE：trident
safari：webkit
Firefox：gecko
edge：blink

## 2.标签

### 1. 文本

```html
  <font>文本</font>
  <b>加粗</b> <strong>加粗</strong>
  <i>倾斜</i> <em>倾斜</em>
  <s>删除线</s> <del>删除线</del>
  <u>下划线</u> <ins>下划线</ins>
  <code>代码</code>
  <sup>上标</sup>  <sub>下标</sub>
```

### 2. 特殊字符

```html
&nbsp;空格 &lt;小于 &gt;大于 &amp; 和&符号 &yen;人民币 &copy;版权 &reg;注册商标
&deg;摄氏度 &plusmn;正负号 &times;乘 &divide;除 &sup2;平方 &sup3;立方
&quot;" &lquot; “ &rquot; ” &apos; '
```

### 3. 其余标签

```html
<base href='' target='_blank'>单标签写在head中，规定页面的所有链接的基础部分
<dl><dt></dt><dd></dd><dd></dd></dl> 自定义列表dl 小标题dt 解释标题dd
<embed src='' hidden='true'></embed> 定义嵌入的内容 如插件 音乐(hidden隐藏播放按钮)
<marquee behavior="slide" direction="up">滚动的内容</marquee>
<link style="stylesheet" href="1.css">连接外部样式表
<link rel="icon" href="favicon.ico">设置icon图标
<input type="image" src=''>图片按钮，可以进行表单提交
<fieldset><legend>分组名称</legend><input ></fieldset>对表单信息进行分组
```

### 4. meta标签

必有content(必和name或http-equive一起用)属性,可选name,http-equiv,scheme
  
```html
<meta http-equive="Content-Type" content="text/html; charset=utf-8">指定编码
<meta name="keyword" content="java培训,ui培训,php培训">关键字
<meta name="description" content="">网页描述
<meta http-equiv="refresh" content="5；http://www.baidu.com">重定向
```
