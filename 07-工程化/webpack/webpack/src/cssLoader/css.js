// import "./css.less";
import data from '../assets/data.csv';
import json from '../assets/data.json5';
import toml from '../assets/data.toml';
import xml from '../assets/data.xml';
import yaml from '../assets/data.yaml';
import less from './css.less';
import './global.less';

console.log(data, 'data.csv');
console.log(xml, 'data.xml');

console.log(less);

const div = document.createElement('div');
div.textContent = 'hello webpack';

document.body.appendChild(div);

document.body.classList.add(less.word);

const span = document.createElement('span');
span.classList.add('icon');
span.innerHTML = '&#xe668;';
document.body.appendChild(span);

console.group();
console.log(toml.title); // output `TOML Example`
console.log(toml.owner.name); // output `Tom Preston-Werner`
console.log(yaml.title); // output `YAML Example`
console.log(yaml.owner.name); // output `Tom Preston-Werner`
console.log(json.title); // output `JSON5 Example`
console.log(json.owner.name); // output `Tom Preston-Werner`
console.groupEnd();
