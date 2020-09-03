import { videoList } from "../db";
import routes from "../routes";

//res.render(view[,locals variables for view -->{}로 표시][,callback--funcion])
export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", videoList });

//search
export const search = (req, res) => {
  //const searchingBy = req.query.term
  //아래와 같이 표현 가능
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videoList });
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

//upload
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = (req, res) => {
  const { body = { file, name, description } } = req;
  //Todo : 업로드 , 저장
  res.redirect(routes.videoDetail(111111));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
