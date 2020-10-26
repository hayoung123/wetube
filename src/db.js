import mongoose from "mongoose";
import dotenv from "dotenv";
//.env 파일을 load 하고 찾은 variable 을 process.env.key로 불러 올 수 있다.
dotenv.config();

mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅connected to DB");
const handleError = () => console.log(`❌Error on DB Connection: ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
