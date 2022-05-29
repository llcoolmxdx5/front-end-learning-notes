// import "./css.less";
import less from "./css.less";
import './global.less'

console.log(less);

const div = document.createElement("div");
div.textContent = "hello webpack";

document.body.appendChild(div);

document.body.classList.add(less.word);
