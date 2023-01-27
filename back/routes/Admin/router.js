import express from "express";
import * as services from "./services.js";
import { body } from "express-validator";
import tokenValidator from "../../utils/tokenValidator.js";

const router = express.Router();

router.use(tokenValidator);

router.post(
  "/create",
  body("title").notEmpty().withMessage("Title field required"),
  body("description").notEmpty().withMessage("Description field required"),
  services.createCourse
);

router.get("/get-all-users", services.getUsersList);

router.get("/get-all-courses", services.getCoursesList);

export default router;