import express from "express";
import * as services from "./services.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  body("name").isLength({ min: 4 }),
  body("password").isLength({ min: 8 }),
  services.store
);

export default router;
