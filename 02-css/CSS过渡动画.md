# CSS 过渡动画

## 1.过渡动画（transition）

- transition-property
  none
  all
  指定样式属性
- transition-duration
- transition-timing-function
  ease 规定慢速开始，然后变快，然后慢速结束的过渡效果
  linear 规定以相同速度开始至结束的过渡效果
  ease-in 规定以慢速开始的过渡效果
  ease-out 规定以慢速结束的过渡效果
  ease-in-out 规定以慢速开始和结束的过渡效果
  cubic-bezier
  （该值允许你去自定义一个时间曲线）， 特定的 cubic-bezier 曲线。 (x1, y1, x2, y2)四个值特定于曲线上点 P1 和点 P2。所有值需在[0, 1]区域内，否则无效。
  其是 cubic-bezier 为通过贝赛尔曲线来计算“转换”过程中的属性值，如下曲线所示，通过改变 P1(x1, y1)和 P2(x2, y2)的坐标可以改变整个过程的 Output Percentage。初始默认值为 default.
  [获取贝塞尔方法工具](http://cubic-bezier.com/)
- transition-delay
- transition 简写
  transition(css 属性 动画时间 过渡方式 延时时长)
  我可以直接使用 transition 来简写，有两种形式的简写。第一种是，每个样式单独声 明；第二种是不去考虑样式，即使用 all 全部声明。 //单独声明
  `transition: background-color 1s ease 0s, color 1s ease 0s, margin-left 1s ease 0s;`
  //如果每个样式都是统一的，直接使用 all
  `transition: all 1s ease 0s;`

## 2.动画（animation ）

1. animation 与关键帧

   - animation 属性
     animation: name duration timing-function delay iteration-count direction;
     animation-name 规定需要绑定到选择器的 keyframe 名称。。
     animation-duration 规定完成动画所花费的时间，以秒或毫秒计。
     animation-timing-function 规定动画的速度曲线。
     ease
     linear
     ease-in
     ease-out
     ease-in-out
     animation-delay 规定在动画开始之前的延迟。
     animation-iteration-count 规定动画应该播放的次数。
     animation-direction 规定是否应该轮流反向播放动画。
     normal
     alternate 一次前一次后交替效果
     animation-fill-mode 结束后不返回
     forwards 结束停留在最后一帧
     none
   - 关键帧 @keyframes

     ```css
     @keyframes myani {
       0% {
         background-color: white;
         margin-left: 0px;
       }
       50% {
         background-color: black;
         margin-left: 100px;
       }
       100% {
         background-color: white;
         margin-left: 0px;
       }
     }
     /* 重复 */
     @keyframes myani {
       0%,
       100% {
         background-color: white;
         margin-left: 0px;
       }
       50% {
         background-color: black;
         margin-left: 100px;
       }
     }
     ```

2. animate css 插件的使用
   1、首先引入 animate css 文件
   `<link rel="stylesheet" href="animate.min.css">`
   2、给指定的元素加上指定的动画样式名
   `<div class="animated bounceOutLeft"></div>`
   这里包括两个 class 名，第一个是基本的，必须添加的样式名，任何想实现的元素都得添加这个。第二个是指定的动画样式名。
   3、如果说想给某个元素动态添加动画样式，可以通过 jquery 来实现：
   `$('#yourElement').addClass('animated bounceOutLeft');`
