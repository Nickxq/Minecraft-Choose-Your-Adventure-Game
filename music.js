window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bgm');
  if (!audio) return;

  const STORAGE_KEY = 'mc_bgm_time';

  const savedTime = parseFloat(localStorage.getItem(STORAGE_KEY) || '0');

  audio.volume = 0.5;
  audio.loop = true;


  audio.currentTime = isNaN(savedTime) ? 0 : savedTime;
  

  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {
      const unlock = () => {
        audio.play();
        document.removeEventListener('click', unlock);
        document.removeEventListener('keydown', unlock);
      };
      document.addEventListener('click', unlock);
      document.addEventListener('keydown', unlock);
    });
  }

  setInterval(() => {
    if (!audio.paused) {
      localStorage.setItem(STORAGE_KEY, audio.currentTime);
    }
  }, 500);
});
