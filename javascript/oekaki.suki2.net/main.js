let isDrawing = false;
let x;
let y;
const toolbarHeight = document.querySelector('#toolbar').clientHeight;
const canvas = document.querySelector('#myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight - toolbarHeight;
const ctx = canvas.getContext('2d');
const colorPicker = document.querySelector('input[type="color"]');
const penSizePicker = document.querySelector('input[type="range"]');
const clearBtn = document.querySelector('#clearBtn');

ctx.fillStyle = 'rgb(255,255,255)';
ctx.fillRect(0, 0, width, height);

// ペンの太さを取得
const penSizes = document.querySelectorAll("#penControls td.pen");
const defaultPenSize = penSizePicker.value;
const minPenSize = penSizePicker.getAttribute('min');
const maxPenSize = penSizePicker.getAttribute('max');
const penSelectedColor = 'orange';
let displayPenSize = 11;
const penSize = [minPenSize, defaultPenSize, defaultPenSize * 3, maxPenSize];
for (let i = 0; i < penSizes.length; i++) {
    const element = penSizes[i];
    element.style.cssText = "background-color: white; text-align: center;";
    element.style.fontSize = displayPenSize + 'px';
    element.style.padding = 0;
    if (penSize[i] == defaultPenSize) { element.style.backgroundColor = penSelectedColor; }
    element.onclick = () => {
        penSizes.forEach(td => { td.style.backgroundColor = 'white'; });
        element.style.backgroundColor = penSelectedColor;
        penSizePicker.value = penSize[i];
    }
    displayPenSize += (i === 0) ? 4 : 5;
}

penSizePicker.addEventListener('change', changePenSizeColor);

function changePenSizeColor(e) {
    for (let i = 0; i < penSize.length; i++) {
        if (e.target.value == penSize[i]) {
            penSizes.forEach(td => { td.style.backgroundColor = 'white'; });
            penSizes[i].style.backgroundColor = penSelectedColor;
            break;
        } else {
            penSizes.forEach(td => { td.style.backgroundColor = 'white'; });
        }
    }
}

// カラーパレットから色を取得
const paletteColors = document.querySelectorAll("#colorPalette td");
paletteColors.forEach(element => {
    element.style.width = element.style.height = '24px';
    element.style.backgroundColor = element.id;
    element.onclick = () => {
        let paletteColor = window.getComputedStyle(element).backgroundColor; //「rgb(255, 255, 255)」形式に変換
        // alert(paletteColor);
        function decimalToHex(match, p1, p2, p3, offset, string) { //「#ffffff」形式に変換
            return "#" + Number(p1).toString(16).padStart(2, "0") + Number(p2).toString(16).padStart(2, "0") + Number(p3).toString(16).padStart(2, "0");
        }
        colorPicker.value = paletteColor.replace(/rgb\((\d+), (\d+), (\d+)\)/, decimalToHex);
    }
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', keepDrawing);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mouseout', endDrawing);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', keepDrawing);
canvas.addEventListener('touchend', endDrawing);
canvas.addEventListener('touchcancel', endDrawing);

function startDrawing(e) {
    e.preventDefault();
    x = pos(e)[0];
    y = pos(e)[1];
    isDrawing = true;
}

function keepDrawing(e) {
    e.preventDefault();
    if (isDrawing === true) {
        drawLine(ctx, x, y, pos(e)[0], pos(e)[1], colorPicker.value, penSizePicker.value);
        x = pos(e)[0];
        y = pos(e)[1];
    }
}

function endDrawing(e) {
    e.preventDefault();
    if (isDrawing === true) {
        drawLine(ctx, x, y, pos(e)[0], pos(e)[1], colorPicker.value, penSizePicker.value);
        x = 0;
        y = 0;
        isDrawing = false;
    }
}

function pos(e) {
    const event = e.type;
    if (event.indexOf('mouse') !== -1) {
        const mouseX = e.clientX;
        const mouseY = e.clientY - toolbarHeight;
        return [mouseX, mouseY];
    } else if (event.indexOf('touch') !== -1) {
        const touchX = e.changedTouches[0].clientX;
        const touchY = e.changedTouches[0].clientY - toolbarHeight;
        return [touchX, touchY];
    }
}

function drawLine(ctx, x1, y1, x2, y2, color, penWidth) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = penWidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function clearCanvas() {
    // ctx.fillStyle = 'rgb(255,255,255)';
    // ctx.fillRect(0, 0, width, height);
    location.reload();
}

clearBtn.onclick = clearCanvas;

// マウスポインターを定義
const cursorCanvas = document.createElement("canvas");
const cursorSize = 96;
cursorCanvas.width = cursorCanvas.height = cursorSize;

setInterval(() => {
    const cursorCtx = cursorCanvas.getContext("2d");
    cursorCtx.fillStyle = colorPicker.value;
    cursorCtx.font = cursorSize + "px 'ＭＳ ゴシック'";
    cursorCtx.fillText("\u270D", 0, cursorSize);

    const dataURL = cursorCanvas.toDataURL("image/png");

    canvas.style.cursor = "url(" + dataURL + ") " + cursorSize * 1 / 6 + " " + cursorSize * 5 / 6 + ", auto";
}, 100);

// window.addEventListener('orientationchange', function () {
//     location.reload();
// });