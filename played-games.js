document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("playedGamesList");
  const state = document.getElementById("playedGamesState");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Header scroll state
  const header = document.getElementById("siteHeader");
  const updateHeader = () => {
    if (header) header.classList.toggle("is-solid", window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  async function loadPlayedGames() {
    try {
      const response = await fetch("content/played-games.txt", { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load played games data.");
      
      const text = await response.text();
      const lines = text.split("\n").map(l => l.trim()).filter(l => l);
      
      if (lines.length <= 1) {
        state.textContent = "No games found.";
        return;
      }

      // If there's a header like 'Title', ignore it, else treat all as data
      let dataLines = lines;
      if (lines[0].toLowerCase().includes('title')) {
        dataLines = lines.slice(1);
      }
      
      listContainer.innerHTML = "";
      state.style.display = "none";

      dataLines.forEach((title, index) => {
        if (title) {
          const listItem = document.createElement("a");
          listItem.href = `https://www.google.com/search?q=${encodeURIComponent(title + " game")}`;
          listItem.target = "_blank";
          listItem.rel = "noopener noreferrer";
          listItem.className = `played-list-item reveal reveal-stagger-${Math.min(index + 1, 6)}`;

          const rankEl = document.createElement("div");
          rankEl.className = "played-list-rank";
          rankEl.textContent = `#${index + 1}`;

          const titleEl = document.createElement("h3");
          titleEl.className = "card-title";
          titleEl.textContent = title;

          listItem.appendChild(rankEl);
          listItem.appendChild(titleEl);
          listContainer.appendChild(listItem);
        }
      });

      installRevealObserver();

    } catch (error) {
      console.error(error);
      state.textContent = "Failed to load played games list.";
    }
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

  loadPlayedGames();
});
