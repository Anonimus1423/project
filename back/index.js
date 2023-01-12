import config from "config";
import express from "express";
import { connect } from "mongoose";

//configs
const port = config.get("server.port");
const bd = config.get("databse.mongoURL");

//routing
const app = express();

app.get("/", (req, res) => {
  res.json({ started: true });
});

app.listen(port, () => {
  connect(bd).then(() => console.log("Mongoo connected!!"));
  console.log(`Server has been started on port ${port}`);
});
