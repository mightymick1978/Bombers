// audio.js

const sounds = {
  flip: new Audio("flip.mp3"),
  win: new Audio("win_sound.mp3"),
};

let soundEnabled = true;

function playSound(name) {
  if (!soundEnabled) return;
  const sound = sounds[name];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById("sound-toggle");
  if (btn) {
    btn.textContent = soundEnabled ? "🔊 Sound an" : "🔇 Sound aus";
  }
}