const { EditorBlog } = require("../../mongo/models/EditorBlog");
const { Folder } = require("../../mongo/models/Folder");
const mongoose = require("mongoose");
const config = require("../../mongo/config/key");
const Grid = require('gridfs-stream');
const fs = require("fs")
const path = require('path');
const db = mongoose.connection;

let gfs = new Grid(mongoose.connection, mongoose);
db.once("open", function () {
  gfs = Grid(db.db, mongoose.mongo);
});
//console.log(mongoose.connection.client.db)



module.exports.getAllFilesAction = (req, res) => {

    gfs.collection('uploads');
    gfs.files.find().toArray((err, files) => {
        if(!files || files.length === 0){
          return res.status(404).json({
            message: "Could not find files"
          });
        }
        return res.json(files);
    });
} 
module.exports.searchFilesAction = (req, res) => {
    gfs.collection('uploads');
    gfs.files.find({"metadata.group" : req.body.group,"metadata.folder" : req.body.folder,"metadata.originalname" : req.body.name}).toArray((err, files) => {
        if (err) return res.status(400).send(err);
        console.log(files)
        res.status(200).json({ success: true, files })
    });
} 
module.exports.shareFileAction = (req, res) => {
    gfs.collection('uploads');
    
    gfs.files.update(
        { filename:  req.body.name },
        { $set: { 'metadata.sensitivity': 'public'  } }, (err) => {
            if (err) return res.status(500).json({ success: false })
            return res.json({ success: true });
        })
} 
module.exports.notshareFileAction = (req, res) => {
    gfs.collection('uploads');
    gfs.files.update(
        { filename:  req.body.name },
        { $set: { 'metadata.sensitivity': 'private' } }, (err) => {
            if (err) return res.status(500).json({ success: false })
            return res.json({ success: true });
        })

module.exports.notshareFileAction = (req, res) => {
  gfs.collection("uploads");
  gfs.files.update(
    { filename: req.body.name },
    { $set: { "metadata.sensitivity": "private" } },
    (err) => {
      if (err) return res.status(500).json({ success: false });
      return res.json({ success: true });
    }
  );
};

module.exports.getGroupFilesAction = (req, res) => {
    gfs.collection('uploads'); //set collection name to lookup into
    /** First check if file exists */
    gfs.files.find({"metadata.group" : req.body.group,"metadata.folder" : req.body.folder}).toArray(function(err, files){
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, files })
    });
}
module.exports.getPublicFilesAction = (req, res) => {
    gfs.collection('uploads'); //set collection name to lookup into
    /** First check if file exists */
    gfs.files.find({"metadata.group" : req.body.group,"metadata.sensitivity" : "public"}).toArray(function(err, files){
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, files })
    });
}
module.exports.getGroupTxtFilesAction = (req, res) => {
  gfs.collection("uploads"); //set collection name to lookup into
  /** First check if file exists */
  gfs.files
    .find({ "metadata.group": req.body.group, contentType: "text/plain" })
    .toArray(function (err, files) {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, files });
    });
}
//app.get('/file/:filename', function(req, res){
module.exports.getFileAction = (req, res) => {
    gfs.collection('uploads'); //set collection name to lookup into
    /** First check if file exists */
    gfs.files.find({filename:req.body.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            console.log(req.body)
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        /** create read stream */
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "uploads"
        });
        /** set the proper content type */
      res.set('Content-Type', files[0].contentType)
        /** return response */
      return readstream.pipe(res)
    }});
};
module.exports.readFileAction = (req, res) => {
  var buffer = "";
  gfs.collection("uploads");

  // read file, buffering data as we go
  var readStream = gfs.createReadStream({
    filename: req.body.filename,
  });

  readStream.on("data", function (chunk) {
    buffer += chunk;
  });
  readStream.on("error", function (err) {
    console.log("An error occurred!", err);
    return res.status(400).send(err);
  });
  // dump contents to console when complete
  readStream.on("end", function () {
    return res.status(200).json({ success: true, buffer });
  });
};
module.exports.uploadFilesAction = (req, res) => {
    //console.log('awa')
    gfs.collection('uploads');
    //,group:req.body.group,sensitivity:req.body.sensitivity,folder:req.body.folder
    if (req.file) {
        gfs.files.update(
            { filename:  req.file.filename },
            { $set: { 'metadata.sensitivity': 'private','metadata.group': req.body.group, 'metadata.folder':req.body.folder} }, (err) => {
                if (err) return res.status(500).json({ success: false })
                return res.json({ success: true });
            })
        
      }
      
}
module.exports.softDeleteFilesAction = (req, res) => {
    gfs.collection('uploads');
    console.log(req.body.filename)
    gfs.files.update(
        { filename:  req.body.filename },
        { $set: { 'metadata.folder': 'deleted'  } }, (err) => {
            if (err) return res.status(500).json({ success: false })
            return res.json({ success: true });
        })
} 
module.exports.deleteFilesAction = (req, res) => {
  gfs.collection("uploads");
  console.log(req.body.id);
  gfs.remove({ _id: req.body.id, root: "uploads" }, (err) => {
    if (err) return res.status(500).json({ success: false });
    return res.json({ success: true });
  });
};
//////////////////////////////////////folder actions
module.exports.createFolderAction= (req, res) => {
    let folder = new Folder({  group: req.body.group, name:req.body.name,folder:req.body.folder });

    folder.save((err, postInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, postInfo })
    })
}
module.exports.deleteFolderAction= (req, res) => {
    console.log(req.body)
    Folder.deleteOne({ "_id": req.body.folderId })
        .exec((err,obj) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true })
        })
}
module.exports.getFoldersAction= (req, res) => {
    Folder.find({ "group": req.body.group,"folder":req.body.folder})
        .exec((err, folders) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, folders });
        });
};
module.exports.searchFoldersAction= (req, res) => {
    Folder.find({ "group": req.body.group,"folder":req.body.folder,"name":req.body.name})
        .exec((err, folders) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, folders });
        });
};

//////////////////////// turn to pdf 
var pdf = require('html-pdf');
const crypto = require('crypto');
module.exports.ToPdfAction= (req, res) => {
    gfs.collection('uploads');
    EditorBlog.findOne({ "_id": req.body.postId })
        .exec((err1, post) => {
            if (err1){
                return res.status(400).send(err);
            }
            crypto.randomBytes(16, (err2, buf) => {
                if (err2) {
                  return reject(err);
                }
                const filename = buf.toString('hex') + path.extname('foo.pdf');
                const originalname=post.name+'.pdf'
                var writestream = gfs.createWriteStream({
                    filename: filename,
                    "root": "uploads",
                    mode: 'w',
                    content_type: 'application/pdf',
                    metadata: { originalname: originalname,group:req.body.group,folder:'root',sensitivity:'private' }//change this later
                });
                
                pdf.create(post.content).toStream(function(err3, stream){
                    if (err3){
                        return res.status(400).send(err);
                    }
                    stream.pipe(fs.createWriteStream('./foo.pdf')).on('finish', function() {
                        fs.createReadStream('./foo.pdf').pipe(writestream)
                        //var stat = fs.statSync('./foo.pdf');
                        //console.log(stat.size)
                    })
                    writestream.on('close', function (file) {
                        // do something with `file`
                        fs.unlinkSync('./foo.pdf')
                        return res.status(200).json({ success: true });
                      });
                    return res.status(400);
                    
                });
              
            })
        })
    }
