# sass

## 安装

- ruby
    sass基于Ruby语言开发而成，因此安装sass前需要安装Ruby
    安装过程中请注意勾选Add Ruby executables to your PATH添加到系统环境变量。
    brew install ruby
- SASS安装
    sudo gem install sass
    sudo gem install compass
- SASS转换CSS
    单文件  sass input.scss output.css
    多文件  sass --watch assets/sass:dist/sass

## sass和scss

- sass
  Sass 是一门高于 CSS 的元语言，它能用来清晰地、结构化地描述文件样式，有着比普通 CSS 更加强大的功能
  扩展名是.sass
  书写：

  ```scss
  $color:red
  div
  :color $color
  span
      color: $color
  ```

  这两种写法都是可以的，但是注意不能使用{}和；
  :color $color  指出该样式是这个元素的
  color: $color 普通css写法
- scss
  Scss 是 Sass 3 引入新的语法，是Sassy CSS的简写，是CSS3语法的超集，也就是说所有有效的CSS3样式也同样适合于Sass
  扩展名是.scss
  书写

  ```scss
  $color:red;
  div{
      color: $color;
  }
  span{
      color: $color;
  }
  ```

  贴近于CSS的写法

- Scss就是Sass的升级版

## 变量的声明

```scss
$color:red;
$width:300;
div{
    color: $color;
    width: $width+px;
}
span{
    color: $color;
}
```

## 选择器的嵌套

```scss
$color_1:red;
$color_2:blue;
div{
    span{color: $color_1}
    div{color: $color_2}
}
```

- 父选择器

  ```scss
  span{
      color: red;
      &:hover{
          color: blue;
      }
  }
  ```

  这里的&就是span自身这个选择器给它自己加了hover

- 各种选择器的嵌套

```scss
  article {
      ~ article { border-top: 1px dashed #ccc }
      > section { background: #eee }
      dl > {
          dt { color: #333 }
          dd { color: #555 }
      }
      nav + & { margin-top: 0 }
  }
```

## 属性嵌套

```scss
nav {
    border: {
        style: solid;
        width: 1px;
        color: #ccc;
    }
}
```

这是嵌套了属性，border-style被拆分

## 导入文件

```scss
$r:50px;
div{
    width: $r;
    height: $r;
    border-radius: $r/2;
}
// 上面这个文件起名叫 a.scss
// 在main.scss中如下写入
@import "a";
div{
    span {color: red}
    & {@import "a";}
}
```

这里导入以后就会有把a中的定义内容导入
如果写在标签中，那么导入的内容将会作为这个标签的后代元素样式进入

## 混合器

- 普通类型混合器

  ```scss
  $r:50px;
  @mixin divRadius{
      width: $r;
      height: $r;
      border-radius: $r/2;
  }
  div{
      @include divRadius;
  }
  ```

  这里的@mixin定义语句块，@include调用语句块

- 传参混合器

  ```scss
  @mixin divRadius($r){
      width: $r;
      height: $r;
      border-radius: $r/2;
  }
  div{
      @include divRadius(50px);
      div{
          @include divRadius(25px)
      }
  }
  ```

- 混合器传参的默认值

  ```scss
  @mixin divRadius($r:100px){
      width: $r;
      height: $r;
      border-radius: $r/2;
  }
  div{
      @include divRadius;
      div{
          @include divRadius(50px)
      }
  }
  ```

## 继承

  ```scss
  .div0 {
      $r:100px;
      width: $r;
      height: $r;
      border-radius: $r/2;
  }
  div{
      div{
          @extend .div0;
      }
  }
  ```

这里使用@extend 继承了类div0的样式

## 控制指令

### `@if`

当 @if 的表达式返回值不是 false 或者 null 时，条件成立，输出 {} 内的代码：

```scss
p {
  @if 1 + 1 == 2 { border: 1px solid; }
  @if 5 < 3 { border: 2px dotted; }
  @if null  { border: 3px double; }
}
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

### @for

`@for` 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。这个指令包含两种格式：`@for $var from <start> through <end>`，或者 `@for $var from <start> to <end>`，区别在于 `through` 与 `to` 的含义：当使用 `through` 时，条件范围包含 `<start>` 与 `<end>` 的值，而使用 `to` 时条件范围只包含 `<start>` 的值不包含 `<end>` 的值。另外，`$var` 可以是任何变量，比如 `$i`；`<start>` 和 `<end>` 必须是整数值。

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

### @each

`@each` 指令的格式是 `$var in <list>`, `$var` 可以是任何变量名，比如 `$length` 或者 `$name`，而 `<list>` 是一连串的值，也就是值列表。

`@each` 将变量 `$var` 作用于值列表中的每一个项目，然后输出结果，例如：

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```
