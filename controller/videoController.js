import routes from "../routes";
import Video from "../models/Video";

//res.render(view[,locals variables for view -->{}로 표시][,callback--funcion])
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    console.log(videos);
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

//search
export const search = (req, res) => {
  //const searchingBy = req.query.term
  //아래와 같이 표현 가능
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videoList });
};

//upload
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  //Todo : 업로드 , 저장
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
