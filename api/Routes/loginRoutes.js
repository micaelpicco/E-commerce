const { Router } = require("express");
const passport = require('passport');
const {signIn,signInGoogle} = require('./Controllers/login');
const jwt = require("jsonwebtoken");
const {profile} = require("../DataBase/db");

const router = Router();

router.post("/",signIn);

router.get("/google",passport.authenticate("google",{ scope: ['profile','email']}));

router.get("/oauth2/redirect/google",passport.authenticate("google",{
    failureMessage: "Cannot login to google, please try again later!",
    session: false,
}),async (req,res) => {
    if(req.user){

        const user = await profile.findOne({
            where:{
                id:req.user.id,
            }
        });

        console.log(user);

        if(!user.verified){
            return res.redirect(`${process.env.FRONTEND}/login?google=not%20verified`);
        }else{
            const token = jwt.sign({id:req.user.id},process.env.SECRET,{
                expiresIn:60*60*24 // one day
            });
            res.cookie('token',token);
            res.redirect(`${process.env.FRONTEND}/home?gtoken=${token}`);
        }

       
    }else{
        res.redirect(`${process.env.FRONTEND}/register`);
    }
});

module.exports = router;