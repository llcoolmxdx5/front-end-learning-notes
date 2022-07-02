const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function draw() {
  ctx.font = '48px serif';
  ctx.textBaseline = 'hanging';
  ctx.strokeText('Hello world', 0, 100);
}
