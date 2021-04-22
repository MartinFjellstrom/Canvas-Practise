const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.globalCompositeOperation = 'destination-over'

let hue = Math.random() * 360;
// let hue2 = Math.random() * 360;
let number = 0;
let scale = 10;

function drawFlower() {
    let angle = number * 0.1;
    let radius = scale * Math.sqrt(number);
    let positionX = radius * Math.sin(angle) + canvas.width/2;
    let positionY = radius * Math.cos(angle) + canvas.height/2;

    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.strokeStyle = `black`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(positionX, positionY, number, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    number += 0.5;
    hue += 0.5;
    // hue2 += 1;
}

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawFlower()
    if (number > 250) return;
    requestAnimationFrame(animate);
}
animate()
