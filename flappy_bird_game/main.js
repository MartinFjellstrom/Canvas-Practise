const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 9;

window.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        spacePressed = true;
    }
})
window.addEventListener('keyup', function (e) {
    if (e.code === 'Space') {
        spacePressed = false;
    }
    bird.frameX = 0;
})

const background = new Image();
background.src = 'images/BG.png';
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handleBackground() {
    if (BG.x1 <= -BG.width + gameSpeed+1) {
        BG.x1 = BG.width;
    } else {
        BG.x1 -= gameSpeed+1;
    }
    if (BG.x2 <= -BG.width + gameSpeed+1) {
        BG.x2 = BG.width;
    } else {
        BG.x2 -= gameSpeed+1;
    }
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height)
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height)
}

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');


let fps, fpsInteral, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInteral = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}
function animate() {
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInteral) {
        then = now - (elapsed % fpsInteral);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleBackground();
        handleObstacles();
        handleParticles();
        bird.uppdate();
        bird.draw();
        ctx.fillStyle = gradient;
        ctx.font = '90px Georgia';
        ctx.strokeText(score, 450, 70);
        ctx.fillText(score, 450, 70);
    }
    handleCollisions();
    if (handleCollisions()) return;
    requestAnimationFrame(animate);
    angle += 0.12;
    hue++;
    frame += 2;
}
startAnimating(30)

const bang = new Image();
bang.src = 'images/bang.png';
function handleCollisions() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
                (bird.y + bird.height > canvas.height - obstaclesArray[i].bottom &&
                    bird.y + bird.height < canvas.height))) {
            ctx.drawImage(bang, bird.x, bird.y, 50, 50);
            ctx.font = '25px Georgia';
            ctx.fillStye = 'black'
            ctx.fillText(`Game Over, your score is ${score}`, 160, canvas.height / 2 - 10);

            return true;
        }
    }
}

        // function animate() {
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     // ctx.fillRect(10, canvas.height - 90, 50, 50);
        //     handleBackground();
        //     handleObstacles();
        //     handleParticles();
        //     bird.uppdate();
        //     bird.draw();
        //     ctx.fillStyle = gradient;
        //     ctx.font = '90px Georgia';
        //     ctx.strokeText(score, 450, 70);
        //     ctx.fillText(score, 450, 70);
        //     handleCollisions();
        //     if (handleCollisions()) return;
        //     requestAnimationFrame(animate);
        // }
        // animate()
