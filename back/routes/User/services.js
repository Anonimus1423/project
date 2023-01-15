import { validationResult } from "express-validator";
import ErrorRequest from "../../utils/Error.js";
import User from "../../modules/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import generate from "../../utils/generate.js";
import { mailGenerator } from "../../utils/mail.js";
import { validateEmailTemplate } from "./../../emailTemplates/validate.js";
import errorsGenerator from "./../../utils/errorsGenerator.js";
import { forgetPasswordEmailTemplate } from "./../../emailTemplates/forget.js";

//CONFIGS
const SECRET = config.get("JWT.TOKEN_SECRET");
const EXPIRE = config.get("JWT.EXPIRE");
const url = config.get("main-url");

const saltRounds = 10;
let userInfo = {};

// REGISTR
export const step1 = async (req, res) => {
  const errors = ErrorRequest(req, res);
  const { name, password, mail, isOnMail = false } = req.body;
  if (errors.length) {
    return res.status(400).json({ errors: errors });
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const findUser = await User.findOne({ mail });
  if (findUser) {
    return res.status(200).send({ errors: [{ msg: "User already exixts." }] });
  }
  userInfo = {
    name,
    password: hashedPassword,
    mail,
    code: generate(3),
    mailService: isOnMail,
  };
  mailGenerator("test.test@gmail.com", mail, {
    subject: "Vailidate Email",
    text: "put this code on your page",
    html: validateEmailTemplate(userInfo.code, name),
  });
  return res.status(200).send({ mail: true });
};

export const step2 = async (req, res) => {
  if (req.body.code !== userInfo.code) {
    return res.status(400).send({ errors: [{ msg: "Code is not match" }] });
  }
  const user = await User.create({
    ...userInfo,
  });
  userInfo = {};
  return res.status(200).send({ created: true, user });
};

// LOGIN

export const loginUser = async (req, res) => {
  const { password, login } = req.body;
  let findUser = await User.findOne({ name: login });
  let isLoginMail = false;
  if (!findUser) {
    findUser = await User.findOne({ mail: login });
    if (!findUser) {
      return res.status(404).send({ errors: [{ msg: "User not found." }] });
    }
    isLoginMail = true;
  }
  const isPasswordCompare = await bcrypt.compare(password, findUser.password);
  if (!isPasswordCompare) {
    return res.status(404).send({ errors: [{ msg: "User not found." }] });
  }
  const user = isLoginMail
    ? await User.findOne({ mail: login }).select("-password -_id -__v")
    : await User.findOne({ name: login }).select("-password -_id -__v");
  const token = jwt.sign({ name: user.name }, SECRET, { expiresIn: EXPIRE });
  return res.status(200).send({ user, token });
};

// Auto login

export const authUser = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  try {
    const verify = await jwt.verify(token, SECRET, { expiresIn: EXPIRE });
    const user = await User.findOne({ name: verify.name }).select(
      "-password -_id -__v"
    );
    return res.status(200).send({ user });
  } catch {
    return res.status(403).send({ errors: [{ msg: "token has expired." }] });
  }
};

// Forget Password
export const forgetPasswordStep1 = async (req, res) => {
  const { mail } = req.body;
  const errors = ErrorRequest(req, res);
  if (errors.length) {
    return res.status(400).json({ errors: errors });
  }
  const user = await User.findOne({ mail });
  if (!user) {
    return res
      .status(400)
      .send({ errors: errorsGenerator(["User is not exist."]) });
  }
  const token = jwt.sign({ mail: user.mail }, SECRET, { expiresIn: "2400s" });
  mailGenerator("test.test@gmail.com", mail, {
    subject: "Forget Password",
    text: "Link",
    html: forgetPasswordEmailTemplate(
      `${url}/forget/step2/${token}`,
      user.name
    ),
  });
  return res.status(200).send({ mail: true });
};

export const forgetPasswordStep2 = async (req, res) => {
  const { password, confirmPassword, token } = req.body;
  const errors = ErrorRequest(req, res);
  if (errors.length) {
    return res.status(400).json({ errors: errors });
  }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .send({ errors: errorsGenerator(["confirm password dos not match."]) });
  }
  try {
    const verify = await jwt.verify(token, SECRET, { expiresIn: "2400s" });
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.findOneAndUpdate(
      { mail: verify.mail },
      {
        password: hashedPassword,
      }
    );
    return res.status(200).send({ changes: true });
  } catch {
    return res.status(403).send({ errors: [{ msg: "Time out." }] });
  }
};
