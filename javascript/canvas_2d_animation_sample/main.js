const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const height = canvas.height = window.innerHeight;
const width = canvas.width = window.innerWidth;

let imgUrl = 'lion-roar.png';

let imgLion = new Image();

if (imageExists(imgUrl)) {
    imgLion.src = imgUrl;
}

function imageExists(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    xhr.send(null);
    if (xhr.status === 200) {
        return true;
    } else {
        return false;
    };
}

function rand(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

class Ball {

    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    move() {
        if (((this.x - this.size) <= 0) || ((this.x + this.size) >= width)) {
            this.velX = -(this.velX);
        }

        if (((this.y - this.size) <= 0) || ((this.y + this.size) >= height)) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {

            if (this !== balls[j]) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx ** 2 + dy ** 2);

                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color = 'rgb(' + rand(0, 255) + ',' + rand(0, 255) + ',' + rand(0, 255) + ')';

                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 2;
                    ctx.font = '4rem arial';
                    ctx.strokeText('Bang!', this.x - 80, this.y);

                    if (imageExists(imgUrl)) {
                        ctx.drawImage(imgLion, this.x, this.y);
                    }
                }
            }
        }
    }
}

let balls = [];
let numOfBalls = 30;
let maxSpeed = 5;

while (balls.length < numOfBalls) {
    const size = rand(10, 20);
    let ball = new Ball(
        rand(0 + size, width - size),
        rand(0 + size, height - size),
        rand(-maxSpeed, maxSpeed),
        rand(-maxSpeed, maxSpeed),
        'rgb(' + rand(0, 255) + ',' + rand(0, 255) + ',' + rand(0, 255) + ')',
        size
    );

    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].move();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();

