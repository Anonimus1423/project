import express from "express";
import { body } from "express-validator";
import tokenValidator from "../utils/tokenValidator.js";

const router = express.Router();

router.use(tokenValidator);

//TEST
router.get("/all", (req, res) => {
  return res.status(200).send({ data: [] });
});

export default router;
