const isUserAuthenticated = (req,res,next) => {
    console.log(JSON.stringify(req.cookies),"request frontend");
    if(req.user){
        next();
    }else{
        res.status(401).send("you must login first");
    }
}

module.exports = {
    isUserAuthenticated,
}