const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

function draw() {
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  };
  img.src = "https://mdn.mozillademos.org/files/5395/backdrop.png";
}
