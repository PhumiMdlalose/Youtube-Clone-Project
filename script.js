const searchForm = document.querySelector("#video-search");
const searchInput = document.querySelector("#search-input");
const videoCards = [...document.querySelectorAll(".video-div")];
const emptyMessage = document.querySelector("#search-empty");
const themeToggle = document.querySelector("#theme-toggle");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLocaleLowerCase();
  let visibleCards = 0;

  videoCards.forEach((card) => {
    const matches = card.textContent.toLocaleLowerCase().includes(query);
    card.hidden = !matches;
    visibleCards += Number(matches);
  });

  emptyMessage.hidden = visibleCards > 0;
});

function updateTheme(theme) {
  const isLight = theme === "light";
  document.documentElement.dataset.theme = isLight ? "light" : "dark";
  themeToggle.setAttribute("aria-pressed", String(isLight));

  const nextTheme = isLight ? "dark" : "light";
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  themeToggle.title = `Switch to ${nextTheme} theme`;
  themeToggle.querySelector("i").textContent = isLight ? "dark_mode" : "light_mode";
}

let savedTheme = "dark";

try {
  savedTheme = localStorage.getItem("youtube-clone-theme") === "light" ? "light" : "dark";
} catch (error) {
  console.error("Could not load the saved theme preference.", error);
}

updateTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  updateTheme(nextTheme);

  try {
    localStorage.setItem("youtube-clone-theme", nextTheme);
  } catch (error) {
    console.error("Could not save the theme preference.", error);
  }
});
