const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("temp");
console.log(tempDir);

const multerConfig = multer.diskStorage({
  destination: tempDir,
  fileName: (req, file, cb) => {
    cb(null, file.orginalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
