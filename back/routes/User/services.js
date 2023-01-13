import { validationResult } from "express-validator";
import ErrorRequest from "../../utils/Error.js";
import User from "../../modules/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

//CONFIGS
const SECRET = config.get("JWT.TOKEN_SECRET");
const EXPIRE = config.get("JWT.EXPIRE");

const saltRounds = 10;

export const store = async (req, res) => {
  const errors = ErrorRequest(req, res);
  const { name, password, mail } = req.body;
  if (errors.length) {
    return res.status(400).json({ errors: errors });
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const findUser = await User.findOne({ name });
  if (findUser) {
    return res.status(200).send({ errors: [{ msg: "User already exixts." }] });
  }
  const user = await User.create({
    name,
    password: hashedPassword,
    mail,
  });
  return res.status(200).send(user);
};

export const loginUser = async (req, res) => {
  const { password, name } = req.body;
  const findUser = await User.findOne({ name });
  if (!findUser) {
    return res.status(404).send({ errors: [{ msg: "User not found." }] });
  }
  const isPasswordCompare = await bcrypt.compare(password, findUser.password);
  if (!isPasswordCompare) {
    return res.status(404).send({ errors: [{ msg: "User not found." }] });
  }
  const user = await User.findOne({ name }).select("-password -_id -__v");
  const token = jwt.sign({ name }, SECRET, { expiresIn: EXPIRE });
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
