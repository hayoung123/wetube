import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const videoSlider = document.getElementById("video__slider");

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class = "fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class = "fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
}

function outFullScreen() {
  document.exitFullscreen();
  fullScreenBtn.innerHTML = '<i class= "fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen);
  fullScreenBtn.removeEventListener("click", outFullScreen);
}

function goFullScreen() {
  videoContainer.requestFullscreen();
  fullScreenBtn.innerHTML = '<i class= "fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", outFullScreen);
}

function formatDate(seconds) {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
}

function getCurrentTime() {
  const currentTimeString = formatDate(Math.ceil(videoPlayer.currentTime));
  currentTime.innerText = currentTimeString;
  videoSlider.value = videoPlayer.currentTime;
  if (videoPlayer.currentTime === 0) {
    videoSlider.value = 0;
  }
}

const setTotalTime = async () => {
  const blob = await fetch(videoPlayer.src).then((response) => response.blob());
  console.log(blob);
  const duration = await getBlobDuration(blob);
  videoSlider.max = duration;
  const totalTimeString = formatDate(duration);
  totalTime.innerText = totalTimeString;
  setInterval(getCurrentTime, 1000);
};

function handleEnd() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value > 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class = "fas fa-volume-mute"></i>';
  }
}

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
};

const handleSlide = (event) => {
  const {
    target: { value },
  } = event;
  videoPlayer.currentTime = value;
};

function init() {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  // videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("readyState", setTotalTime);
  //   videoPlayer.addEventListener("timeupdate", getCurrentTime);
  videoPlayer.addEventListener("ended", handleEnd);
  volumeRange.addEventListener("input", handleDrag);
  videoSlider.addEventListener("input", handleSlide);
}

if (videoContainer) {
  console.log("video ready!");
  init();
}
