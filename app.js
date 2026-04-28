const FALLBACK_SITE = {
  brand: "Fkjaha Games",
  eyebrow: "Independent game studio",
  lead: "An indie developer creating games.",
  stats: [
    { label: "Years active", value: "Since 2019" },
    { label: "Base", value: "Europe" },
  ],
  socials: [
    { label: "Steam", href: "https://store.steampowered.com/curator/43783746" },
    { label: "Itch.io", href: "https://fkjaha.itch.io" },
    { label: "Discord", href: "https://discord.com/invite/wX6b8AcDfS" },
    { label: "YouTube", href: "https://www.youtube.com/@fkjahadev" },
    { label: "X", href: "https://x.com/fkjaha_dev" }
  ],
  contactEmail: "fkjaha@gmail.com",
  sections: [
    {
      id: "upcoming",
      title: "Upcoming Games",
      description: "New releases and work in progress.",
      items: [
        {
          title: "Cell Servant",
          type: "Upcoming Steam release",
          description: "First person horror game about a guy working as a cell servant in an unknown prison.",
          steamAppId: "3686460",
          genre: "Horror",
          developers: "Fkjaha Games",
          publishers: "Fkjaha Games",
          releaseDate: "Coming Soon",
          media: {
            header: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3686460/header.jpg",
            poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3686460/123a81c3f212382c99235f05fb83f33fbe8a0d79/capsule_616x353.jpg?t=1746756738"
          },
          links: [
            { label: "Steam", href: "https://store.steampowered.com/app/3686460/Cell_Servant/?curator_clanid=4777282" }
          ]
        }
      ]
    },
    {
      id: "pc",
      title: "PC Games",
      description: "Released and announced PC projects.",
      items: [
        {
          title: "Flashing Dark",
          type: "First-person horror",
          genre: "Horror",
          developers: "Fkjaha Games",
          publishers: "Fkjaha Games",
          releaseDate: "Released",
          steamAppId: "2838490",
          media: {
            header: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2838490/header.jpg",
            poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2838490/capsule_616x353.jpg?t=1746367778"
          },
          links: [
            { label: "Steam", href: "https://store.steampowered.com/app/2838490/Flashing_Dark/" },
            { label: "Demo", href: "https://fkjaha.itch.io" }
          ]
        },
        {
          title: "Utter Takedown",
          type: "Stealth action",
          genre: "Action, Stealth",
          developers: "Fkjaha Games",
          publishers: "Fkjaha Games",
          releaseDate: "Released",
          steamAppId: "2338500",
          media: {
            header: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2338500/header.jpg",
            poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2338500/capsule_616x353.jpg?t=1746367739"
          },
          links: [
            { label: "Steam", href: "https://store.steampowered.com/app/2338500/Utter_Takedown/" }
          ]
        },
        {
          title: "Nevermind This",
          type: "First-person horror",
          genre: "Horror",
          developers: "Fkjaha Games",
          publishers: "Fkjaha Games",
          releaseDate: "Released",
          steamAppId: "2181100",
          media: {
            header: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2181100/header.jpg",
            poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2181100/capsule_616x353.jpg?t=1746367686"
          },
          links: [
            { label: "Steam", href: "https://store.steampowered.com/app/2181100/Nevermind_This/" }
          ]
        },
        {
          title: "Objective H.A.S.T.E.",
          type: "Horror survival escape",
          genre: "Horror, Survival",
          developers: "Fkjaha Games",
          publishers: "Fkjaha Games",
          releaseDate: "Released",
          steamAppId: "1631170",
          media: {
            header: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1631170/header.jpg",
            poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1631170/capsule_616x353.jpg?t=1746367957"
          },
          links: [
            { label: "Steam", href: "https://store.steampowered.com/app/1631170/Objective_HASTE__Survival_Horror_Escape/" }
          ]
        }
      ]
    },
    {
      id: "jams",
      title: "Jam Games",
      description: "Small experiments made for game jams.",
      items: [
        {
          title: "SURVAIMA",
          type: "Wowie Jam 4.0",
          description: "A compact jam entry created for Wowie Jam 4.0.",
          media: {
            poster: "https://img.itch.zone/aW1hZ2UvMTY2MzYxMC85NzkxNjA4LnBuZw==/original/WayM%2BX.png"
          },
          links: [
            { label: "Itch.io", href: "https://fkjaha.itch.io/survaima" }
          ]
        },
        {
          title: "Score Calculator Simulator",
          type: "GMTK Game Jam 2023",
          description: "A jam game built for GMTK Game Jam 2023.",
          media: {
            poster: "https://img.itch.zone/aW1nLzEyNzIxNjY2LnBuZw==/315x250%23c/Vq0kK2.png"
          },
          links: [
            { label: "Itch.io", href: "https://fkjaha.itch.io/score-calculator" }
          ]
        },
        {
          title: "99 Layers of the Looped Dungeon",
          type: "GMTK Game Jam 2025",
          description: "A fast jam project for GMTK Game Jam 2025.",
          media: {
            poster: "https://img.itch.zone/aW1hZ2UvMzc3NzM5MS8yMjUwOTc2Ny5wbmc=/347x500/lNKfKl.png"
          },
          links: [
            { label: "Itch.io", href: "https://fkjaha.itch.io/99-layers-of-the-looped-dungeon" }
          ]
        }
      ]
    }
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);

async function loadJSON(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`${path} not available`);
  return response.json();
}

async function loadSiteData() {
  for (const path of ["content/site.generated.json", "content/site.json"]) {
    try {
      return await loadJSON(path);
    } catch (error) {
      // continue
    }
  }
  return FALLBACK_SITE;
}

function normalizeSiteData(raw) {
  const site = { ...FALLBACK_SITE, ...raw };
  site.sections = Array.isArray(raw?.sections) && raw.sections.length ? raw.sections : FALLBACK_SITE.sections;
  site.socials = Array.isArray(raw?.socials) && raw.socials.length ? raw.socials : FALLBACK_SITE.socials;
  site.stats = Array.isArray(raw?.stats) && raw.stats.length ? raw.stats : FALLBACK_SITE.stats;
  return site;
}

function createLink(label, href, className = "tag") {
  const a = document.createElement("a");
  a.className = className;
  a.href = href;
  a.target = href.startsWith("mailto:") || href.startsWith("#") ? "_self" : "_blank";
  a.rel = a.target === "_blank" ? "noreferrer noopener" : "";
  a.textContent = label;
  return a;
}

function createMedia(item) {
  const wrap = document.createElement("div");
  wrap.className = "card-media";

  const poster = document.createElement("img");
  poster.loading = "lazy";
  poster.alt = `${item.title} artwork`;
  poster.src = item.media?.header || item.media?.poster || item.media?.thumbnail || item.media?.image || "";
  wrap.appendChild(poster);

  if (item.media?.video) {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = "metadata";
    video.src = item.media.video;
    video.setAttribute("aria-hidden", "true");
    wrap.appendChild(video);
  }

  const overlay = document.createElement("div");
  overlay.className = "card-overlay";
  wrap.appendChild(overlay);

  return wrap;
}

function wireVideo(card) {
  const video = card.querySelector("video");
  if (!video) return;

  const play = () => {
    try {
      video.currentTime = 0;
      void video.play();
    } catch { }
  };

  const pause = () => {
    try {
      video.pause();
      video.currentTime = 0;
    } catch { }
  };

  card.addEventListener("mouseenter", play);
  card.addEventListener("mouseleave", pause);
  card.addEventListener("focusin", play);
  card.addEventListener("focusout", pause);
}

function renderHero(site) {
  $("#heroEyebrow").textContent = site.eyebrow || "Independent game studio";
  $("#studioTitle").textContent = site.brand || "Fkjaha Games";
  $("#studioLead").textContent = site.lead || FALLBACK_SITE.lead;

  const actions = $("#heroActions");
  actions.replaceChildren();

  const primary = createLink("View Games", "#games", "button is-primary");
  const steam = createLink("Steam", "https://store.steampowered.com/curator/45919107", "button");
  const itch = createLink("Itch.io", "https://fkjaha.itch.io", "button");
  actions.append(primary, steam, itch);

  const stats = $("#heroStats");
  stats.replaceChildren();
  for (const stat of site.stats.slice(0, 4)) {
    const dt = document.createElement("dt");
    dt.textContent = stat.label;
    const dd = document.createElement("dd");
    dd.textContent = stat.value;
    stats.append(dt, dd);
  }
}



function renderSections(site) {
  const root = $("#sectionList");
  root.replaceChildren();

  for (const section of site.sections) {
    const wrap = document.createElement("section");
    wrap.className = "game-section";

    const header = document.createElement("div");
    header.className = "game-section-header";
    header.innerHTML = `<h3>${section.title}</h3>`;

    const grid = document.createElement("div");
    grid.className = section.id === "jams" ? "card-grid card-grid-jams" : "card-grid";

    let cardIndex = 0;
    for (const item of section.items || []) {
      cardIndex++;
      const card = document.createElement("a");

      if (section.id === "jams" && item.links && item.links.length > 0) {
        card.href = item.links[0].href;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      } else {
        card.href = item.steamAppId ? `game.html?id=${item.steamAppId}` : "#";
      }

      card.className = `game-card reveal reveal-stagger-${Math.min(cardIndex, 6)}`;

      const media = createMedia(item);
      card.appendChild(media);
      wireVideo(card);

      const body = document.createElement("div");
      body.className = "card-body";

      const title = document.createElement("h4");
      title.className = "card-title";
      title.textContent = item.title;

      const meta = document.createElement("div");
      meta.className = "card-meta";

      if (section.id === "jams") {
        meta.innerHTML = `<span><strong>Jam:</strong> ${item.type || item.genre || "Jam Entry"}</span>`;
      } else {
        meta.innerHTML = `
          <span><strong>Genre:</strong> ${item.genre || item.type || "N/A"}</span>
          <span><strong>Dev:</strong> ${item.developers || item.developer || "Fkjaha Games"}</span>
          <span><strong>Publisher:</strong> ${item.publishers || item.publisher || "Fkjaha Games"}</span>
          <span><strong>Release:</strong> ${item.releaseDate || item.release || "TBA"}</span>
        `;
      }

      body.append(title, meta);
      card.appendChild(body);
      grid.appendChild(card);
    }

    wrap.append(header, grid);
    root.appendChild(wrap);
  }
}

function renderContact(site) {
  const root = $("#contactLinks");
  root.replaceChildren();
  for (const item of site.socials) {
    root.append(createLink(item.label, item.href));
  }
  root.append(createLink(`Email: ${site.contactEmail || "fkjaha@gmail.com"}`, `mailto:${site.contactEmail || "fkjaha@gmail.com"}`));
}

function installScrollState() {
  const header = $("#siteHeader");
  const update = () => {
    header.classList.toggle("is-solid", window.scrollY > 12);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function installRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

async function main() {
  const site = normalizeSiteData(await loadSiteData());

  renderHero(site);
  renderSections(site);
  renderContact(site);

  const footer = $("#footerText");
  if (footer) footer.innerHTML = `© <span id="year">${new Date().getFullYear()}</span> ${site.brand || "Fkjaha Games"}.`;

  $("#year").textContent = String(new Date().getFullYear());
  installScrollState();
  installRevealObserver();
}

main().catch((error) => {
  console.error(error);
  document.body.insertAdjacentHTML(
    "afterbegin",
    '<div style="padding:16px;border-bottom:1px solid rgba(255,255,255,.14);background:#181b22;color:#fff">The site data could not be loaded.</div>'
  );
});
