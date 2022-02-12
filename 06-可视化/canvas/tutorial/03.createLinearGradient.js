const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

function draw() {
  // Create gradients
  const linGrad = ctx.createLinearGradient(0, 0, 0, 150);
  linGrad.addColorStop(0, "#00ABEB");
  linGrad.addColorStop(0.5, "#fff");
  linGrad.addColorStop(0.5, "#26C000");
  linGrad.addColorStop(1, "#fff");

  const linGrad2 = ctx.createLinearGradient(0, 50, 0, 95);
  linGrad2.addColorStop(0.5, "#000");
  linGrad2.addColorStop(1, "rgba(0,0,0,0)");

  // assign gradients to fill and stroke styles
  ctx.fillStyle = linGrad;
  ctx.strokeStyle = linGrad2;

  // draw shapes
  ctx.fillRect(10, 10, 130, 130);
  ctx.strokeRect(50, 50, 50, 50);
}
