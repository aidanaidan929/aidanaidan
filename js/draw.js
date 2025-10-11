// JavaScript Academy's video here: https://www.youtube.com/watch?v=mRDo-QXVUv8

const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lineWidth = 5;
let savedImage = null;

// ===== SETUP & RESIZING =====

function resizeCanvas(keepDrawing = false) {

  if (keepDrawing) {
    savedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }


  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - toolbar.offsetHeight - 40;


  if (keepDrawing && savedImage) {
    ctx.putImageData(savedImage, 0, 0);
  }
}

resizeCanvas(); 
window.addEventListener('resize', () => resizeCanvas(true));

// ===== TOOLBAR =====

toolbar.addEventListener('click', (e) => {
  if (e.target.id === 'clear') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

toolbar.addEventListener('change', (e) => {
  if (e.target.id === 'stroke') {
    ctx.strokeStyle = e.target.value;
  }
  if (e.target.id === 'lineWidth') {
    lineWidth = e.target.value;
  }
});

// ===== DRAWING =====

function getPosition(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches && e.touches.length > 0) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  } else {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }
}


function startDrawing(e) {
  e.preventDefault();
  isDrawing = true;
  const pos = getPosition(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const pos = getPosition(e);
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function stopDrawing() {
  if (!isDrawing) return;
  isDrawing = false;
  ctx.stroke();
  ctx.beginPath();
}

// ===== EVENT LISTENERS =====

// Mouse Support
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch Support
canvas.addEventListener('touchstart', startDrawing, { passive: false });
canvas.addEventListener('touchmove', draw, { passive: false });
canvas.addEventListener('touchend', stopDrawing);
