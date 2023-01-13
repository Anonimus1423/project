import express from "express";
import * as services from "./services.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  body("name")
    .isLength({ min: 4 })
    .withMessage("Must be at least 4 chars long"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 chars long"),
  services.store
);

router.get("/login", services.loginUser);
router.get("/auth", services.authUser);

export default router;
