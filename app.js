import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
//export default를 한게 아니라 변수를 export 했기 때문
import { userRouter } from "./router";
const app = express();

const handleHome = (req, res) => res.send("Hello from my cool home");

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);
app.get("/profile", handleProfile);
//use -> 누군가 /user 에 접속하면 router전체를 사용하겠다.
app.use("/user", userRouter);

//누군가 내파일을 불러올 때 (import) app object 를 준다는 뜻
export default app;
