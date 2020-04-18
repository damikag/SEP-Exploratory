var Feed = require('../../models/models/Feed')
module.exports.indexAction = (req, res) => {
    
    return res.status(200).json({ message: "Welcome home researcher" });
    
}

module.exports.feedAction = (req, res) => {
    
    var feed=new Feed()
    feed.feed()
    .then((feedArr)=>{
        return res.status(200).json(feedArr);
    })
    .catch((err)=>{
        return res.status(500).json({error:err.message});
    })   
    
}