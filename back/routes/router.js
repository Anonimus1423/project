import express from "express";
import { body } from "express-validator";
import tokenValidator from "../utils/tokenValidator.js";

const router = express.Router();

router.use(tokenValidator);

// ADMIN ROUTES

export default router;
