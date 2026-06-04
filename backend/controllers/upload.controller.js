import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";
import uploadModel from "../models/upload.model.js";

export const uploadFile = async (req, res) => {
  let filePath;

  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).send({
        message: "Name is required!",
      });

    if (!req.file)
      return res.status(400).send({
        message: "File is required!",
      });

    filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const newFile = await uploadModel.create({
      name,
      url: result.secure_url,
    });

    res.status(201).send({
      message: "File Uploaded Successfully!",
      newFile,
    });
  } catch (error) {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.error(error);

    res.status(500).send({
      message: "File Upload Failed!",
      error: error.message,
    });
  }
};