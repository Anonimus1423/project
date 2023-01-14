import { validationResult } from "express-validator";
import ErrorRequest from "../../utils/Error.js";
import User from "../../modules/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import generate from "../../utils/generate.js";
import { main } from "../../utils/mail.js";

//CONFIGS
const SECRET = config.get("JWT.TOKEN_SECRET");
const EXPIRE = config.get("JWT.EXPIRE");

const saltRounds = 10;
let userInfo = {};

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
    code: generate(6),
    mailService: isOnMail,
  };
  main("test.test@gmail.com", mail, {
    subject: "Vailidate Email",
    text: "put this code on your page",
    html: `<b>${userInfo.code}</b>`,
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
