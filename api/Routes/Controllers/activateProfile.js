const {profile} = require('../../DataBase/db');


const activateProfile = async (id) => {
    const user = await profile.findByPk(id)
    if(!user) throw Error("Profile doesnt exist")
    await profile.update({isActive: true}, {where:{id:id}})
    return "Profile Activated"
}

module.exports = activateProfile