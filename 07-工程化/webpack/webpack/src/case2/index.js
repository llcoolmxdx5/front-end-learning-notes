import pngSrc from '../assets/png.png';
import txt from '../assets/txt.txt';
import jpgSrc from '../assets/jpg.jpg';

const png = document.createElement('img');
png.src = pngSrc;

document.body.appendChild(png);

const div = document.createElement('div');
div.textContent = txt;

document.body.appendChild(div);

const jpg = document.createElement('img');
jpg.src = jpgSrc;

document.body.appendChild(jpg);
