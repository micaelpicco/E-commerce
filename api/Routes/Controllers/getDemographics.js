const demographic = require("../../DataBase/utils/demographic");

const getDemographics = (req,res,next) => {
    try{
        res.send(demographic);
    }catch(err){
        next(err);
    }
}

module.exports = {
    getDemographics,
};