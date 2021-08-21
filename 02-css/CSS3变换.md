# CSS3 变换

transform

1. transform-origin 转换原点
   ransform-origin 属性用来指定元素的转换原点位置
   默认情况下，转换的原点在元素的中心点或者是 X 轴和 Y 轴的 50% 处
   transform-origin : 数值/百分比/关键字;
   两个值：表示 X 轴和 Y 轴
   三个值：表示 X 轴、Y 轴和 Z 轴

   ```css
   #d1 {
     transform: rotate(90deg) scale(0.5);
     transform-origin: right top;
   }
   #d2 {
     transform: rotate(90deg) scale(0.8);
     transform-origin: 100% 100%;
   }
   ```

2. translate 位移
   translate() 方法将元素从其当前位置移动移动到 x 坐标和 y 坐标位置参数
   translate(x) 或者 translate(x,y)
   可取值数值、百分比也可以是负值也可以使用单向位移函数
   translateX(x)
   translateY(y)

3. scale 缩放
   scale() 方法用于改变元素的尺寸
   根据给定的宽度（X 轴）和高度（Y 轴）
   scale(x) 或者 scale(x,y)
   一个参数时，第二个参数默认与第一个值相等
   可取值
   默认值为 1
   缩小：0 到 1 之间的数值
   放大：大于 1 的数值
   也可以使用单向缩放函数
   scaleX(x)
   scaleY(y)

   ```css
   #imgs::before {
     top: 0;
     bottom: 49%;
     transform: scaleY(-1);
   }
   #imgs::after {
     top: 49%;
     bottom: 0;
   }
   ```

4. Rotate 旋转
   rotate() 方法用于旋转元素
   根据原点，将元素按照顺时针旋转给定的角度 允许负值，元素将逆时针旋转
   rotate(deg)

   ```css
   div {
     width: 150px;
     height: 150px;
     border: 1px solid black;
   }
   #d1 {
     transform: rotate(45deg);
     background-color: #ccc;
   }
   #d2 {
     transform: rotate(-45deg);
     transform-origin: right top;
     background-color: #ccc;
   }
   ```

   - rotateY
     3D 旋转
   - perspective 透镜
     父级元素的透镜

     ```html
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <title>Title</title>
         <style>
           #div0 {
             width: 400px;
             height: 400px;
             perspective: 500px;
           }
           #div0 div {
             width: 200px;
             height: 200px;
             background-color: chartreuse;
             transition: all 1s;
             margin: auto;
           }
           #div0 div:hover {
             transform: rotateY(30deg);
             transition: all 1s;
           }
         </style>
       </head>
       <body>
         <div id="div0">
           <div></div>
         </div>
       </body>
     </html>
     ```

5. Skew 倾斜（skewX，skewY)
   skew() 方法用于让元素倾斜
   以原点位置，围绕 X 轴和 Y 轴按照一定的角度倾斜 可能会改变元素的形状
   skew(x) 或者 skew(x,y)，取值为角度 也可以使用单向倾斜函数
   skewX(x)
   skewY(y)

   ```css
   div {
     width: 150px;
     height: 150px;
     border: 1px solid black;
   }
   #d1 {
     transform: skewX(45deg);
     background-color: #ccc;
   }
   #d2 {
     transform: skewY(45deg);
     transform-origin: right top;
     background-color: #ccc;
   }
   ```

6. 立方体

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <meta http-equiv="X-UA-Compatible" content="ie=edge" />
       <title>Cube</title>
       <style>
         img {
           width: 200px;
           height: 200px;
         }
         #box {
           perspective: 800px;
           transform-style: preserve-3d;
           transition: 5s infinite;
           transform: rotateX(0deg) rotateY(0deg);
         }
         .cube_box {
           width: 200px;
           height: 200px;
           margin: 100px auto;
           position: relative;
           transform-style: preserve-3d;
           transition: 50s;
           transform: rotateX(0deg) rotateY(0deg);
         }
         .cube_box:hover {
           transform: rotateX(3600deg) rotateY(3600deg);
         }
         .cube {
           width: 200px;
           height: 200px;
           text-align: center;
           line-height: 200px;
           position: absolute;
         }
         /*原来这六个面的div是叠加在一起的通过旋转 移动来让他们形成正方体*/
         .left {
           transform: rotateY(90deg) translateZ(-100px);
         }
         .right {
           transform: rotateY(90deg) translateZ(100px);
         }
         .top {
           transform: rotateX(90deg) translateZ(100px) rotateZ(360deg);
         }
         .buttom {
           transform: rotateX(90deg) translateZ(-100px) rotateZ(180deg);
         }
         .back {
           transform: rotateX(0deg) translateZ(-100px) rotateZ(180deg);
         }
         .front {
           transform: rotateX(0deg) translateZ(100px);
         }
       </style>
     </head>
     <body style="background-color:#23d19d">
       <div id="box">
         <div class="cube_box" id="cube_box">
           <div class="cube front"><img src="images/img1.jpeg" /></div>
           <div class="cube back"><img src="images/img2.jpeg" /></div>
           <div class="cube left"><img src="images/img3.jpeg" /></div>
           <div class="cube right"><img src="images/img4.jpeg" /></div>
           <div class="cube top"><img src="images/img5.jpeg" /></div>
           <div class="cube buttom"><img src="images/img6.jpeg" /></div>
         </div>
       </div>
       <script type="text/javascript" src="js/index02.js"></script>
     </body>
   </html>
   ```
