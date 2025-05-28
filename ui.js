// ui.js

// Initial UI Setup
document.getElementById("start-button").addEventListener("click", () => {
  startGame();
});

document.getElementById("sound-toggle").addEventListener("click", () => {
  toggleSound();
});

function updateCardCountsUI() {
  const playerCountEl = document.getElementById("player-card-count");
  const cpuCountEl = document.getElementById("cpu-card-count");

  if (!playerCountEl) {
    const playerCount = document.createElement("div");
    playerCount.id = "player-card-count";
    playerCount.style.textAlign = "center";
    playerCount.style.marginTop = "10px";
    document.querySelector(".player-card")?.parentElement?.appendChild(playerCount);
  }
  if (!cpuCountEl) {
    const cpuCount = document.createElement("div");
    cpuCount.id = "cpu-card-count";
    cpuCount.style.textAlign = "center";
    cpuCount.style.marginTop = "10px";
    document.querySelector(".cpu-card")?.parentElement?.appendChild(cpuCount);
  }
}

function updateCardCounts() {
  const playerCountEl = document.getElementById("player-card-count");
  const cpuCountEl = document.getElementById("cpu-card-count");

  if (playerCountEl) playerCountEl.textContent = `Karten: ${playerDeck.length}`;
  if (cpuCountEl) cpuCountEl.textContent = `Karten: ${cpuDeck.length}`;
}