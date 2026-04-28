const FALLBACK_SITE = {
  brand: "Fkjaha Games",
  sections: []
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
  return site;
}

function createLink(label, href, className = "tag") {
  const a = document.createElement("a");
  a.className = className;
  a.href = href;
  a.target = "_blank";
  a.rel = "noreferrer noopener";
  a.textContent = label;
  return a;
}

async function main() {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("id");
  if (!gameId) {
    window.location.href = "index.html";
    return;
  }

  const site = normalizeSiteData(await loadSiteData());
  
  // Find the game in any section
  let game = null;
  for (const section of site.sections) {
    game = section.items.find(item => String(item.steamAppId) === gameId);
    if (game) break;
  }

  if (!game) {
    $("#gameTitle").textContent = "Game Not Found";
    return;
  }

  // Populate data
  document.title = `${game.title} - Fkjaha Games`;
  $("#gameTitle").textContent = game.title;
  if ($("#gameGenreMeta")) $("#gameGenreMeta").textContent = game.genre || game.type || "N/A";
  $("#gameDescription").textContent = game.description;
  $("#gameDevelopers").textContent = game.developers || game.developer || "Fkjaha Games";
  $("#gamePublishers").textContent = game.publishers || game.publisher || "Fkjaha Games";
  $("#gameReleaseDate").textContent = game.releaseDate || game.release || "TBA";

  // Header Image
  if (game.media?.header) {
    const img = document.createElement("img");
    img.src = game.media.header;
    img.style.width = "100%";
    img.style.aspectRatio = "460/215";
    img.style.objectFit = "cover";
    img.style.border = "1px solid var(--line)";
    $("#gameHeader").appendChild(img);
  }

  // Links
  const linksWrap = $("#gameLinks");
  linksWrap.style.justifyContent = "center";
  if (game.links && game.links.length) {
    game.links.forEach(link => {
      linksWrap.appendChild(createLink(link.label, link.href, "button"));
    });
  } else if (game.steamAppId) {
    linksWrap.appendChild(createLink("Steam", `https://store.steampowered.com/app/${game.steamAppId}`, "button"));
  }

  // Screenshots
  const grid = $("#screenshotGrid");
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  const lightboxClose = $("#lightboxClose");
  const lightboxPrev = $("#lightboxPrev");
  const lightboxNext = $("#lightboxNext");

  if (game.media?.screenshots && game.media.screenshots.length) {
    const shots = game.media.screenshots;
    let currentIndex = 0;

    const showShot = (index) => {
      currentIndex = (index + shots.length) % shots.length;
      lightboxImg.src = shots[currentIndex].full || shots[currentIndex].thumbnail;
    };

    shots.forEach((shot, index) => {
      const item = document.createElement("div");
      item.className = "screenshot-item";
      const img = document.createElement("img");
      img.src = shot.full || shot.thumbnail;
      img.loading = "lazy";
      item.appendChild(img);
      
      item.onclick = () => {
        showShot(index);
        lightbox.classList.add("is-active");
        document.body.style.overflow = "hidden";
      };
      
      grid.appendChild(item);
    });

    lightboxPrev.onclick = (e) => {
      e.stopPropagation();
      showShot(currentIndex - 1);
    };

    lightboxNext.onclick = (e) => {
      e.stopPropagation();
      showShot(currentIndex + 1);
    };

  } else {
    $("#screenshotSection").style.display = "none";
    if (lightboxPrev) lightboxPrev.style.display = "none";
    if (lightboxNext) lightboxNext.style.display = "none";
  }

  lightbox.addEventListener("click", (e) => {
    // Only close if clicking the background overlay or the close button
    if (e.target === lightbox || e.target === lightboxClose) {
      lightbox.classList.remove("is-active");
      document.body.style.overflow = "";
    }
  });

  lightboxClose.onclick = (e) => {
    e.stopPropagation();
    lightbox.classList.remove("is-active");
    document.body.style.overflow = "";
  };

  $("#year").textContent = String(new Date().getFullYear());
}

main().catch(console.error);
