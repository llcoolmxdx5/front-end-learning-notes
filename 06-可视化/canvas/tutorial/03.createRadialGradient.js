const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

function draw() {
  // 创建渐变
  const radGrad = ctx.createRadialGradient(45,45,10,52,50,30);
  radGrad.addColorStop(0, '#A7D30C');
  radGrad.addColorStop(0.9, '#019F62');
  radGrad.addColorStop(1, 'rgba(1,159,98,0)');

  const radGrad2 = ctx.createRadialGradient(105,105,20,112,120,50);
  radGrad2.addColorStop(0, '#FF5F98');
  radGrad2.addColorStop(0.75, '#FF0188');
  radGrad2.addColorStop(1, 'rgba(255,1,136,0)');

  const radGrad3 = ctx.createRadialGradient(95,15,15,102,20,40);
  radGrad3.addColorStop(0, '#00C9FF');
  radGrad3.addColorStop(0.8, '#00B5E2');
  radGrad3.addColorStop(1, 'rgba(0,201,255,0)');

  const radGrad4 = ctx.createRadialGradient(0,150,50,0,140,90);
  radGrad4.addColorStop(0, '#F4F201');
  radGrad4.addColorStop(0.8, '#E4C700');
  radGrad4.addColorStop(1, 'rgba(228,199,0,0)');

  // 画图形
  ctx.fillStyle = radGrad4;
  ctx.fillRect(0,0,150,150);
  ctx.fillStyle = radGrad3;
  ctx.fillRect(0,0,150,150);
  ctx.fillStyle = radGrad2;
  ctx.fillRect(0,0,150,150);
  ctx.fillStyle = radGrad;
  ctx.fillRect(0,0,150,150);
}

