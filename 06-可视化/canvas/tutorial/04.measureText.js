const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function draw() {
  const text = ctx.measureText('foo'); // TextMetrics object
  console.log(text.width); // 15.449966430664062;
}
