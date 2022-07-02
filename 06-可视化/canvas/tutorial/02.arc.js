const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function draw() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.beginPath();
      const x = 25 + j * 50; // x 坐标值
      const y = 25 + i * 50; // y 坐标值
      const radius = 20; // 圆弧半径
      const startAngle = 0; // 开始点
      const endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
      const anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针

      ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

      if (i > 1) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
}
