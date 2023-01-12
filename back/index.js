import config from "config";
import express from "express";
import { connect } from "mongoose";
import tokenValidator from "./utils/tokenValidator.js";
import UserRouter from "./routes/User/router.js";

//configs
const port = config.get("server.port");
const bd = config.get("databse.mongoURL");

//routing
const app = express();

// middlewares
app.use(express.json());

app.use(tokenValidator);

// ROUTES

app.use("/user", UserRouter);

app.listen(port, () => {
  connect(bd).then(() => console.log("Mongoo connected!!"));
  console.log(`Server has been started on port ${port}`);
});
