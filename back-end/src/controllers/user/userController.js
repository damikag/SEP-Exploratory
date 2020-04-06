var Researcher = require('../../models/models/Researcher');
const {register_validation } = require('./validation');

const bcrypt = require('bcryptjs');

module.exports.registerAction = (req, res) => {
    const { error } = register_validation(req.body);
    if (error) {
        return res.status(400).json({error:error.details[0].message});
    }

    var researcher = new Researcher();

    researcher.find_by_email_or_id(req.body.email, req.body.id)
        .then(async (result) => {
            if (result) {
                return res.status(400).json({error:'duplicate entry'});
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashed_password = await bcrypt.hash(req.body.password, salt);
                req.body.password = hashed_password;
                req.body._deleted = 0;
                var researcher = new Researcher(req.body);

                researcher.insert()
                .then((result) => {
                    if (result) {
                        res.status(200).json({ email: researcher.email });
                    }
                })
                .catch((err)=>{
                    return res.status(500).json({error:err.message});
                })
            }
        })
        
        .catch((error) => {
            return res.status(500).json({error:error.message});
        })

    .catch((error)=>{
        return res.status(500).send('server error');
    })
}
