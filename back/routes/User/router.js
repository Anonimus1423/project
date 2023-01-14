import express from "express";
import * as services from "./services.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/step1",
  body("name")
    .isLength({ min: 4 })
    .withMessage("Must be at least 4 chars long"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 chars long"),
  body("mail").isEmail().withMessage("Invalid Email"),
  services.step1
);

router.post(
  "/step2",
  body("code")
    .isLength({ min: 6 })
    .withMessage('"Must be at least 6 chars long'),
  services.step2
);

router.get("/login", services.loginUser);
router.get("/auth", services.authUser);

export default router;
