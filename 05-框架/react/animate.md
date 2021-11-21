# animate

```jsx
import { CSSTransition } from 'react-transition-group'
import React, { Component } from 'react'
export default class Animate extends Component {
  state = {
    isShow: false
  }
  render() {
    return (
      <CSSTransition
        appear
        in={this.state.isShow} // // 如果this.state.show从false变为true，则动画入场，反之out出场
        timeout={2000} // 动画执行2秒
        classNames={'my-node'} // 自定义的class名
        // unMountOnExit //可选，当动画出场后在页面上移除包裹的dom节点
        onEntered={(el) => {
          el.style.fontSize = '40px' // 可选，动画入场之后的回调，el指被包裹的dom，让div内的字体大小变为40px
        }}
        onExited={() => {
          xxxxx   //同理，动画出场之后的回调，也可以在这里来个setState啥的操作
        }}
      >
        <div id="ani">
          animate
        </div>
      </CSSTransition>
      <div>
        <button onClick={this.handleClick}>click</button>
      </div>
    )
  }
  handleClick = () => {
    this.setState({
      isShow: !this.state.isShow
    })
  }
}
```

```css
.my-node-appear .my-node-enter {
  opacity: 0;
  /* enter是入场前的刹那（点击按钮），appear指页面第一次加载前的一刹那（自动） */
}
/* enter-active指入场后到入场结束的过程，appear-active则是页面第一次加载自动执行 */
.my-node-appear-active {
  opacity: 1;
  font-size: 90px;
  transition: all 2s;
}
.my-node-enter-active {
  opacity: 1;
  transition: opacity 2s;
}
/* 入场动画执行完毕后，保持状态 */
.my-node-enter-done {
  opacity: 1;
}
/* 出场动画执行完毕后，保持状态 */
.my-node-exit-done {
  opacity: 0;
}
/* exit是出场前的刹那 */
.my-node-exit {
  opacity: 1;
}
/* exit-active指出场后到出场结束的过程 */
.my-node-exit-active {
  opacity: 0;
  transition: opacity 2s;
}
```
