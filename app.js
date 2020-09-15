import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
//export default를 한게 아니라 변수를 export 하면
// {}로 묶어서 import 해준다.
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//localMiddleware를거치고 router로 넘어가야 되기 때문에 여기에 위치.
app.use(localsMiddleware);

//use -> 누군가 /user 에 접속하면 router전체를 사용하겠다.
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

//누군가 내파일을 불러올 때 (import) app object 를 준다는 뜻
export default app;
