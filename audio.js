const sounds = {
  flip: new Audio('flip.mp3'),
  win: new Audio('win_sound.mp3')
};

let soundEnabled = true;

window.playSound = function(name) {
  if (!soundEnabled) return;
  if (sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play().catch(e => {
      console.warn(`Sound ${name} konnte nicht abgespielt werden:`, e);
    });
  }
};

window.toggleSound = function() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('sound-toggle');
  if (btn) {
    btn.textContent = soundEnabled ? '🔊 Sound an' : '🔇 Sound aus';
  }
};