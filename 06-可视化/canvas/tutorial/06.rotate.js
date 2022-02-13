const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function draw() {
  ctx.save();
  ctx.translate(75, 75);
  for (let i = 1; i < 6; i++) {
    // Loop through rings (from inside to out)
    ctx.fillStyle = `rgb(${51 * i}, ${255 - 51 * i}, 255)`;
    for (let j = 0; j < i * 6; j++) {
      // draw individual dots
      ctx.rotate((Math.PI * 2) / (i * 6));
      ctx.beginPath();
      ctx.arc(0, i * 12.5, 5, 0, Math.PI * 2, true);
      ctx.fill();
    }
  }
  ctx.restore();
}
