// ui.js

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-button");
  const soundBtn = document.getElementById("sound-toggle");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      if (typeof window.startGame === "function") {
        window.startGame();
      }
    });
  }

  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      if (typeof window.toggleSound === "function") {
        window.toggleSound();
      }
    });
  }
});