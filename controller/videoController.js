//res.render(view[,locals variables for view -->{}로 표시][,callback--funcion])
export const home = (req, res) => res.render("home", { pageTitle: "Home" });

export const search = (req, res) => {
  //const searchingBy = req.query.term
  //아래와 같이 표현 가능
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy });
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });
export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) =>
  res.render("vidoeDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
