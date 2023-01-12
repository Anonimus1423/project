import { validationResult } from "express-validator";
import ErrorRequest from "../../utils/Error.js";
import User from "../../modules/User.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const store = async (req, res) => {
  const errors = ErrorRequest(req, res);
  if (errors.length) {
    return res.status(400).json({ errors: errors });
  }
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    if (err) {
      return res.status(400).send({ errors: [err] });
    }
    const findUser = await User.findOne({ name: req.body.name });
    if (findUser) {
      return res.status(200).send({ errors: ["User already exixts."] });
    }
    const user = await User.create({
      name: req.body.name,
      password: hash,
      mail: req.body.mail,
    });
    return res.status(200).send(user);
  });
};
