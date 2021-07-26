# css

## css禁用鼠标事件

```css
.disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
}
```

## 浏览器的兼容性

- png24位的图片在iE6浏览器上出现背景，解决方案是做成PNG8.

- 浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一。

- IE6双边距bug:块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大。 浮动ie产生的双倍距离 #box{ float:left; width:10px; margin:0 0 0 100px;} 这种情况之下IE会产生20px的距离，解决方案是在float的标签样式控制中加入 ——_display:inline;将其转化为行内属性。(_这个符号只有ie6会识别) 渐进识别的方式，从总体中逐渐排除局部。 首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来。 接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。 css     .bb{         background-color:red;/所有识别/       background-color:#00deff\9; /IE6、7、8识别/       +background-color:#a200ff;/IE6、7识别/       _background-color:#1e0bd1;/IE6识别/     }

- IE下,可以使用获取常规属性的方法来获取自定义属性,      也可以使用getAttribute()获取自定义属性;      Firefox下,只能使用getAttribute()获取自定义属性。      解决方法:统一通过getAttribute()获取自定义属性。  

- IE下,even对象有x,y属性,但是没有pageX,pageY属性;      Firefox下,event对象有pageX,pageY属性,但是没有x,y属性。  

- 解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。  

- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,      可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

- 超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序:   L-V-H-A :  a:link {} a:visited {} a:hover {} a:active {}
