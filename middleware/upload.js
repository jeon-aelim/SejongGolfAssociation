const multer = require("multer");
const moment = require("moment");
const crypto = require("crypto");
const path = require("path");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const fileFilter = (req, file, cb) => {
  const imageExtensions = /\.(jpg|jpeg|png)$/;
  const documentExtensions = /\.(pdf|hwp|hwpx|xlsx|docx)$/;

  if (file.fieldname === "img_url" && !imageExtensions.test(path.extname(file.originalname))) {
    return cb(new Error("Only image files are allowed!"));
  } else if (file.fieldname === "document_url" && !documentExtensions.test(path.extname(file.originalname))) {
    return cb(new Error("Only document files are allowed!"));
  }

  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderName = "images/";

    if (file.fieldname === "document_url") {
      folderName = "documents/";
    }
    cb(null, folderName);
  },
  filename: (req, file, cb) => {
    const prefix = file.fieldname === "img_url" ? "img" : "doc";
    const randomBytes = crypto.randomBytes(4).toString("hex"); // Generate random bytes
    const fileExtension = path.extname(file.originalname); // Get file extension
    const fileName = `${prefix}-${moment().format("YYMMDD")}-${randomBytes}${fileExtension}`;
    cb(null, fileName);
  }
});

const uploadImages = multer({ storage: storage, fileFilter: fileFilter }).array("img_url", 10);
const uploadDocuments = multer({ storage: storage, fileFilter: fileFilter }).array("document_url", 10);

module.exports = { uploadDocuments, uploadImages };
