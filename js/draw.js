const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

// Set up canvas size dynamically
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - toolbar.offsetHeight - 40; // leave room for toolbar
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let isDrawing = false;
let lineWidth = 5;

// Toolbar actions
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

// ===== Drawing Logic (supports both mouse + touch) =====
function getPosition(e) {
  if (e.touches && e.touches.length > 0) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - canvas.offsetTop
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

// Mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch events
canvas.addEventListener('touchstart', startDrawing, { passive: false });
canvas.addEventListener('touchmove', draw, { passive: false });
canvas.addEventListener('touchend', stopDrawing);
