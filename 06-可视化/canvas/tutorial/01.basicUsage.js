const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function draw() {
  ctx.fillStyle = 'red';
  ctx.fillRect(10, 10, 55, 50);

  ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
  ctx.fillRect(30, 30, 55, 50);
}
