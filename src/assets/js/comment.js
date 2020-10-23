import axios from "axios";
import { doc } from "prettier";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteCommentBtn = document.querySelectorAll("#jsDeleteCommentBtn");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML) + 1;
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btn = document.createElement("div");
  const icon = document.createElement("i");
  span.innerHTML = comment;
  icon.classList.add("fas");
  icon.classList.add("fa-times");
  btn.appendChild(icon);
  li.appendChild(span);
  li.appendChild(btn);
  commentList.prepend(li);
  increaseNumber();
};

const sendComments = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "post",
    data: {
      comment: comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComments(comment);
  commentInput.value = "";
};

const deleteComment = async (element) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "post",
    data: {
      commentId: element.id,
    },
  });
  if (response.status === 200) {
    element.remove();
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
  }
};

const handleDelete = (event) => {
  deleteComment(event.path[2]);
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteCommentBtn.forEach((element) => {
    element.addEventListener("click", handleDelete);
  });
}

if (addCommentForm) {
  init();
}
