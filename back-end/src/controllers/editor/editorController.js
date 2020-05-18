const { EditorBlog } = require("../../mongo/models/EditorBlog");


module.exports.createAction= (req, res) => {
    let blog = new EditorBlog({ content: req.body.content, writer: req.body.group, name:req.body.name });

    blog.save((err, postInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, postInfo })
    })
}

module.exports.editAction= (req, res) => {
    //let blog = new Blog({ content: req.body.content, writer: req.body.userID });
    
    EditorBlog.findOne({ "_id": req.body.postId }, function (err, foundText) {
        if (err) return console.log(err, 'this is the not found error');
        foundText.content = req.body.content;
        foundText.name = foundText.name;
        //foundText.group = foundText.group;
        foundText.save(function (err, updatedText) {
          if (err) return console.log(err, 'this is the not saved error');
          res.send(updatedText);
        });
      });

};   
    
module.exports.searchBlogAction= (req, res) => {
    EditorBlog.find({ "name": req.body.name,"writer": req.body.group })
        .exec((err, blogs) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, blogs });
        });
};

module.exports.getBlogAction= (req, res) => {
    EditorBlog.find({ "writer": req.body.group })
        .exec((err, blogs) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, blogs });
        });
};

module.exports.getPostAction= (req, res) => {
    //console.log(req.body)
    EditorBlog.findOne({ "_id": req.body.postId })
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            //console.log(post)
            return res.status(200).json({ success: true, post })
        })
};

module.exports.deletePostAction= (req, res) => {
    console.log(req.body)
    EditorBlog.deleteOne({ "_id": req.body.postId })
        .exec((err,obj) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true })
        })
};

module.exports.softDeleteAction= (req, res) => {
    //let blog = new Blog({ content: req.body.content, writer: req.body.userID });
    
    EditorBlog.findOne({ "_id": req.body.postId }, function (err, foundText) {
        if (err) return console.log(err, 'this is the not found error');
        foundText.folder = req.body.folder;
        foundText.name = foundText.name;
        foundText.content = foundText.content;
        //foundText.group = foundText.group;
        foundText.save(function (err, deletedVersion) {
          if (err) return console.log(err, 'this is the not saved error');
          res.status(200).json({ success: true })
        });
      });

};

