import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export const verifyEmail = (token, email) => {
  try {
    const emailTemplateSource = fs.readFileSync(
      path.join(_dirname, "template.hbs"),
      "utf-8",
    );
    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({ token: encodeURIComponent(token) });

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "this email is for email verfication.",
      html: htmlToSend,
    };
    transport.sendMail(mailOptions,(err,res) => {
      if(err) throw new Error(err);
      console.log('Email has been sent successfully')
      console.log(res);
    })
  } catch (error) {
    throw new Error("Failed to send an email", error);
  }
};
