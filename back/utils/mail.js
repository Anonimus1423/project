import nodemailer from "nodemailer";
import config from "config";

const user = config.get("nodemailer.mail");
const password = config.get("nodemailer.pass");

export async function mailGenerator(from, to, inputs) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 993,
    secure: true, // use 
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


// import nodemailer from "nodemailer";
// import config from "config";

// const user = config.get("nodemailer.mail");
// const password = config.get("nodemailer.pass");

// export async function mailGenerator(from, to, inputs) {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.mail.ru",
//     port: 465,
//     secure: true,
//     auth:  {
//       user: "papoyan.t.00@mail.ru", // Sender mail
//       pass: "cXeJq2DTg4Gbyra5ZsUs" // Sender mail password
//   },
//   });
//   let mailOptions = {
//     from:"papoyan.t.00@mail.ru",
//     to: to,
//     ...inputs,
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// }
