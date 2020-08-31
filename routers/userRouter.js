//router를 이용해서 app.js를 깔끔하게 할 수 도 있고
//page를 세분화 시킬 수 있다.
import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  changePassword,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassWord, changePassword);

export default userRouter;
