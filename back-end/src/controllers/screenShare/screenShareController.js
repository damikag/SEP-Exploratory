const twilio = require("twilio");


const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
module.exports.getTokenAction= (req, res) => {
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
      );
    
      token.addGrant(new VideoGrant());
    
      token.identity = req.user.email;
      console.log(token)
      console.log(req.user.email)
      res.send({ token: token.toJwt() });
}

