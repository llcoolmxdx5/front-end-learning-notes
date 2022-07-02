// import _ from "lodash";

// console.log(_.join(["index", "module", "loaded!"], " "));

import './async-module';

const button = document.createElement('button');

button.textContent = '点击执行加法运算';

button.addEventListener('click', () => {
  import(/* webpackChunkName: 'math', webpackPrefetch: true */ './math.js').then(({ add }) => {
    console.log(add(4, 5));
  });
});

document.body.appendChild(button);

const button2 = document.createElement('button');
button2.textContent = '点击执行字符串打印';
button2.addEventListener('click', () => {
  import(/* webpackChunkName: 'print', webpackPreload: true */ './print.js').then(({ print }) => {
    print(4, 5);
  });
});
document.body.appendChild(button2);

import(/* webpackChunkName: 'print', webpackPreload: true */ './print.js').then(({ print }) => {
  print();
});
