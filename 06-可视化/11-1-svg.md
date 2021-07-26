# svg

```html
<svg width="500" height="500" style="background-color: #efefef;">
  ....
</svg>
```

## SVG 形状

### 矩形 `<rect>`

rx 和 ry 属性可使矩形产生圆角。

```html
<svg width="500" height="500" style="background-color: #efefef;">
  <rect
    x="50"
    y="100"
    width="100"
    height="50"
    rx="20"
    ry="20"
    style="fill: none;"
    stroke="blue"
    stroke-width="5"
  />
</svg>
```

### 圆形 `<circle>`

```html
<svg width="500" height="500" style="background-color: #efefef;">
  <circle cx="200" cy="200" r="100" style="fill: orchid;" />
</svg>
```

### 椭圆 `<ellipse>`

```html
<svg width="500" height="500" style="background-color: #efefef;">
  <ellipse
    cx="200"
    cy="200"
    rx="50"
    ry="100"
    style="fill: orange;stroke: orangered;stroke-width: 5px;"
  />
</svg>
```

### 线 `<line>`

```html
<svg width="500" height="500" style="background-color: #efefef;">
  <line x1="50" y1="50" x2="450" y2="450" stroke="blue" stroke-width="5" />
</svg>
```

### 折线 `<polyline>`

```html
<svg width="500" height="500" style="background-color: #efefef;">
  <polyline
    points="0,0 0,20 20,20 20,40 40,40 40,60"
    style="fill:white; stroke:red; stroke-width:2"
  />
</svg>
```

### 多边形 `<polygon>`

```html
<svg width="500" height="500" style="background-color: #efefef;">
  <polygon
    points="220,100 300,210 170,250"
    style="fill:#cccccc; stroke:#000000; stroke-width:1"
  />
</svg>
```

### 路径 `<path>`

- M = moveto
- L = lineto
- H = horizontal lineto
- V = vertical lineto
- C = curveto
- S = smooth curveto
- Q = quadratic Belzier curve
- T = smooth quadratic Belzier curveto
- A = elliptical Arc
- Z = closepath

注释：以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。

```html
<svg width="500" height="500" style="background-color: #efefef;">
  <path d="M250 150 L150 350 L350 350 Z" />
</svg>
```

定义了一条路径，它开始于位置 250 150，到达位置 150 350，然后从那里开始到 350 350，最后在 250 150 关闭路径。

### 文本 `<text>`

```html
<svg width="500" height="500" style="background-color: #efefef;">
  <text
    x="10"
    y="20"
    style="font-family: Times New Roman;font-size: 24;stroke: #00ff00;fill: #0000ff;"
  >
    SVG text styling
  </text>
</svg>
```

## SVG 滤镜

## SVG 渐变
