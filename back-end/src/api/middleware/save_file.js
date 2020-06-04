const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/${req.body.type}/`);
  },
  filename(req, file, cb) {
    cb(null, `${req.body.name}`);
  },
});

const upload = multer({ storage }).single("file");

module.exports = {
  upload: upload,
};
