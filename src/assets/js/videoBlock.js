import getBlobDuration from "get-blob-duration";
const { formatDate } = require("./videoPlayer");

const videoWrapper = document.querySelectorAll(".video__wrapper");
const videoThumbnail = document.querySelectorAll("#jsVideoThumbnail");
const videoCover = document.querySelectorAll("#jsVideoCover");

const handleCover = (index) => {
  videoCover[index].classList.add("showing");
  videoCover[index].classList.remove("hidden");
};

const handleCoverOut = (index) => {
  videoCover[index].classList.remove("showing");
  videoCover[index].classList.add("hidden");
};

const setCoverTime = async (index) => {
  const blob = await fetch(videoThumbnail[index].src).then((response) =>
    response.blob()
  );
  const duration = await getBlobDuration(blob);
  const totalTimeString = formatDate(duration);
  const span = document.createElement("span");
  span.innerText = totalTimeString;
  videoCover[index].appendChild(span);
};

function init() {
  videoWrapper.forEach((item, index) => {
    item.addEventListener("mouseover", function () {
      handleCover(index);
    });
    item.addEventListener("mouseout", function () {
      handleCoverOut(index);
    });
  });

  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      videoWrapper.forEach((item, index) => {
        setCoverTime(index);
      });
    }
  };
}

if (videoWrapper) {
  init();
}
