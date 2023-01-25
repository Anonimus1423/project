import config from "config";
import express from "express";
import { connect } from "mongoose";
import tokenValidator from "./utils/tokenValidator.js";
import UserRouter from "./routes/User/router.js";
import Router from "./routes/router.js";
import AdminRouter from "./routes/Admin/router.js";

//configs
const port = config.get("server.port");
const bd = config.get("databse.mongoURL");

//routing
const app = express();

// middlewares
app.use(express.json());

// ROUTES

app.use("/user", UserRouter);
app.use("/api", Router);
app.use("/admin", AdminRouter);

app.listen(port, () => {
  connect(bd).then(() => console.log("Mongoo connected!!"));
  console.log(`Server has been started on port ${port}`);
});
