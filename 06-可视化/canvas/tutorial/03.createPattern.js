const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

function draw() {
  // 创建新 image 对象，用作图案
  const img = new Image();
  img.src = "https://mdn.mozillademos.org/files/222/Canvas_createpattern.png";
  img.onload = function () {
    // 创建图案
    const pattern = ctx.createPattern(img, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 150, 150);
  };
}
