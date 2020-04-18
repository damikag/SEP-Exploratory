const jwt = require('jsonwebtoken');
const joi = require('@hapi/joi');

var Researcher = require('../../models/models/Researcher');


module.exports.valid_jwt_needed = function (req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');;
    if (!token) {
        return res.status(401).json({error:'Access Denied. Valid JWT needed'});
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        var researcher = new Researcher();
        req.user = verified;
        
        researcher.find_by_email(req.user.email)
            .then((result) => {
                if(result.token == token){
                    next();
                }
                else{
                    return res.status(401).json(
                        {isAuth: false,
                        error:'Invalid Token'});
                }
                
            })
            .catch((err) => {
                return res.status(500).json({
                    isAuth: false,
                    error:err.message});
            })
        
       
    } catch (error) {
        return res.status(401).json({error:'Invalid Token'});
    }
}
