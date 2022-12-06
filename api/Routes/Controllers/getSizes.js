const sizes = require("../../DataBase/utils/sizes");

const getSizes = (req,res,next) => {
    try{
        res.send(sizes);
    }catch(err){
        next(err);
    }
}

module.exports = {
    getSizes,
};