const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {profile} = require('../DataBase/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const GOOGLE_CALLBACK_URL = `${process.env.BACKEND || "http://localhost:3001"}/login/oauth2/redirect/google`;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:GOOGLE_CALLBACK_URL,
    passReqToCallback:true,
},
async (req,accesToken,refreshToken,gProfile,done) => {
    /*console.log("gprofile: ",gProfile);
    console.log("req ", req);
    console.log("acces token",accesToken);
    console.log("refresh token",refreshToken);
    console.log("cb",done);*/
    

    try{
        let existingUser = await profile.findOne({
            where:{
                'googleId':gProfile.id
            }
        });
        if(existingUser){
            return done(null,existingUser);
        }

        console.log('Creating new user ...');

        const newUser = await profile.create({
            name: `${gProfile.name.givenName} ${gProfile.name.familyName}`,
            username: gProfile.emails[0].value,
            password: gProfile.id,
            mail: gProfile.emails[0].value,
            profilePicture: gProfile.photos[0].value,
            googleId: gProfile.id, 
            phone:'111111111',
        });

        if(newUser){
             // token and link
            const secret = process.env.SECRET + newUser.password;
            const token =  jwt.sign({email:newUser.mail, id:newUser.id},secret,{expiresIn:60*60*24});
            const link = `${process.env.BACKEND || "http://localhost:3001"}/auth/verify/${newUser.id}/${token}`;
            // mail
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.EMAIL_PASSWORD,
                }
            });
    
            const mailOptions = {
                from: process.env.EMAIL,
                to: newUser.mail,
                subject: 'Verificacion de usuario',
                text: `Bienvenido ${newUser.name}, gracias por registrarte para terminar el proceso
                de registro ingresa en el siguiente link para verificar tu cuenta ${link} el link
                tendra un tiempo de expiracion de un dia.
                Atentamente equipo de express clothes`
            };
    
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
        }

        console.log(newUser);

        return done(null,newUser);

    } catch (error){
        return done(error,false);
    }

    

    /*const defaultUser = {
        name: `${gProfile.name.givenName} ${gProfile.name.familyName}`,
        username: gProfile.emails[0].value,
        password: gProfile.id,
        mail: gProfile.emails[0].value,
        profilePicture: gProfile.photos[0].value,
        googleId: gProfile.id, 
        phone:'111111111',
    }

    const user = await profile.findOrCreate({
        where:{
            googleId:gProfile.id,
        },
        defaults: defaultUser,
    }).catch((err) => {
        console.log("Error signing up",err);
        done(err,null);
    });

    console.log("user created",user);

    if(user) return done(null, user && user[0]);*/

    

}));

passport.serializeUser((user, cb) => {
    console.log("Serializing user:",user);
    cb(null,user.id);
});

passport.deserializeUser(async (id,cb) => {
    const user = await profile.findOne({ where: {id} }).catch((err) => {
        console.log("Error deserializing",err);
        cb(err,null);
    });

    console.log("Deserialized user",user);

    if(user) cb(null,user)
});