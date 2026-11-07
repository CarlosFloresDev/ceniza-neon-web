(() => {
  "use strict";
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [
    ...scope.querySelectorAll(selector),
  ];
  const toggle = $(".menu-toggle"),
    nav = $("#main-nav");
  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.setAttribute(
      "aria-label",
      expanded ? "Cerrar navegación" : "Abrir navegación",
    );
    nav.classList.toggle("is-open", expanded);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav?.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir navegación");
      toggle.focus();
    }
  });
  const normalize = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const query = $("#wiki-query");
  let category = "Todos";
  function filterWiki() {
    const term = normalize(query?.value || "");
    let count = 0;
    $$(".wiki-row").forEach((row) => {
      const show =
        (category === "Todos" || row.dataset.category === category) &&
        normalize(row.dataset.search).includes(term);
      row.hidden = !show;
      if (show) count++;
    });
    $("#wiki-count").textContent =
      `${count} ${count === 1 ? "artículo encontrado" : "artículos encontrados"}`;
    $(".empty-results").hidden = count !== 0;
  }
  query?.addEventListener("input", filterWiki);
  $$("[data-wiki-filter]").forEach((button) =>
    button.addEventListener("click", () => {
      category = button.dataset.wikiFilter;
      $$("[data-wiki-filter]").forEach((b) =>
        b.setAttribute("aria-pressed", String(b === button)),
      );
      filterWiki();
    }),
  );

  const gallery = $("#gallery-dialog"),
    trailer = $("#trailer-dialog");
  $$(".gallery-trigger").forEach((button) =>
    button.addEventListener("click", () => {
      const img = $("img", gallery);
      img.src = button.dataset.image;
      img.alt = button.dataset.caption;
      $("p", gallery).textContent = button.dataset.caption;
      gallery.showModal();
    }),
  );
  $$("[data-trailer]").forEach((button) =>
    button.addEventListener("click", () => {
      trailer.showModal();
      $("video", trailer)
        .play()
        .catch(() => {});
    }),
  );
  $$("dialog").forEach((dialog) => {
    $(".dialog-close", dialog)?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          dialog.close();
      }
    });
  });
  trailer?.addEventListener("close", () => $("video", trailer).pause());
  trailer?.addEventListener("cancel", () => $("video", trailer).pause());

  const audio = $("#soundtrack-audio"),
    mini = $(".mini-player");
  let library = null,
    current = null,
    restorePosition = 0,
    lastSaved = -1;
  const key = "ceniza-neon-audio";
  const playSVG =
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m9 5 11 7-11 7z"/></svg>';
  const pauseSVG =
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
  const safeGet = () => {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch {
      return null;
    }
  };
  function save() {
    if (current)
      try {
        localStorage.setItem(
          key,
          JSON.stringify({
            id: current.id,
            time: audio.currentTime,
            volume: audio.volume,
          }),
        );
      } catch {}
  }
  function display() {
    if (!current) return;
    $(".mini-title").textContent = current.displayTitle;
    $(".mini-play").innerHTML = audio.paused ? playSVG : pauseSVG;
    $(".mini-play").setAttribute(
      "aria-label",
      audio.paused ? "Reproducir música" : "Pausar música",
    );
    const seconds = Math.floor(audio.currentTime || 0);
    $(".mini-clock").textContent =
      `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
    if ($("#full-track-title")) {
      $("#full-track-title").textContent = current.displayTitle;
      $("[data-audio-toggle]").innerHTML = audio.paused ? playSVG : pauseSVG;
      $("[data-audio-toggle]").setAttribute(
        "aria-label",
        audio.paused
          ? "Reproducir pista seleccionada"
          : "Pausar pista seleccionada",
      );
      const duration = Number.isFinite(audio.duration)
        ? Math.floor(audio.duration)
        : 0;
      const time = (value) =>
        `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
      $("#full-track-time").textContent =
        `${time(seconds)} / ${time(duration)}`;
      $("#audio-seek").value = duration
        ? (100 * audio.currentTime) / duration
        : 0;
      $("#audio-volume").value = audio.volume;
    }
    $$(".track").forEach((button) => {
      const active = button.dataset.track === current.id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active && !audio.paused));
      const icon = $(".icon", button);
      if (icon) icon.outerHTML = active && !audio.paused ? pauseSVG : playSVG;
    });
  }
  async function tracks() {
    if (!library) {
      const response = await fetch("/data/music.json");
      if (!response.ok) throw new Error("No se pudo cargar el repertorio");
      library = await response.json();
    }
    return library;
  }
  async function select(id, play = true) {
    try {
      const list = await tracks(),
        track = list.find((t) => t.id === id);
      if (!track) return;
      if (current?.id === id) {
        if (play) {
          if (audio.paused) await audio.play();
          else audio.pause();
        }
        display();
        return;
      }
      current = track;
      audio.src = track.src;
      mini.hidden = false;
      display();
      if (play) await audio.play();
      save();
      display();
    } catch {
      mini.hidden = false;
      $(".mini-title").textContent =
        "No se pudo reproducir. Inténtalo de nuevo.";
    }
  }
  $$("[data-track]").forEach((button) =>
    button.addEventListener("click", () => select(button.dataset.track)),
  );
  $(".mini-play")?.addEventListener("click", () => {
    if (current) select(current.id);
  });
  $("[data-audio-toggle]")?.addEventListener("click", () =>
    select(current?.id || "menu"),
  );
  async function stepTrack(offset) {
    const list = await tracks(),
      index = list.findIndex((track) => track.id === current?.id);
    await select(
      list[(Math.max(0, index) + offset + list.length) % list.length].id,
    );
  }
  $("[data-audio-prev]")?.addEventListener("click", () => stepTrack(-1));
  $("[data-audio-next]")?.addEventListener("click", () => stepTrack(1));
  $("#audio-seek")?.addEventListener("input", (event) => {
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = (audio.duration * Number(event.target.value)) / 100;
      save();
    }
  });
  $("#audio-volume")?.addEventListener("input", (event) => {
    audio.volume = Number(event.target.value);
    save();
  });
  $(".mini-close")?.addEventListener("click", () => {
    audio.pause();
    mini.hidden = true;
    save();
  });
  audio?.addEventListener("timeupdate", () => {
    display();
    const second = Math.floor(audio.currentTime);
    if (second % 3 === 0 && second !== lastSaved) {
      save();
      lastSaved = second;
    }
  });
  audio?.addEventListener("play", () => {
    const video = $("video", trailer);
    if (video && !video.paused) video.pause();
    display();
  });
  audio?.addEventListener("pause", () => {
    save();
    display();
  });
  $("video", trailer)?.addEventListener("play", () => audio.pause());
  audio?.addEventListener("ended", async () => {
    const list = await tracks(),
      index = list.findIndex((t) => t.id === current?.id);
    await select(list[(index + 1) % list.length].id);
  });
  audio?.addEventListener("loadedmetadata", () => {
    if (restorePosition > 0) {
      audio.currentTime = Math.min(
        restorePosition,
        Math.max(0, audio.duration - 1),
      );
      restorePosition = 0;
    }
  });
  audio?.addEventListener("error", () => {
    if (current) {
      $(".mini-title").textContent =
        "No se pudo cargar la pista. Vuelve a seleccionarla.";
    }
  });
  window.addEventListener("pagehide", save);
  const stored = safeGet();
  if (stored?.id) {
    restorePosition = Number(stored.time) || 0;
    audio.volume = Math.max(
      0,
      Math.min(1, Number.isFinite(stored.volume) ? stored.volume : 0.7),
    );
    select(stored.id, false);
  } else if (audio) audio.volume = 0.7;
  $("#clear-local")?.addEventListener("click", () => {
    audio.pause();
    audio.removeAttribute("src");
    current = null;
    restorePosition = 0;
    mini.hidden = true;
    try {
      localStorage.removeItem(key);
    } catch {}
    $("#clear-status").textContent =
      "Preferencias de audio borradas de este navegador.";
    $$(".track").forEach((b) => b.classList.remove("is-active"));
  });
})();

// Jugar en el navegador: al pulsar Jugar se abre una vista a pantalla completa con el
// juego de itch.io; antes no se carga nada. Cerrar o Esc la quita y libera el juego.
document.querySelectorAll("[data-itch-embed]").forEach((button) => {
  button.addEventListener("click", () => {
    const stage = document.createElement("div");
    stage.className = "play-stage";
    stage.setAttribute("role", "dialog");
    stage.setAttribute("aria-label", "CENIZA NEÓN");
    const close = document.createElement("button");
    close.type = "button";
    close.className = "play-stage__close";
    close.textContent = "Cerrar ✕";
    const iframe = document.createElement("iframe");
    iframe.src = button.dataset.itchEmbed;
    iframe.title = "CENIZA NEÓN en itch.io";
    iframe.allowFullscreen = true;
    iframe.allow = "autoplay; fullscreen; gamepad";
    const box = document.createElement("div");
    box.className = "play-stage__box";
    box.append(iframe);
    stage.append(close, box);
    document.body.append(stage);
    document.body.style.overflow = "hidden";
    const shut = () => {
      stage.remove();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      button.focus();
    };
    const onKey = (event) => { if (event.key === "Escape") shut(); };
    close.addEventListener("click", shut);
    document.addEventListener("keydown", onKey);
    close.focus();
  });
});
// Top Boss Rush: se lee de /api/ranking al abrir la página de descarga.
document.querySelectorAll("[data-ranking]").forEach(async (list) => {
  const time = (s) => {
    const m = Math.floor(s / 60);
    return `${String(m).padStart(2, "0")}:${(s - m * 60).toFixed(1).padStart(4, "0")}`;
  };
  const row = (cls, text) => {
    const li = document.createElement("li");
    li.className = cls;
    li.textContent = text;
    return li;
  };
  try {
    const response = await fetch("/api/ranking", { cache: "no-store" });
    const { ranking } = await response.json();
    if (!ranking || !ranking.length) {
      list.replaceChildren(row("ranking-empty", "Aún no hay tiempos. ¡Sé el primero!"));
      return;
    }
    list.replaceChildren(
      ...ranking.map((entry, index) => {
        const li = document.createElement("li");
        const place = document.createElement("span");
        place.className = "ranking-place";
        place.textContent = String(index + 1);
        const name = document.createElement("span");
        name.className = "ranking-name";
        name.textContent = entry.name;
        const score = document.createElement("span");
        score.className = "ranking-time";
        score.textContent = `${time(entry.seconds)} · ${entry.hits} golpes`;
        li.append(place, name, score);
        return li;
      }),
    );
  } catch {
    list.replaceChildren(row("ranking-empty", "No se pudo cargar el ranking ahora."));
  }
});