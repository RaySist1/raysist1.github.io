const videoElement = document.getElementById("video");
const playPauseButton = document.getElementById("playPause");
const muteButton = document.getElementById("muteUnmute");
const volumeSlider = document.getElementById("volumeSlider");
const seekBar = document.getElementById("seekBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const helpButton = document.getElementById("helpButton");
const helpModal = document.getElementById("helpModal");
const closeHelp = document.getElementById("closeHelp");

// Double-tap detection variables
let lastTap = 0;

// Play/Pause Button
playPauseButton.addEventListener("click", togglePlayPause);

function togglePlayPause() {
  if (videoElement.paused) {
    videoElement.play();
    playPauseButton.innerHTML = "<i class='icon'>⏸</i>";
  } else {
    videoElement.pause();
    playPauseButton.innerHTML = "<i class='icon'>▶</i>";
  }
}

// Mute/Unmute Button
muteButton.addEventListener("click", () => {
  videoElement.muted = !videoElement.muted;
  muteButton.innerHTML = videoElement.muted ? "<i class='icon'>🔇</i>" : "<i class='icon'>🔈</i>";
  volumeSlider.value = videoElement.muted ? 0 : videoElement.volume * 100;
});

// Volume Slider Control
volumeSlider.addEventListener("input", () => {
  videoElement.volume = volumeSlider.value / 100;
  videoElement.muted = volumeSlider.value == 0;
  muteButton.innerHTML = videoElement.muted ? "<i class='icon'>🔇</i>" : "<i class='icon'>🔈</i>";
});

// Update Seek Bar and Time Display
videoElement.addEventListener("timeupdate", () => {
  seekBar.value = (videoElement.currentTime / videoElement.duration) * 100;
  currentTimeDisplay.textContent = formatTime(videoElement.currentTime);
  durationDisplay.textContent = formatTime(videoElement.duration);
});

// Seek Bar functionality
seekBar.addEventListener("input", () => {
  const seekTo = (seekBar.value / 100) * videoElement.duration;
  videoElement.currentTime = seekTo;
});

// Toggle Fullscreen
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    videoElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Show Help Modal
helpButton.addEventListener("click", () => {
  helpModal.style.display = "flex";
});

// Close Help Modal
closeHelp.addEventListener("click", () => {
  helpModal.style.display = "none";
});

// Set duration on load
videoElement.addEventListener("loadedmetadata", () => {
  durationDisplay.textContent = formatTime(videoElement.duration);
});

// Format Time function to handle hours, minutes, and seconds
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  } else {
    return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  }
}

// Keyboard Shortcuts
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
      event.preventDefault(); // Prevent default space scrolling
      togglePlayPause();
      break;
    case "ArrowLeft":
      videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
      break;
    case "ArrowRight":
      videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 10);
      break;
    case "f":
      toggleFullscreen();
      break;
  }
});

// Double-tap detection for mobile gestures
const doubleTapZones = document.querySelectorAll('.hot-zone');
doubleTapZones.forEach(zone => {
  zone.addEventListener("touchend", (event) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastTap < 300) {  // Detect double-tap within 300ms
      handleDoubleTap(zone.getAttribute("data-action"));
    }
    lastTap = currentTime;
  });
});

function handleDoubleTap(action) {
  switch(action) {
    case "rewind":
      videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
      break;
    case "forward":
      videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 10);
      break;
    case "fullscreen":
      toggleFullscreen();
      break;
  }
}
