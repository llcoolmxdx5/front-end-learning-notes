const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function draw() {
  const source = new Image();
  source.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
  source.onload = () => {
    // Draw slice
    ctx.drawImage(source, 33, 71, 104, 124, 21, 20, 87, 104);
  };

  // Draw frame
  const frame = new Image();
  frame.src = 'https://mdn.mozillademos.org/files/242/Canvas_picture_frame.png';
  frame.onload = () => {
    ctx.drawImage(frame, 0, 0);
  };
}
