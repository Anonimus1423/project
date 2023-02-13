import express from "express";
import { body } from "express-validator";
import tokenValidator from "../utils/tokenValidator.js";
import CoursesRouter from "./Courses/router.js";
const router = express.Router();

router.use(tokenValidator);

// ADMIN ROUTES

router.use("/courses", CoursesRouter);

export default router;
