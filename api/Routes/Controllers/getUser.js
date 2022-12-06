const jwt = require("jsonwebtoken");

const getUser = async (req,res,next) => {
    console.log("getting user");

    try{
        if(req.user){
            const token = jwt.sign({
                id:req.user.id,
                username:req.user.username,
            },
            process.env.SECRET,
            {expiresIn:60*60*24});
            res.send({
                username:req.user.username,
                token,
            });
        }
    }catch(err){
        next(err);
    }
    
}

module.exports = {
    getUser
}