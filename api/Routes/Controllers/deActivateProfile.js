const {profile} = require('../../DataBase/db');


const deActivateProfile = async (id) => {
    const user = await profile.findByPk(id)
    if(!user) throw Error("Profile doesnt exist")
    await profile.update({isActive: false}, {where:{id:id}})
    return "Profile desactivated"
}

module.exports = deActivateProfile