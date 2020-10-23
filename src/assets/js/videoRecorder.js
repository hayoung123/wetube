const recorderContainer = document.getElementById("jsRecorderContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handelVideoData = (event) => {
  const { data: videoDownloadFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoDownloadFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handelVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", startRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Record";
};

async function getVideo() {
  try {
    const constraints = { audio: true, video: { width: 1280, height: 720 } };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    streamObject = stream;
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop";
    startRecording();
  } catch {
    recordBtn.innerHTML = "😥Can't Record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
}

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
