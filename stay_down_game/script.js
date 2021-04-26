// Canvas Setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 450;

let canvasPosition = canvas.getBoundingClientRect();
window.addEventListener('resize', function () {
    canvasPosition = canvas.getBoundingClientRect();
});

function animate() {
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);