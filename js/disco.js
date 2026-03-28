/* ==========================================================================
   Disco Easter Egg — Triple-tap the logo to activate
   Full-screen iMessage-style light show
   ========================================================================== */

(function () {
  let tapCount = 0;
  let tapTimer = null;
  let isActive = false;

  const COLORS = [
    '#ff2d95', '#00e5ff', '#ffe600', '#76ff03',
    '#d500f9', '#ff6d00', '#2979ff', '#ff1744',
    '#00e676', '#f50057', '#651fff', '#00b0ff',
  ];

  function disco() {
    if (isActive) return;
    isActive = true;

    const canvas = document.createElement('canvas');
    canvas.className = 'disco-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Spotlight beams
    const beams = [];
    for (let i = 0; i < 8; i++) {
      beams.push({
        x: Math.random() * canvas.width,
        y: -50,
        angle: Math.random() * Math.PI * 0.6 + Math.PI * 0.2,
        speed: 0.02 + Math.random() * 0.03,
        width: 80 + Math.random() * 120,
        length: Math.max(canvas.width, canvas.height) * 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Floating orbs
    const orbs = [];
    for (let i = 0; i < 30; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 8 + Math.random() * 40,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;
    let startTime = Date.now();
    const DURATION = 2500;
    let rafId;

    function render() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      frame++;

      // Fade in/out
      let globalAlpha = 1;
      if (progress < 0.1) globalAlpha = progress / 0.1;
      if (progress > 0.75) globalAlpha = 1 - (progress - 0.75) / 0.25;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = globalAlpha;

      // Dark base with color flash
      const flashIdx = Math.floor(frame / 3) % COLORS.length;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ambient color wash (full screen color shifts)
      const washColor = COLORS[(Math.floor(frame / 4)) % COLORS.length];
      ctx.fillStyle = washColor;
      ctx.globalAlpha = globalAlpha * 0.12;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = globalAlpha;

      // Spotlight beams
      beams.forEach((beam) => {
        beam.angle += beam.speed;
        const sweep = Math.sin(beam.phase + frame * 0.05) * Math.PI * 0.4;
        const currentAngle = beam.angle + sweep;

        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate(currentAngle);

        const grad = ctx.createLinearGradient(0, 0, 0, beam.length);
        const c = beam.color;
        grad.addColorStop(0, c + 'cc');
        grad.addColorStop(0.3, c + '66');
        grad.addColorStop(1, c + '00');

        ctx.beginPath();
        ctx.moveTo(-beam.width / 2, 0);
        ctx.lineTo(beam.width * 0.8, beam.length);
        ctx.lineTo(-beam.width * 0.8, beam.length);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.globalAlpha = globalAlpha * (0.3 + Math.sin(frame * 0.15 + beam.phase) * 0.2);
        ctx.fill();
        ctx.restore();

        // Rotate beam colors every few frames
        if (frame % 8 === 0) {
          beam.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
      });

      ctx.globalAlpha = globalAlpha;
      ctx.globalCompositeOperation = 'screen';

      // Orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.pulse += 0.15;

        // Bounce
        if (orb.x < 0 || orb.x > canvas.width) orb.vx *= -1;
        if (orb.y < 0 || orb.y > canvas.height) orb.vy *= -1;

        const pulseR = orb.r * (0.7 + Math.sin(orb.pulse) * 0.5);
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, pulseR);
        grad.addColorStop(0, orb.color + 'ff');
        grad.addColorStop(0.4, orb.color + '99');
        grad.addColorStop(1, orb.color + '00');

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Random color switch
        if (frame % 6 === 0 && Math.random() > 0.5) {
          orb.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
      });

      ctx.globalCompositeOperation = 'source-over';

      // Strobe flash every few frames
      if (frame % 7 === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (globalAlpha * 0.15) + ')';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(render);
      } else {
        canvas.remove();
        isActive = false;
      }
    }

    rafId = requestAnimationFrame(render);

    // Safety cleanup
    setTimeout(() => {
      cancelAnimationFrame(rafId);
      if (canvas.parentNode) canvas.remove();
      isActive = false;
    }, DURATION + 500);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.nav__logo');
    if (!logo) return;

    logo.addEventListener('click', (e) => {
      e.preventDefault();
      tapCount++;

      if (tapCount === 1) {
        tapTimer = setTimeout(() => { tapCount = 0; }, 600);
      }

      if (tapCount >= 3) {
        clearTimeout(tapTimer);
        tapCount = 0;
        disco();
      }
    });
  });
})();
