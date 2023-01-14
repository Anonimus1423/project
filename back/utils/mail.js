import nodemailer from "nodemailer";

export async function main(from, to, inputs) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rudmargaryandev@gmail.com",
      pass: "afdkpqlalubennfh", // naturally, replace both with your real credentials or an application-specific password
    },
  });
  let mailOptions = {
    from: from, // sender address
    to: to, // list of receivers
    ...inputs,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
}
