import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

//res.render(view[,locals variables for view -->{}로 표시][,callback--funcion])
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

//search
export const search = async (req, res) => {
  //const searchingBy = req.query.term
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
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
    creator: req.user._id,
  });
  const user = await User.findById(req.user._id);
  user.videos.push(newVideo._id);
  user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

//video Detail
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

//edit video
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user._id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

//delete video
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user._id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch {}
  res.redirect(routes.home);
};

//register video view
export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(200);
  } finally {
    res.end();
  }
};

//add comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: req.user._id,
    });
    video.comments.push(newComment.id);
    video.save();
    res.send({ commentId: newComment.id });
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

//delete comment
export const postDeleteComment = async (req, res) => {
  const {
    params: { id },
    body: { commentId },
  } = req;
  try {
    // const comment = await Comment.findById({ _id: commentId });
    await Comment.findByIdAndRemove({ _id: commentId });
    const video = await Video.findById(id);
    const commentIdx = video.comments.indexOf(commentId);
    video.comments.splice(commentIdx, 1);
    video.save();
    console.log(video);
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};
