const html = `
<table style='margin: 0 auto;'>
  <tr>
    <td><img src="https://mdn.mozillademos.org/files/5399/gallery_1.jpg"></td>
    <td><img src="https://mdn.mozillademos.org/files/5401/gallery_2.jpg"></td>
    <td><img src="https://mdn.mozillademos.org/files/5403/gallery_3.jpg"></td>
    <td><img src="https://mdn.mozillademos.org/files/5405/gallery_4.jpg"></td>
  </tr>
  <tr>
    <td><img src="https://mdn.mozillademos.org/files/5407/gallery_5.jpg"></td>
    <td><img src="https://mdn.mozillademos.org/files/5409/gallery_6.jpg"></td>
    <td><img src="https://mdn.mozillademos.org/files/5411/gallery_7.jpg"></td>
    <td><img src="https://mdn.mozillademos.org/files/5413/gallery_8.jpg"></td>
  </tr>
</table>
<img id="frame" src="https://mdn.mozillademos.org/files/242/Canvas_picture_frame.png" width="132" height="150">
`;

const insertCanvas = () => {
  // Loop through all images
  for (const img of document.images) {
    img.style.display = 'none';
    // Don't add a canvas for the frame image
    if (img.getAttribute('id') != 'frame') {
      // Create canvas element
      const canvas = document.createElement('canvas');
      canvas.setAttribute('width', 132);
      canvas.setAttribute('height', 150);
      // Insert before the image
      img.parentNode.insertBefore(canvas, img);
      const ctx = canvas.getContext('2d');
      // Draw image to canvas
      ctx.drawImage(img, 15, 20);
      // Add frame
      ctx.drawImage(document.getElementById('frame'), 0, 0);
    }
  }
};

function draw() {
  document.body.style.background =
    '0 -100px repeat-x url(https://mdn.mozillademos.org/files/5415/bg_gallery.png) #4f191a';
  document.body.style.margin = '10px';
  document.querySelector('canvas').style.display = 'none';
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  document.querySelectorAll('td').forEach(td => (td.style.padding = '15px'));
  setTimeout(insertCanvas, 1000);
}
