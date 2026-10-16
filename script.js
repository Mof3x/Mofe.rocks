/* ==========================================================================
   Site behaviour: theme toggle, mobile nav, the fastfetch terminal on the
   home page, and rendering every page's content from data.js.
   You shouldn't need to edit this file to change your content.
   ========================================================================== */
(() => {
  "use strict";

  const SITE = window.SITE || {};
  const doc = document;
  const root = doc.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const THEME_KEY = "siw-theme";

  /* ---------------------------------------------------------------- helpers */

  const isPH = (v) => typeof v === "string" && v.trim().startsWith("[PLACEHOLDER");
  const isEmpty = (v) => v == null || (typeof v === "string" && v.trim() === "");
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), SITE);
  const list = (v) => (Array.isArray(v) ? v : isEmpty(v) ? [] : [v]);

  // Tiny element builder: h("a", { href: "x", class: "y" }, "text", childNode)
  function h(tag, attrs, ...kids) {
    const el = doc.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      el.append(kid instanceof Node ? kid : doc.createTextNode(String(kid)));
    }
    return el;
  }

  const phChip = (v) => h("span", { class: "ph", title: "Placeholder: edit this in data.js" }, v);

  // Plain text, or a dashed placeholder chip when the value isn't filled in yet.
  function txt(v) {
    if (isPH(v)) return phChip(v);
    if (isEmpty(v)) return phChip("[PLACEHOLDER: empty in data.js]");
    return doc.createTextNode(String(v));
  }

  // Only allow web, mailto and relative file links (never javascript: URLs).
  // Plain words such as "Coming soon" are not links.
  function safeHref(v) {
    if (isPH(v) || isEmpty(v)) return null;
    const s = String(v).trim();
    if (/^(https?:|mailto:)/i.test(s)) return s;
    if (/^[a-z][a-z0-9+.-]*:/i.test(s)) return null;
    if (/\s/.test(s) || !/[./#]/.test(s)) return null;
    return s;
  }

  const isExternal = (url) => /^https?:/i.test(url);
  const newTabNote = () => h("span", { class: "sr-only" }, " (opens in a new tab)");

  function link(href, label, attrs = {}) {
    const url = safeHref(href);
    if (!url) return txt(href);
    const ext = isExternal(url);
    return h("a", { href: url, target: ext ? "_blank" : null, rel: ext ? "noopener" : null, ...attrs }, label, ext ? newTabNote() : null);
  }

  // Button-style link. A placeholder becomes a dashed "soon" chip; plain text
  // such as "Coming soon" is shown as a quiet, non-clickable status.
  function linkBtn(href, label, { primary = false, download = false } = {}) {
    const url = safeHref(href);
    if (!url && !isPH(href) && !isEmpty(href)) {
      return h("span", { class: "btn btn--small is-soon", "aria-disabled": "true" }, `${label} · ${String(href).trim().toLowerCase()}`);
    }
    if (!url) {
      return h("span", { class: "btn btn--small is-placeholder", title: "Add this link in data.js" }, `${label} · soon`);
    }
    const ext = isExternal(url);
    return h(
      "a",
      {
        class: `btn btn--small${primary ? " btn--primary" : ""}`,
        href: url,
        target: ext ? "_blank" : null,
        rel: ext ? "noopener" : null,
        download: download || null,
      },
      label,
      ext ? newTabNote() : null
    );
  }

  const paras = (items) => list(items).map((p) => h("p", null, txt(p)));
  const bullets = (items) => h("ul", { class: "star-list" }, list(items).map((i) => h("li", null, txt(i))));

  function tags(items) {
    return h(
      "ul",
      { class: "tags" },
      list(items).map((t) => (isPH(t) ? h("li", null, phChip(t)) : h("li", { class: "tag" }, t)))
    );
  }

  function mediaPH(title, note) {
    return h(
      "div",
      { class: "media-ph" },
      h("strong", null, title),
      h("span", null, note)
    );
  }

  // An image, or a "NO SIGNAL" placeholder. Broken paths show what went wrong.
  function imageOr(src, alt, title, note) {
    const url = safeHref(src);
    if (!url) return mediaPH(title, note);
    const img = h("img", { src: url, alt: isPH(alt) || isEmpty(alt) ? "" : alt, loading: "lazy", decoding: "async" });
    img.addEventListener("error", () => img.replaceWith(mediaPH("FILE NOT FOUND", url)), { once: true });
    return img;
  }

  const projects = () => list(SITE.projects);

  // Skills as [{ label, items, about }]. The older { languages, tools, other } shape still works.
  function skillGroups() {
    const sk = SITE.skills || [];
    if (Array.isArray(sk)) return sk.filter((g) => g && list(g.items).length);
    return [
      { label: "Languages", items: list(sk.languages) },
      { label: "Tools", items: list(sk.tools) },
      { label: "Also", items: list(sk.other) },
    ].filter((g) => g.items.length);
  }

  // Projects are shown as numbered "plates": Pl. I, Pl. II, ...
  const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  const plate = (p) => `Pl. ${ROMAN[parseInt(p.number, 10)] || p.number}`;

  /* ------------------------------------------------------------ theme + nav */

  const themeBtn = doc.querySelector(".theme-toggle");
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeBtn) themeBtn.setAttribute("aria-pressed", String(theme === "ivory"));
  }
  applyTheme(root.getAttribute("data-theme") === "ivory" ? "ivory" : "night");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "ivory" ? "night" : "ivory";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* storage blocked: the theme still changes for this page */
      }
    });
  }

  /* ------------------------------------------- plant colour (home-page dots) */

  // The colour dots on the home page recolour the ASCII plants on every page.
  // The choice is remembered; pressing the lit dot again resets it.
  const PLANT_KEY = "siw-plant";
  const PLANTS = ["muted", "bone", "cyan", "pink", "line", "gold", "green", "red"];
  const plantDots = doc.querySelectorAll(".ff__dot[data-plant]");
  function applyPlant(name) {
    if (PLANTS.includes(name)) root.setAttribute("data-plant", name);
    else root.removeAttribute("data-plant");
    plantDots.forEach((d) => d.setAttribute("aria-pressed", String(d.dataset.plant === name)));
  }
  try {
    applyPlant(localStorage.getItem(PLANT_KEY));
  } catch (e) {
    applyPlant(null);
  }
  plantDots.forEach((dot) => {
    dot.title = `${dot.getAttribute("aria-label")}: recolour the plants`;
    dot.addEventListener("click", () => {
      const next = root.getAttribute("data-plant") === dot.dataset.plant ? null : dot.dataset.plant;
      applyPlant(next);
      try {
        if (next) localStorage.setItem(PLANT_KEY, next);
        else localStorage.removeItem(PLANT_KEY);
      } catch (e) {
        /* storage blocked: the colour still changes on this page */
      }
    });
  });

  const navBtn = doc.querySelector(".nav-toggle");
  const nav = doc.getElementById("site-nav");
  if (navBtn && nav) {
    const setOpen = (open) => {
      navBtn.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    navBtn.addEventListener("click", () => setOpen(navBtn.getAttribute("aria-expanded") !== "true"));
    doc.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        navBtn.focus();
      }
    });
    window.matchMedia("(min-width: 821px)").addEventListener("change", (e) => e.matches && setOpen(false));
  }

  /* ----------------------------------------------------- simple data hooks */

  // <span data-field="person.name">fallback</span>  -> text from data.js
  doc.querySelectorAll("[data-field]").forEach((el) => {
    const v = get(el.dataset.field);
    if (v === undefined) return;
    el.replaceChildren(txt(v));
  });

  // <a data-link="links.github">fallback</a>  -> real link or placeholder chip
  doc.querySelectorAll("[data-link]").forEach((el) => {
    const v = get(el.dataset.link);
    const url = safeHref(v);
    if (!url) {
      el.replaceWith(txt(v));
      return;
    }
    el.setAttribute("href", url);
    if (el.hasAttribute("data-link-text")) el.textContent = url.replace(/^mailto:|^https?:\/\/(www\.)?/i, "");
    if (isExternal(url)) {
      el.target = "_blank";
      el.rel = "noopener";
      el.append(newTabNote());
    }
  });

  doc.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* -------------------------------------------------------------- renderers */

  function projectCard(p, variant) {
    return h(
      "article",
      { class: "card panel" },
      h(
        "div",
        { class: "card__top" },
        h("span", { class: "card__num", "aria-hidden": "true" }, plate(p)),
        h("span", { class: "tag tag--type" }, p.type)
      ),
      h(
        "a",
        { class: "card__media", href: p.page, tabindex: "-1", "aria-hidden": "true" },
        imageOr(p.thumbnail, p.thumbnailAlt, "NO SIGNAL", "Add a screenshot in data.js")
      ),
      h("h3", { class: "card__title" }, h("a", { href: p.page }, txt(p.title))),
      h("p", { class: "card__summary" }, txt(p.summary)),
      variant === "full" ? tags(p.tech) : null,
      h(
        "div",
        { class: "btn-row" },
        linkBtn(p.page, "Case study", { primary: true }),
        linkBtn(p.links && p.links.live, "Live"),
        linkBtn(p.links && p.links.code, "Code")
      )
    );
  }

  function radarChart(areas) {
    const NS = "http://www.w3.org/2000/svg";
    const s = (tag, attrs, text) => {
      const el = doc.createElementNS(NS, tag);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      if (text != null) el.textContent = text;
      return el;
    };
    const n = areas.length;
    const cx = 160;
    const cy = 150;
    const R = 100;
    const pt = (i, r) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    };
    const poly = (r) => areas.map((_, i) => pt(i, r).map((c) => c.toFixed(1)).join(",")).join(" ");
    const filled = areas.every((a) => typeof a.value === "number" && a.value >= 0 && a.value <= 5);

    const desc = filled
      ? `Focus areas, self-assessed out of 5: ${areas.map((a) => `${a.label} ${a.value}`).join(", ")}.`
      : "Focus areas chart. Values not set yet.";
    const svg = s("svg", { viewBox: "-55 -5 430 305", role: "img", "aria-label": desc });

    for (let k = 1; k <= 5; k++) svg.append(s("polygon", { class: "radar__grid", points: poly((R * k) / 5) }));
    areas.forEach((_, i) => {
      const [x, y] = pt(i, R);
      svg.append(s("line", { class: "radar__axis", x1: cx, y1: cy, x2: x.toFixed(1), y2: y.toFixed(1) }));
    });
    const valuePts = areas
      .map((a, i) => pt(i, filled ? (R * a.value) / 5 : R * 0.6).map((c) => c.toFixed(1)).join(","))
      .join(" ");
    svg.append(s("polygon", { class: `radar__shape${filled ? "" : " is-placeholder"}`, points: valuePts }));
    areas.forEach((a, i) => {
      const [x, y] = pt(i, R + 18);
      const anchor = Math.abs(x - cx) < 4 ? "middle" : x > cx ? "start" : "end";
      // Wrap long labels onto several short lines, centred on the label point.
      const lines = [];
      for (const word of String(a.label).split(/\s+/)) {
        const last = lines[lines.length - 1];
        if (last && `${last} ${word}`.length <= 14) lines[lines.length - 1] = `${last} ${word}`;
        else lines.push(word);
      }
      const text = s("text", { class: "radar__label", x: x.toFixed(1), y: (y - (lines.length - 1) * 6).toFixed(1), "text-anchor": anchor, "dominant-baseline": "middle" });
      lines.forEach((line, j) => text.append(s("tspan", { x: x.toFixed(1), dy: j ? "12" : "0" }, line)));
      svg.append(text);
    });

    return h(
      "figure",
      { class: "radar" },
      svg,
      h(
        "figcaption",
        null,
        filled ? "Focus areas: where my time and interest go (self-assessed, 1–5)." : phChip("[PLACEHOLDER: set focusAreas values 1–5 in data.js]")
      )
    );
  }

  function caseSection(title, content) {
    return h("section", { class: "case" }, h("h2", null, title), h("div", { class: "case__body" }, content));
  }

  // Optional live preview of a website, framed like a browser window.
  function liveEmbed(embed) {
    if (!embed || !/^https:\/\//i.test(embed.src || "")) return null;
    const host = embed.src.replace(/^https:\/\/(www\.)?/i, "").replace(/\/$/, "");
    return h(
      "figure",
      { class: "site-embed" },
      h(
        "div",
        { class: "site-embed__bar" },
        h("span", { class: "site-embed__dots", "aria-hidden": "true" }, h("i"), h("i"), h("i")),
        h("span", { class: "site-embed__url" }, h("span", { class: "sr-only" }, "Address: "), host),
        h("a", { class: "btn btn--small", href: embed.src, target: "_blank", rel: "noopener" }, "Open ", h("span", { "aria-hidden": "true" }, "↗"), newTabNote())
      ),
      h(
        "div",
        { class: "site-embed__frame" },
        // No sandbox attribute: any sandbox blanks upset.live, and the browser
        // already isolates a cross-origin frame from this page. Only embed
        // sites you own or trust.
        h("iframe", {
          src: embed.src,
          title: embed.title || `Live preview of ${host}`,
          loading: "lazy",
          referrerpolicy: "strict-origin-when-cross-origin",
        })
      ),
      h("figcaption", null, embed.caption || "Live site, embedded. Scroll inside the frame to explore it, or open it in a new tab.")
    );
  }

  // Unity's default web template draws a fixed 960x600 canvas with a footer.
  // Inside our frame we stretch the canvas to fill it and hide the footer.
  const UNITY_FIT_CSS = `
    html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
    #unity-container { position: absolute !important; inset: 0 !important; left: 0 !important; top: 0 !important;
      width: 100% !important; height: 100% !important; transform: none !important; }
    #unity-canvas { display: block; width: 100% !important; height: 100% !important; }
    #unity-footer { display: none !important; }`;

  // A playable web game behind a "Play" button, so nothing downloads until asked.
  function gameEmbed(game, title) {
    const src = safeHref(game && game.src);
    if (!src) return null;
    const touchOnly = window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(pointer: fine)").matches;
    const stage = h("div", { class: "game__stage" });
    const fullBtn = h("button", { class: "btn btn--small", type: "button", hidden: true }, "Fullscreen");
    const status = h("p", { class: "sr-only", role: "status", "aria-live": "polite" });

    const start = () => {
      const frame = h("iframe", {
        src,
        title: `${title}: playable game`,
        allow: "fullscreen; autoplay; gamepad",
        allowfullscreen: true,
      });
      frame.addEventListener("load", () => {
        try {
          const doc = frame.contentDocument;
          doc.head.append(Object.assign(doc.createElement("style"), { textContent: UNITY_FIT_CSS }));
        } catch (e) {
          /* not same-origin (e.g. opened from file://): the game still runs at its own size */
        }
        frame.focus();
      });
      stage.replaceChildren(frame);
      fullBtn.hidden = false;
      status.textContent = "Game loading. Click inside the game to capture the mouse; press Esc to release it.";
    };

    fullBtn.addEventListener("click", () => {
      if (stage.requestFullscreen) stage.requestFullscreen().catch(() => {});
      const frame = stage.querySelector("iframe");
      if (frame) frame.focus();
    });

    stage.append(
      game.poster ? h("img", { class: "game__poster", src: safeHref(game.poster), alt: "", loading: "lazy" }) : null,
      h(
        "div",
        { class: "game__cover" },
        touchOnly ? h("p", { class: "game__warn" }, `${title} needs a keyboard and mouse, so it won't work on a phone or tablet. Try it on a computer.`) : null,
        h("button", { class: "btn btn--primary game__play", type: "button", onclick: start }, h("span", { "aria-hidden": "true" }, "▶ "), `Play ${title}`),
        h("p", { class: "game__note" }, [game.download ? `${game.download} download` : null, "desktop · keyboard and mouse"].filter(Boolean).join(" · "))
      )
    );

    return h(
      "section",
      { class: "game", "aria-label": `Play ${title}` },
      h(
        "div",
        { class: "game__bar" },
        h("span", { class: "game__exe" }, h("span", { class: "term__prompt" }, "PS C:\\games>"), ` .\\${title.toLowerCase()}.exe`),
        fullBtn,
        h("a", { class: "btn btn--small", href: src, target: "_blank", rel: "noopener" }, "Open ", h("span", { "aria-hidden": "true" }, "↗"), newTabNote())
      ),
      stage,
      list(game.controls).length
        ? h(
            "dl",
            { class: "game__controls", "aria-label": "Controls" },
            list(game.controls).map(([key, action]) => h("div", null, h("dt", null, h("kbd", null, key)), h("dd", null, action)))
          )
        : null,
      status
    );
  }

  const renderers = {
    "project-cards"(el) {
      const variant = el.dataset.variant || "compact";
      el.replaceChildren(...projects().map((p) => projectCard(p, variant)));
    },

    "projects-ls"(el) {
      const rows = projects().map((p) =>
        h(
          "tr",
          null,
          h("td", { class: "ls__mode" }, "d-r---"),
          h("td", null, p.type),
          h("td", null, h("a", { href: p.page }, `${p.number}-${p.id}`), " ", isPH(p.title) ? null : h("span", { class: "term__muted" }, `# ${p.title}`))
        )
      );
      el.replaceChildren(
        h("caption", { class: "sr-only" }, "Project folders"),
        h("thead", null, h("tr", null, h("th", { class: "ls__mode", scope: "col" }, "Mode"), h("th", { scope: "col" }, "Type"), h("th", { scope: "col" }, "Name"))),
        h("tbody", null, rows)
      );
    },

    portrait(el) {
      const a = SITE.about || {};
      el.replaceChildren(imageOr(a.photo, a.photoAlt, "PHOTO SLOT", "Add your photo in data.js"));
    },

    radar(el) {
      el.replaceChildren(radarChart(list(SITE.focusAreas)));
    },

    facts(el) {
      const rows = list((SITE.about || {}).facts).map(([k, v]) => h("tr", null, h("th", { scope: "row" }, k), h("td", null, txt(v))));
      el.replaceChildren(h("caption", { class: "sr-only" }, "Key facts"), h("tbody", null, rows));
    },

    bio(el) {
      el.replaceChildren(...paras((SITE.about || {}).bio));
    },

    toolkit(el) {
      const items = skillGroups()
        .filter((g) => g.about !== false)
        .flatMap((g) => list(g.items));
      el.replaceChildren(tags(items));
    },

    "project-head"(el) {
      const p = projects().find((x) => x.id === el.dataset.project);
      if (!p) {
        el.replaceChildren(phChip(`[PLACEHOLDER: no project with id "${el.dataset.project}" in data.js]`));
        return;
      }
      if (!isPH(p.title) && SITE.person) doc.title = `${p.title} — ${SITE.person.name}`;
      el.replaceChildren(
        h(
          "nav",
          { class: "crumbs", "aria-label": "Breadcrumb" },
          h("ol", null, h("li", null, h("a", { href: "index.html" }, "home")), h("li", null, h("a", { href: "projects.html" }, "projects")), h("li", { "aria-current": "page" }, `${p.number}-${p.id}`))
        ),
        h("div", { class: "project-head__meta" }, h("span", { class: "card__num", "aria-hidden": "true" }, plate(p)), h("span", { class: "tag tag--type" }, p.type)),
        h("h1", null, txt(p.title)),
        h("p", { class: "lede" }, txt(p.summary)),
        h("div", { class: "btn-row" }, linkBtn(p.links && p.links.live, "Live demo", { primary: true }), linkBtn(p.links && p.links.code, "View code"))
      );
    },

    "project-body"(el) {
      const all = projects();
      const i = all.findIndex((x) => x.id === el.dataset.project);
      const p = all[i];
      if (!p) return;
      const shots = list(p.screenshots).filter((s) => s && safeHref(s.src));
      const prev = all[(i - 1 + all.length) % all.length];
      const next = all[(i + 1) % all.length];
      const label = (x) => (isPH(x.title) ? `${plate(x)} · ${x.type}` : `${plate(x)} · ${x.title}`);

      el.replaceChildren(
        h(
          "dl",
          { class: "meta-strip" },
          h("div", null, h("dt", null, "Role"), h("dd", null, txt(p.role))),
          h("div", null, h("dt", null, "Timeline"), h("dd", null, txt(p.timeline))),
          h("div", null, h("dt", null, "Team"), h("dd", null, txt(p.team))),
          h("div", null, h("dt", null, "Tools"), h("dd", null, tags(p.tech)))
        ),
        // Media section: playable game, live embed and/or screenshots; left out entirely if none.
        p.game || p.embed || shots.length
          ? h(
              "section",
              { class: "media-block", "aria-label": p.game ? "Play the game" : p.embed ? "Live site and screenshots" : "Screenshots" },
              gameEmbed(p.game, isPH(p.title) ? p.type : String(p.title).split(/\s[–—-]\s/)[0]),
              liveEmbed(p.embed),
              shots.length
                ? h(
                    "div",
                    { class: p.screenshotLayout === "phone" ? "gallery gallery--phone" : "gallery" },
                    shots.map((s) => h("figure", null, imageOr(s.src, s.alt, "NO SIGNAL", s.src), s.caption ? h("figcaption", null, s.caption) : null))
                  )
                : null
            )
          : null,
        caseSection("Overview", paras(p.overview)),
        caseSection("Goal", paras(p.goal)),
        caseSection("What I built", bullets(p.built)),
        caseSection("Challenges", paras(p.challenges)),
        caseSection("What I learned", bullets(p.learned)),
        h(
          "nav",
          { class: "pager", "aria-label": "More projects" },
          h("a", { class: "btn", href: prev.page }, h("span", { class: "arrow", "aria-hidden": "true" }, "←"), " ", label(prev)),
          h("a", { class: "btn", href: next.page }, label(next), " ", h("span", { class: "arrow", "aria-hidden": "true" }, "→"))
        )
      );
    },

    cv(el) {
      const person = SITE.person || {};
      const links = SITE.links || {};
      const section = (title, ...content) => h("section", { class: "cv-section" }, h("h2", null, title), h("div", null, content));
      const entry = (title, meta, details) =>
        h("div", { class: "cv-entry" }, h("h3", null, txt(title)), meta ? h("p", { class: "cv-entry__meta" }, meta) : null, list(details).length ? bullets(details) : null);
      const roles = (items) => list(items).map((x) => entry(x.role, [txt(x.organisation), " · ", txt(x.dates)], x.details));
      const optional = (title, items, render) => (list(items).length ? section(title, render(items)) : null);
      const inline = (items) => h("p", null, list(items).map((x, i) => [i ? " · " : "", txt(x)]));
      const email = safeHref(links.email) ? link(`mailto:${links.email}`, links.email) : txt(links.email);

      el.replaceChildren(
        section(
          "Contact",
          h(
            "ul",
            { class: "cv-contact" },
            h("li", null, email),
            h("li", null, link(links.github, "GitHub")),
            h("li", null, link(links.linkedin, "LinkedIn")),
            h("li", null, txt(person.location))
          )
        ),
        section("Profile", h("p", null, txt(SITE.cvSummary || person.tagline))),
        section(
          "Skills",
          skillGroups().map((g) => h("p", null, h("strong", null, `${g.label}: `), list(g.items).map((x, i) => [i ? ", " : "", txt(x)])))
        ),
        section(
          "Experience",
          list(SITE.experience).length
            ? roles(SITE.experience)
            : h("p", null, phChip("[PLACEHOLDER: add jobs, internships, volunteering or societies to \"experience\" in data.js]"))
        ),
        section(
          "Projects",
          projects().map((p) =>
            h(
              "div",
              { class: "cv-entry" },
              h("h3", null, h("a", { href: p.page }, txt(p.title))),
              h("p", { class: "cv-entry__meta" }, `${p.type} · `, txt(p.timeline)),
              h("p", null, txt(p.summary)),
              tags(p.tech)
            )
          )
        ),
        optional("Leadership & community", SITE.leadership, roles),
        optional("Additional experience", SITE.additionalExperience, roles),
        section(
          "Education",
          list(SITE.education).map((e) => entry(e.qualification, [txt(e.institution), " · ", txt(e.dates)], e.details))
        ),
        optional("Languages", SITE.spokenLanguages, inline),
        optional("Interests", SITE.interests, inline)
      );
    },

    contact(el) {
      const links = SITE.links || {};
      const person = SITE.person || {};
      const status = doc.querySelector("[data-copy-status]");
      const emailOk = safeHref(links.email) && !isPH(links.email);
      const copyBtn = emailOk
        ? h(
            "button",
            {
              class: "btn btn--small",
              type: "button",
              onclick: async () => {
                try {
                  await navigator.clipboard.writeText(links.email);
                  if (status) status.textContent = "> email copied to clipboard";
                } catch (e) {
                  if (status) status.textContent = `> copy failed: select the address and copy it manually`;
                }
              },
            },
            "Copy"
          )
        : null;
      const row = (k, ...v) => [h("dt", null, k), h("dd", null, v)];
      el.replaceChildren(
        ...row("Email", emailOk ? link(`mailto:${links.email}`, links.email) : txt(links.email), copyBtn),
        ...row("GitHub", link(links.github, String(links.github).replace(/^https?:\/\/(www\.)?/i, ""))),
        ...row("LinkedIn", link(links.linkedin, String(links.linkedin).replace(/^https?:\/\/(www\.)?/i, ""))),
        ...row("Based", txt(person.location)),
        ...row("Timezone", txt(person.timezone))
      );
    },

    "social-links"(el) {
      const links = SITE.links || {};
      const item = (href, label) => h("li", null, safeHref(href) ? link(href, label) : phChip(`${label}: add in data.js`));
      const email = safeHref(links.email) && !isPH(links.email) ? `mailto:${links.email}` : links.email;
      el.replaceChildren(item(email, "Email"), item(links.github, "GitHub"), item(links.linkedin, "LinkedIn"));
    },
  };

  doc.querySelectorAll("[data-render]").forEach((el) => {
    const fn = renderers[el.dataset.render];
    if (!fn) return;
    try {
      fn(el);
    } catch (err) {
      console.error(`Couldn't render "${el.dataset.render}":`, err);
      el.replaceChildren(phChip(`[Couldn't build this section. Check data.js for a typo near "${el.dataset.render}".]`));
    }
  });

  /* --------------------------------------------------- home: fastfetch bits */

  const greet = doc.querySelector("[data-greeting]");
  if (greet) {
    const hr = new Date().getHours();
    const g = SITE.greetings || {};
    const msg = hr < 12 ? g.morning : hr < 18 ? g.afternoon : g.evening;
    if (msg) greet.textContent = msg;
  }

  const pad = (n) => String(n).padStart(2, "0");
  const clockEls = doc.querySelectorAll("[data-clock]");
  const onPageEls = doc.querySelectorAll("[data-onpage]");
  const started = Date.now();
  function tickClock() {
    const d = new Date();
    const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    clockEls.forEach((el) => (el.textContent = stamp));
    const mins = Math.floor((Date.now() - started) / 60000);
    onPageEls.forEach((el) => (el.textContent = mins < 1 ? "just arrived" : `${mins} min${mins === 1 ? "" : "s"}`));
  }
  if (clockEls.length || onPageEls.length) {
    tickClock();
    setInterval(tickClock, 15000);
  }

  // Type the command, then reveal the output (skipped for reduced motion).
  const term = doc.querySelector("[data-boot]");
  const cmd = term && term.querySelector(".term__cmd");
  if (term && cmd && !reduceMotion) {
    const full = cmd.textContent;
    term.classList.add("is-booting");
    cmd.textContent = "";
    let i = 0;
    const type = () => {
      i += 1;
      cmd.textContent = full.slice(0, i);
      if (i < full.length) setTimeout(type, 55 + Math.random() * 55);
      else setTimeout(() => term.classList.remove("is-booting"), 220);
    };
    setTimeout(type, 350);
  }
})();
