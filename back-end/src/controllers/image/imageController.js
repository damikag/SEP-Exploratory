var Image = require("../../models/models/Image");

module.exports.retreiveImageFileAction = (req, res) => {
  res.sendFile(`${process.cwd()}/public/related_images/${req.body.file}`);
};

module.exports.insertImageFilesAction = (req, res) => {
  var delete_image = new Image({
    deleted_at: new Date(),
  });
  delete_image
    .soft_delete_images(req.body.project_id)
    .then((result) => {
      let not_uploaded = [];
      req.body.images.map(async (image) => {
        var new_image = new Image({
          project_id: req.body.project_id,
          url: image,
        });

        await new_image
          .insert()
          .then((result) => {
            console.log("saved");
          })
          .catch((err) => {
            not_uploaded.push(image);
            console.log(err.message);
          });
      });
      res.status(200).json({ message: "Saved!", not_inserted: not_uploaded });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error!" });
    });
};
