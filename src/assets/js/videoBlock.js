const { formatDate } = require("./videoPlayer");

const videoWrapper = document.querySelectorAll(".video__wrapper");
const videoCover = document.querySelectorAll("#jsVideoCover");

const handleCover = (index) => {
  videoCover[index].classList.add("showing");
};

const handleCoverOut = (index) => {
  videoCover[index].classList.remove("showing");
};

const setCoverTime = () => {};

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
      setCoverTime();
    }
  };
}

if (videoWrapper) {
  init();
}
