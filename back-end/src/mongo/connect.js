
//const Grid = require('gridfs-stream');
var GridFsStorage = require('multer-gridfs-storage');
const config = require("./config/key");
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

 
const Grid = require('gridfs-stream');

//console.log(mongoose.connection.client.db)
var gfs =new Grid(mongoose.connection,mongoose);

var storage = GridFsStorage({
  url: config.mongoURI,
  db:mongoose.connection,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata: { originalname: file.originalname,group:req.body.group,sensitivity:req.body.sensitivity,folder:req.body.folder }
    
        };
        resolve(fileInfo);
      });
    });
  }
});

var upload = multer({ //multer settings for single upload
  storage: storage
}).single('file');

module.exports={
  upload:upload
}

