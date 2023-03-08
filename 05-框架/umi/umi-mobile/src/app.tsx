import './global.less';

console.log('mobile');

const setRem = () => {
  const body = window.document.documentElement;
  body.style.fontSize = `${(16 * body.clientWidth) / 375}px`;
};

setRem();
