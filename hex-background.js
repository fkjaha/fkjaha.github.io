// A viewport-sized, decorative canvas. No assets or animation library required.
const canvas = document.createElement("canvas");
canvas.className = "ambient-background";
canvas.setAttribute("aria-hidden", "true");
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");
if (ctx) installHexBackground();
else canvas.remove();

function installHexBackground() {
  const hero = document.querySelector(".hero");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const toggle = document.createElement("button");
  toggle.className = "ambient-motion-toggle";
  toggle.type = "button";
  toggle.hidden = true;
  toggle.setAttribute("aria-pressed", "false");
  toggle.textContent = "Pause glow";
  document.body.appendChild(toggle);

  const FRAME_MS = 1000 / 30;
  const pointer = { x: 0, y: 0, strength: 0, active: false };
  let width = 0;
  let height = 0;
  let scale = 1;
  let radius = 34;
  let scrollY = window.scrollY;
  let startY = 0;
  let cells = [];
  let gridKey = "";
  let frameId = 0;
  let lastFrame = 0;
  let lastTick = null;
  let motionTime = 0;
  let paused = false;
  let dirty = true;

  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => value * value * (3 - 2 * value);
  const mix = (a, b, amount) => a + (b - a) * amount;
  const hash = (x, y) => {
    let n = Math.imul(x, 374761393) + Math.imul(y, 668265263);
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  };
  function noise(x, y) {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = smooth(x - ix);
    const fy = smooth(y - iy);
    return mix(mix(hash(ix, iy), hash(ix + 1, iy), fx),
      mix(hash(ix, iy + 1), hash(ix + 1, iy + 1), fx), fy);
  }

  function buildGrid() {
    const stepY = radius * 1.5;
    const stepX = Math.sqrt(3) * radius;
    const firstRow = Math.floor(scrollY / stepY) - 1;
    const lastRow = Math.ceil((scrollY + height) / stepY) + 1;
    const key = `${width}:${radius}:${firstRow}:${lastRow}`;
    if (key === gridKey) return;
    gridKey = key;
    cells = [];
    for (let row = firstRow; row <= lastRow; row++) {
      for (let column = -1; column <= Math.ceil(width / stepX); column++) {
        const x = column * stepX + (row % 2 ? stepX / 2 : 0);
        const y = row * stepY;
        const path = new Path2D();
        for (let corner = 0; corner < 6; corner++) {
          const angle = (corner * 60 - 90) * Math.PI / 180;
          const px = x + Math.cos(angle) * (radius - 1.5);
          const py = y + Math.sin(angle) * (radius - 1.5);
          if (corner === 0) path.moveTo(px, py);
          else path.lineTo(px, py);
        }
        path.closePath();
        cells.push({ x, y, path });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const clipTop = Math.max(0, startY - scrollY);
    if (clipTop >= height) return;
    buildGrid();
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, clipTop, width, height - clipTop);
    ctx.clip();
    ctx.translate(0, -scrollY);
    ctx.lineWidth = 0.8;

    const cursorY = pointer.y + scrollY;
    const glowRadius = width < 600 ? 140 : 210;
    for (const cell of cells) {
      if (cell.y + radius < startY) continue;
      const fade = smooth(clamp((cell.y - startY) / 120));
      const field = noise(cell.x / 220 + motionTime * 0.045,
        cell.y / 240 - motionTime * 0.055) * 0.7
        + noise(cell.x / 110 - motionTime * 0.025,
          cell.y / 120 + motionTime * 0.035) * 0.3;
      const ambient = Math.pow(field, 3);
      const distance = Math.hypot(cell.x - pointer.x, cell.y - cursorY);
      const hover = Math.pow(clamp(1 - distance / glowRadius), 2) * pointer.strength;
      const red = Math.round(mix(135, 197, hover));
      const green = Math.round(mix(112, 247, hover));
      const blue = Math.round(mix(191, 112, hover));
      ctx.fillStyle = `rgba(${red},${green},${blue},${(0.009 + ambient * 0.05 + hover * 0.07) * fade})`;
      ctx.fill(cell.path);
      ctx.strokeStyle = `rgba(${red},${green},${blue},${(0.055 + ambient * 0.24 + hover * 0.34) * fade})`;
      ctx.stroke(cell.path);
    }
    ctx.restore();
  }

  function requestDraw() {
    dirty = true;
    if (!frameId && !document.hidden) frameId = requestAnimationFrame(tick);
  }

  function tick(now) {
    frameId = 0;
    if (document.hidden) return;
    const visible = startY - scrollY < height;
    toggle.hidden = !visible || reducedMotion.matches;
    const animated = visible && !paused && !reducedMotion.matches;
    const delta = lastTick === null ? 0 : Math.min(now - lastTick, 80);
    lastTick = animated ? now : null;
    if (animated) motionTime += delta / 1000;

    if ((!animated && dirty) || now - lastFrame >= FRAME_MS) {
      const target = animated && pointer.active ? 1 : 0;
      pointer.strength += (target - pointer.strength) * 0.18;
      if (!animated) pointer.strength = 0;
      draw();
      dirty = false;
      lastFrame = now - ((now - lastFrame) % FRAME_MS);
    }
    if (animated) frameId = requestAnimationFrame(tick);
  }

  function resize() {
    width = document.documentElement.clientWidth;
    height = window.innerHeight;
    scale = Math.min(window.devicePixelRatio || 1, width < 600 ? 1 : 1.5);
    radius = width < 600 ? 28 : 34;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    scrollY = window.scrollY;
    startY = hero ? hero.getBoundingClientRect().bottom + scrollY : 0;
    gridKey = "";
    requestDraw();
  }

  window.addEventListener("pointermove", event => {
    if (event.pointerType === "touch" || paused || reducedMotion.matches) return;
    if (startY - scrollY >= height) return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = event.clientY + scrollY >= startY;
    requestDraw();
  }, { passive: true });
  const releasePointer = () => { pointer.active = false; requestDraw(); };
  document.documentElement.addEventListener("pointerleave", releasePointer);
  window.addEventListener("blur", releasePointer);
  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
    requestDraw();
  }, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  if (hero && typeof ResizeObserver !== "undefined") new ResizeObserver(resize).observe(hero);
  reducedMotion.addEventListener("change", () => {
    pointer.active = false;
    lastTick = null;
    requestDraw();
  });
  document.addEventListener("visibilitychange", () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    lastTick = null;
    pointer.active = false;
    if (!document.hidden) requestDraw();
  });
  toggle.addEventListener("click", () => {
    paused = !paused;
    pointer.active = false;
    toggle.textContent = paused ? "Resume glow" : "Pause glow";
    toggle.setAttribute("aria-pressed", String(paused));
    requestDraw();
  });
  resize();
}
