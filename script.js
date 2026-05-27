const games = [
  { name: "Cookie Clicker", url: "https://orteil.dashnet.org/cookieclicker/", category: "idle" },
  { name: "Slope", url: "https://slope-game.github.io/", category: "arcade" },
  { name: "2048", url: "https://play2048.co/", category: "puzzle" },
  { name: "Run 3", url: "https://run3.io/", category: "arcade" }
];

let currentList = games;

const grid = document.getElementById("grid");
const search = document.getElementById("search");

function render(list) {
  grid.innerHTML = "";
  list.forEach(g => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${g.name}</h3><p>${g.category}</p>`;
    div.onclick = () => openGame(g);
    grid.appendChild(div);
  });
}

function openGame(game) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("title").innerText = game.name;
  document.getElementById("frame").src = game.url;

  let recent = JSON.parse(localStorage.getItem("recent") || "[]");
  recent.unshift(game);
  localStorage.setItem("recent", JSON.stringify(recent.slice(0, 10)));
}

function closeGame() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("frame").src = "";
}

function filter(cat) {
  if (cat === "all") return render(games);
  render(games.filter(g => g.category === cat));
}

search.addEventListener("input", e => {
  const v = e.target.value.toLowerCase();
  render(games.filter(g => g.name.toLowerCase().includes(v)));
});

function showFavorites() {
  let favs = JSON.parse(localStorage.getItem("fav") || "[]");
  render(favs);
}

function showRecent() {
  let recent = JSON.parse(localStorage.getItem("recent") || "[]");
  render(recent);
}

render(games);
