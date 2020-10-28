const videoWrapper = document.getElementById("jsVideoWrapper");
const videoCover = document.getElementById("jsVideoCover");

const handleCover = (event) => {
  console.log(event);
  videoCover.classList.add("showing");
};

const handleCoverOut = (event) => {
  console.log(event);
  videoCover.classList.remove("showing");
};

function init() {
  videoWrapper.addEventListener("mouseover", handleCover);
  videoWrapper.addEventListener("mouseout", handleCoverOut);
}

if (videoWrapper) {
  init();
}
