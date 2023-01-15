import nodemailer from "nodemailer";
import config from "config";

const user = config.get("nodemailer.mail");
const password = config.get("nodemailer.pass");

export async function mailGenerator(from, to, inputs) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: password,
    },
  });
  let mailOptions = {
    from: from,
    to: to,
    ...inputs,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
