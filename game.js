let playerDeck = [];
let cpuDeck = [];
let playerTurn = true;
let gameOver = false;

const categories = ["Speed", "Power", "Service Ceiling", "Flight Range"];

window.startGame = function() {
  gameOver = false;
  playerTurn = true;
  const shuffled = shuffleArray(cards.slice());
  playerDeck = shuffled.filter((_, i) => i % 2 === 0);
  cpuDeck = shuffled.filter((_, i) => i % 2 === 1);
  updateCardCounts();
  showMessage("Spiel gestartet! Du bist am Zug.");
  renderCards();
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderCards() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  if (playerDeck.length === 0 || cpuDeck.length === 0) {
    return;
  }

  const playerCard = createCardElement(playerDeck[0], true);
  playerCard.classList.add("player-card");
  gameBoard.appendChild(playerCard);

  const cpuCard = createCardElement(cpuDeck[0], playerTurn ? false : true);
  cpuCard.classList.add("cpu-card");
  gameBoard.appendChild(cpuCard);

  updateCardCounts();
}

function createCardElement(card, faceUp) {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");
  if (!faceUp) {
    cardEl.classList.add("card-back");
    cardEl.style.backgroundImage = "url('card_back.png')";
    return cardEl;
  }

  cardEl.innerHTML = `
    <img src="${card.image}" alt="${card.name}" class="card-image" />
    <h3 class="card-name">${card.name}</h3>
    <ul class="categories">
      ${categories
        .map(
          (cat) =>
            `<li class="category" data-category="${cat}">${cat}: <span class="value">${card.categories[cat]}</span></li>`
        )
        .join("")}
    </ul>
  `;

  if (playerTurn) {
    const categoryEls = cardEl.querySelectorAll(".category");
    categoryEls.forEach((el) => {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        if (!gameOver) {
          categorySelected(el.dataset.category);
        }
      });
    });
  }

  return cardEl;
}

function categorySelected(category) {
  if (!playerTurn || gameOver) return;

  const playerCard = playerDeck[0];
  const cpuCard = cpuDeck[0];

  const playerValue = playerCard.categories[category];
  const cpuValue = cpuCard.categories[category];

  playerTurn = false;
  renderCards();

  highlightValues(category, playerValue, cpuValue);

  let roundWinner = null;
  if (playerValue > cpuValue) {
    roundWinner = "player";
    showMessage(`Du hast die Runde gewonnen! (${category}: ${playerValue} vs. ${cpuValue})`);
    playSound("win");
    playerDeck.push(playerDeck.shift());
    playerDeck.push(cpuDeck.shift());
  } else if (cpuValue > playerValue) {
    roundWinner = "cpu";
    showMessage(`CPU hat die Runde gewonnen! (${category}: ${cpuValue} vs. ${playerValue})`);
    cpuDeck.push(cpuDeck.shift());
    cpuDeck.push(playerDeck.shift());
  } else {
    roundWinner = "draw";
    showMessage(`Unentschieden! Beide Karten kommen zurück.`);
    playerDeck.push(playerDeck.shift());
    cpuDeck.push(cpuDeck.shift());
  }

  updateCardCounts();

  if (playerDeck.length === 0) {
    gameOver = true;
    showMessage("CPU hat das Spiel gewonnen!");
    playSound("win");
    return;
  } else if (cpuDeck.length === 0) {
    gameOver = true;
    showMessage("Du hast das Spiel gewonnen!");
    playSound("win");
    return;
  }

  if (roundWinner === "cpu" || roundWinner === "draw") {
    setTimeout(() => {
      cpuTurn();
    }, 2000);
  } else {
    playerTurn = true;
    setTimeout(() => {
      renderCards();
      showMessage("Du bist am Zug. Wähle eine Kategorie.");
    }, 2000);
  }
}

function cpuTurn() {
  if (gameOver) return;

  playerTurn = false;
  renderCards();

  const cpuCard = cpuDeck[0];
  let bestCategory = categories[0];
  let bestValue = cpuCard.categories[bestCategory];
  categories.forEach((cat) => {
    if (cpuCard.categories[cat] > bestValue) {
      bestCategory = cat;
      bestValue = cpuCard.categories[cat];
    }
  });

  categorySelected(bestCategory);
}

function highlightValues(category, playerValue, cpuValue) {
  const playerCardEl = document.querySelector(".player-card");
  const cpuCardEl = document.querySelector(".cpu-card");

  if (!playerCardEl || !cpuCardEl) return;

  const playerCatEl = playerCardEl.querySelector(`.category[data-category="${category}"] .value`);
  const cpuCatEl = cpuCardEl.querySelector(`.category[data-category="${category}"] .value`);

  if (playerValue > cpuValue) {
    playerCatEl.style.color = "green";
    cpuCatEl.style.color = "red";
  } else if (cpuValue > playerValue) {
    playerCatEl.style.color = "red";
    cpuCatEl.style.color = "green";
  } else {
    playerCatEl.style.color = "orange";
    cpuCatEl.style.color = "orange";
  }
}

function updateCardCounts() {
  // Optional: hier kannst du Kartenzähler anzeigen, wenn du möchtest
}

function showMessage(text) {
  const messageEl = document.getElementById("message");
  if (messageEl) messageEl.textContent = text;
}

function playSound(name) {
  if (typeof window.playSound === "function") {
    window.playSound(name);
  }
}