import nodemailer, { createTestAccount } from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export const SendOtpOnEmail = async (otp, email) => {
  try {
    const emailTemplateSource = fs.readFileSync(
      path.join(_dirname, "otp.hbs"),
      "utf-8",
    );
    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({ otp });

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
      subject: "This email is for reset Password Otp",
      html: htmlToSend,
    };
    transport.sendMail(mailOptions, function (err, res) {
      if (err) throw new Error(err);
      console.log("Email has been sent successfully");
      console.log(res);
    });
  } catch (error) {
    throw new Error("Failed to send an email", error);
  }
};
