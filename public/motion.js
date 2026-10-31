// Movimiento del sitio: scroll suave (Lenis), cámara 3D de las escenas, entrada de la
// portada y apariciones con GSAP. Con movimiento reducido solo queda el progreso de lectura.
(() => {
  "use strict";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const { gsap, ScrollTrigger, Lenis } = window;
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero, .section-hero, .universe-hero");
  const stage = hero?.querySelector(".scene-stage");

  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.append(progress);
  function onScroll() {
    const distance = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? scrollY / distance : 0})`;
    header?.classList.toggle("is-scrolled", scrollY > 24);
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Ceniza que sube despacio detrás del contenido; se detiene con la pestaña oculta.
  let stopAmbient = () => {};
  function ambient() {
    stopAmbient();
    if (reduced.matches) return;
    const canvas = document.createElement("canvas");
    canvas.className = "ambient-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    const context = canvas.getContext("2d");
    if (!context) return canvas.remove();
    let width = 0,
      height = 0,
      frame = 0,
      last = 0;
    const flakes = Array.from({ length: innerWidth < 700 ? 16 : 32 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      speed: 5 + Math.random() * 9,
      size: 1 + Math.round(Math.random()),
      alpha: 0.1 + Math.random() * 0.18,
      cyan: i % 4 === 0,
      phase: Math.random() * Math.PI * 2,
    }));
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
      for (const flake of flakes) {
        flake.y -= (flake.speed * delta) / height;
        flake.x += Math.sin(now * 0.00012 + flake.phase) * delta * 0.002;
        if (flake.y < -0.01) flake.y = 1.01;
        context.fillStyle = flake.cyan
          ? `rgba(98,214,207,${flake.alpha})`
          : `rgba(242,169,72,${flake.alpha})`;
        // Cuadrados enteros: la ceniza también es pixel art.
        context.fillRect(
          Math.round(flake.x * width),
          Math.round(flake.y * height),
          flake.size * 2,
          flake.size * 2,
        );
      }
    }
    function visibility() {
      cancelAnimationFrame(frame);
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

  if (!gsap || !ScrollTrigger) {
    reduced.addEventListener("change", ambient);
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    root.classList.add("motion-ready");

    // Scroll con inercia sincronizado con ScrollTrigger y el reloj de GSAP.
    let lenis = null;
    if (Lenis) {
      lenis = new Lenis({ lerp: 0.11, anchors: { offset: -72 } });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      // Diálogos y menú abiertos congelan el scroll de fondo.
      const sync = () =>
        document.querySelector("dialog[open], #main-nav.is-open")
          ? lenis.stop()
          : lenis.start();
      const watcher = new MutationObserver(sync);
      document
        .querySelectorAll("dialog, #main-nav")
        .forEach((node) =>
          watcher.observe(node, { attributes: true, attributeFilter: ["open", "class"] }),
        );
    }

    // Cámara de la escena: inclinación con el puntero (muelle) y avance con el scroll.
    if (stage) {
      if (finePointer.matches) {
        const tiltX = gsap.quickTo(stage, "--rx", { duration: 1.1, ease: "power3.out" });
        const tiltY = gsap.quickTo(stage, "--ry", { duration: 1.1, ease: "power3.out" });
        // Las polaroids están más cerca de la cámara: se desplazan más que la ilustración.
        const pinned = hero.querySelector(".hero-polaroids");
        const driftX = pinned && gsap.quickTo(pinned, "x", { duration: 0.9, ease: "power3.out" });
        const driftY = pinned && gsap.quickTo(pinned, "y", { duration: 0.9, ease: "power3.out" });
        hero.addEventListener("pointermove", (event) => {
          const box = hero.getBoundingClientRect();
          const px = (event.clientX - box.left) / box.width - 0.5;
          const py = (event.clientY - box.top) / box.height - 0.5;
          tiltY(px * 6);
          tiltX(py * -3);
          driftX?.(px * -22);
          driftY?.(py * -14);
        });
        hero.addEventListener("pointerleave", () => {
          tiltX(0);
          tiltY(0);
          driftX?.(0);
          driftY?.(0);
        });
      }
      gsap.to(stage, {
        "--dolly": 260,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      const copy = hero.querySelectorAll(
        ".hero-content, .page-intro, .article-header, .wiki-art-heading, .universe-hero > .container",
      );
      gsap.to(copy, {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }

    // Entrada de la portada: la cámara llega, el letrero se enciende y aparece el resto.
    const title = document.querySelector(".hero-title");
    let firstVisit = true;
    try {
      firstVisit = !sessionStorage.getItem("ceniza-intro");
      sessionStorage.setItem("ceniza-intro", "1");
    } catch {}
    if (title && stage) {
      const words = title.querySelectorAll(".hero-word");
      const rest = document.querySelectorAll(
        ".hero-content > :not(.hero-title), .hero-bottom",
      );
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(stage, { "--dolly": 320, duration: firstVisit ? 2.2 : 1.2, ease: "power2.out" }, 0);
      intro.from(
        words,
        { yPercent: 40, opacity: 0, filter: "blur(10px)", duration: 0.9, stagger: 0.12 },
        firstVisit ? 0.35 : 0.1,
      );
      // Parpadeo del tubo de neón al encenderse.
      if (firstVisit)
        intro.fromTo(
          words[1],
          { opacity: 0.25 },
          { opacity: 1, duration: 0.6, ease: "steps(6)" },
          ">-0.2",
        );
      intro.from(rest, { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, firstVisit ? 1.1 : 0.4);
    }

    // Cabeceras interiores: el texto aparece con un fundido corto y las polaroids caen sobre la escena.
    if (hero && !title) {
      const copy = hero.querySelectorAll(
        ".page-intro > *, .article-header > *, .wiki-art-heading > *, .universe-hero > .container > *",
      );
      gsap.from(copy, { opacity: 0, y: 14, duration: 0.7, stagger: 0.06, ease: "power3.out", delay: 0.1 });
    }
    gsap.from(".hero-polaroids .polaroid", {
      opacity: 0,
      y: -30,
      rotate: (index) => (index % 2 ? 12 : -12),
      duration: 0.9,
      stagger: 0.12,
      ease: "back.out(1.4)",
      delay: 0.5,
    });

    // Apariciones al entrar en pantalla, una vez y en grupo.
    const reveal = gsap.utils.toArray("[data-reveal]");
    gsap.set(reveal, { y: 18 });
    ScrollTrigger.batch(reveal, {
      start: "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: "power3.out" }),
    });
    // Las capturas grandes se descubren de abajo arriba, como una persiana del taller.
    gsap.utils.toArray(".wide-capture img, .article-cover img, .wiki-figure img").forEach((image) =>
      gsap.from(image, {
        clipPath: "inset(0 0 100% 0)",
        scale: 1.06,
        duration: 1.1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: image, start: "top 85%", once: true },
      }),
    );

    // Tarjetas de distrito: inclinación 3D siguiendo el puntero.
    if (finePointer.matches)
      document.querySelectorAll(".district-card").forEach((card) => {
        const tiltX = gsap.quickTo(card, "--tilt-x", { duration: 0.5, ease: "power3.out" });
        const tiltY = gsap.quickTo(card, "--tilt-y", { duration: 0.5, ease: "power3.out" });
        gsap.set(card, { "--tilt-x": "0deg", "--tilt-y": "0deg" });
        card.addEventListener("pointermove", (event) => {
          const box = card.getBoundingClientRect();
          tiltY(`${((event.clientX - box.left) / box.width - 0.5) * 10}deg`);
          tiltX(`${((event.clientY - box.top) / box.height - 0.5) * -8}deg`);
        });
        card.addEventListener("pointerleave", () => {
          tiltX("0deg");
          tiltY("0deg");
        });
      });

    return () => {
      root.classList.remove("motion-ready");
      lenis?.destroy();
      if (stage) gsap.set(stage, { clearProps: "--rx,--ry,--dolly" });
    };
  });

  reduced.addEventListener("change", ambient);
})();
