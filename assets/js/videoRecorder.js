const recorderContainer = document.getElementById("jsRecorderContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

async function startRecording() {
  let stream;
  try {
    const constraints = { audio: true, video: { width: 1280, height: 720 } };
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop";
  } catch {
    recordBtn.innerHTML = "😥Can't Record";
    recordBtn.removeEventListener("click", startRecording);
  }
}

function init() {
  recordBtn.addEventListener("click", startRecording);
}

if (recorderContainer) {
  init();
}
