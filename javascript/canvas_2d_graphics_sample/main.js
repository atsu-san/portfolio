const menuHeight = 0.1;
const btn = document.querySelector('#btn');
btn.style.cssText = 'font-size: 2rem; padding: 0.5rem 2rem;';
btn.addEventListener('click', function () {
  location.reload();
});

const canvas = document.querySelector('#myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let bgColor = randomRgb();
let objColor = complementaryRgb(bgColor);
let objCount = 50;

ctx.fillStyle = `rgb(${bgColor})`;
ctx.fillRect(0, menuHeight, width, height);

while (objCount > 0) {
  let objPosX = rand(width);
  let objPosY = rand(height);
  let objTilt = rand(360);

  ctx.fillStyle = `rgb(${objColor})`;
  ctx.beginPath();
  ctx.arc(objPosX, objPosY, 50, degreeToRadian(objTilt), degreeToRadian(objTilt - 60), false);
  ctx.lineTo(objPosX, objPosY);
  ctx.fill();

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.font = '0.8rem arial';
  ctx.strokeText(`(${objCount})`, objPosX - 10, objPosY + 70);

  objCount--;
}
function rand(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randomRgb() {
  // ランダムに色のRGB値を生成
  let color = [];
  for (let i = 0; i < 3; i++) {
    color[i] = Math.floor(Math.random() * 256);
  }
  //「0, 0, 0」～「255, 255, 255」
  return color.join(', ');
}

function complementaryRgb(colorRgb) {
  // 補色の生成
  //（元の色のRGB値のうち最大値と最小値を合計した値から各RGB値を引いて算出）
  let orgColor = colorRgb.split(', ');
  let rgbBase = Math.max(...orgColor) + Math.min(...orgColor);
  let compColor = [];
  for (let i = 0; i < 3; i++) {
    compColor[i] = rgbBase - orgColor[i];
  }
  //「0, 0, 0」～「255, 255, 255」
  return compColor.join(', ');
}

function degreeToRadian(degree) {
  // 度（0～360）をラジアン（0～2π）に変換
  return degree * Math.PI / 180;
}
