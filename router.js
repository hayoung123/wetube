//router를 이용해서 app.js를 깔끔하게 할 수 도 있고
//page를 세분화 시킬 수 있다.
import express from "express";

//userRouter를 app.js에 export하기 위해
export const userRouter = express.Router();

//router는 많은 route들이 담긴 파일
userRouter.get("/", (req, res) => res.send("user index"));
userRouter.get("/edit", (req, res) => res.send("user edit"));
userRouter.get("/password", (req, res) => res.send("user password"));
