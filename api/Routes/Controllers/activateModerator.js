const {profile} = require('../../DataBase/db');

const activateModerator = async(id) => {
    const user = await profile.findByPk(id)
    if(!user) throw Error("Profile doesnt exist")
    user.isModerator = true
    await user.save()
    return "User was made Moderator!"
}
module.exports = activateModerator