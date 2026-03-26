import multer from "multer";
import { BadRequest } from "../errorHandler/httpError";

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  cb
) => {
  if (file.mimetype !== "application/pdf") {
    return cb(
      new BadRequest("Only PDF files are allowed")
    );
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 
  },
  fileFilter
});