const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

function draw() {
  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(100, 100);
  ctx.lineTo(20, 180);
  ctx.fill();
}
