const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function draw() {
  const img = new Image();
  img.onload = function () {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        ctx.drawImage(img, j * 50, i * 38, 50, 38);
      }
    }
  };
  img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
}
