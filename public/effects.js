(() => {
  "use strict";
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.append(progress);
  let scrollFrame = 0;
  const hero = document.querySelector(".hero");
  function updateScroll() {
    scrollFrame = 0;
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? scrollY / distance : 0})`;
    if (hero && !preference.matches && scrollY < hero.offsetHeight) {
      hero.style.setProperty(
        "--hero-shift",
        `${Math.min(scrollY, hero.offsetHeight) * 0.09}px`,
      );
    }
  }
  addEventListener(
    "scroll",
    () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    },
    { passive: true },
  );
  addEventListener("resize", updateScroll, { passive: true });
  updateScroll();

  let stopAmbient = () => {};
  function ambient() {
    stopAmbient();
    if (preference.matches) return;
    const canvas = document.createElement("canvas");
    canvas.className = "ambient-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      canvas.remove();
      return;
    }
    let width = 0,
      height = 0,
      frame = 0,
      last = 0;
    const particles = Array.from(
      { length: innerWidth < 700 ? 18 : 36 },
      (_, index) => ({
        x: Math.random(),
        y: Math.random(),
        speed: 4 + Math.random() * 9,
        radius: 0.5 + Math.random() * 0.9,
        alpha: 0.09 + Math.random() * 0.16,
        cyan: index % 5 === 0,
        phase: Math.random() * Math.PI * 2,
      }),
    );
    function resize() {
      width = innerWidth;
      height = innerHeight;
      const density = Math.min(devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      context.setTransform(density, 0, 0, density, 0, 0);
    }
    function paint(now) {
      frame = requestAnimationFrame(paint);
      if (now - last < 1000 / 24) return;
      const delta = last ? Math.min((now - last) / 1000, 0.08) : 0;
      last = now;
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.y -= (particle.speed * delta) / height;
        particle.x += Math.sin(now * 0.00012 + particle.phase) * delta * 0.002;
        if (particle.y < -0.01) particle.y = 1.01;
        const pulse = 0.75 + Math.sin(now * 0.0007 + particle.phase) * 0.25;
        context.fillStyle = particle.cyan
          ? `rgba(129,187,181,${particle.alpha * pulse})`
          : `rgba(211,170,114,${particle.alpha * pulse})`;
        context.fillRect(
          particle.x * width,
          particle.y * height,
          particle.radius,
          particle.radius * 1.8,
        );
      }
    }
    function visibility() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (!document.hidden) frame = requestAnimationFrame(paint);
    }
    addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    resize();
    visibility();
    stopAmbient = () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      canvas.remove();
    };
  }
  ambient();
  preference.addEventListener("change", () => {
    ambient();
    if (preference.matches && hero) {
      hero.style.removeProperty("--hero-x");
      hero.style.removeProperty("--hero-y");
      hero.style.removeProperty("--hero-shift");
    }
  });

  if (hero && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let frame = 0,
      x = 0,
      y = 0,
      targetX = 0,
      targetY = 0;
    function settle() {
      frame = 0;
      if (preference.matches) return;
      x += (targetX - x) * 0.075;
      y += (targetY - y) * 0.075;
      hero.style.setProperty("--hero-x", `${x.toFixed(2)}px`);
      hero.style.setProperty("--hero-y", `${y.toFixed(2)}px`);
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.04)
        frame = requestAnimationFrame(settle);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(settle);
    }
    hero.addEventListener(
      "pointermove",
      (event) => {
        if (preference.matches) return;
        const bounds = hero.getBoundingClientRect();
        targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * -18;
        targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * -12;
        schedule();
      },
      { passive: true },
    );
    hero.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
      schedule();
    });
  }
})();
