var Researcher = require("../../models/models/Researcher");
var Feed = require("../../models/models/Feed");

module.exports.indexAction = (req, res) => {
  return res.status(200).json({ message: "Welcome home researcher" });
};

module.exports.searchRelatedResearchersAction = (req, res) => {
  var researcher = new Researcher();

  researcher
    .find_by_name(req.body.search_string)
    .then((result) => res.status(200).json({ result: result }))
    .catch((err) => res.status(500).json({ error: err.message }))
    .catch((error) => res.status(500).send("server error"));
};

module.exports.feedAction = (req, res) => {
  // return res.status(200).json("feed hi");
  var feed = new Feed("damika5@gmail.com");

  // feed.get_new_projects([10])
  // .then(res=>{
  //   console.log(res)
  //   feed.get_newlyupdated_projects([10]).then(res2=>{console.log(res2)}).catch(err=>{console.log(err)})
  // }).catch(err=>{console.log(err)})


  // feed.get_followed_projects([10005,10])
  // .then(res=>{console.log(res)}).catch(err=>{console.log(err)})

  feed.getFeed().then(res=>{console.log(res)}).catch(err=>{console.log(err)})
  // feed
  //   .feed()
  //   .then((feedArr) => {
  //     return res.status(200).json(feedArr);
  //   })
  //   .catch((err) => {
  //     return res.status(500).json({ error: err.message });
  //   });

  return res.status(200).json("feed hi end");
};
