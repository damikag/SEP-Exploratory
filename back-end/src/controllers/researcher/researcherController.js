var Researcher = require("../../models/models/Researcher");
var ResearcherInstitute = require("../../models/views/ResearcherInstitute");
// var Feed = require("../../models/models/Feed");
var Feed = require("../../models/models/Feed");
const { feed_validation } = require("./validation");

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

module.exports.getAllUsersAction = (req, res) => {
  var researcher = new ResearcherInstitute();
  researcher
    .get_all_researchers()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err.message));
};

module.exports.feedAction = (req, res) => {

  const { error } = feed_validation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // var researcher = new Researcher
  // researcher.find_by_email(req.body.email)
  // .then(researcherResult=>{

  //   if(researcherResult){
      var feed = new Feed(req.body.email);
      feed
        .getFeed(req.body.index)
        .then((feedArr) => {
          return res.status(200).json(feedArr);
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
  //   }
  //   else{
  //     return res.status(400).json({ error: "Invalid email" });
  //   }
  // })
  // .catch(err=>{
  //   console.log(err)
  //   return res.status(500).json({ error: err.message });
  // })

};
