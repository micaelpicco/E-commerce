const { profile } = require("../../DataBase/db");
const url = require("../Utils/imageUploader");

const modifyProfile = async (req) => {
  let {
    id,
    name,
    mail,
    username,
    phone,
    storeName,
    banner,
    profilePicture,
    location,
  } = req.body;
  console.log("BODY ==> ", req.body);

  try {
    profilePicture = await url(req.files["profilePicture"][0].path);
  } catch (error) {}
  try {
    banner = await url(req.files["banner"][0].path);
  } catch (error) {}
  const user = await profile.findByPk(id);
  user.name = name ? name : user.name;
  user.mail = mail ? mail : user.mail;
  user.username = username ? username : user.username;
  user.phone = phone ? phone : user.phone;
  user.storeName = storeName ? storeName : user.storeName;
  user.phone = phone ? phone : user.phone;
  user.location = location ? location : user.location;

  user.profilePicture =
    typeof profilePicture === "string" ? profilePicture : user.profilePicture;
  user.banner = typeof banner === "string" ? banner : user.banner;
  await user.save();
  return user;
};

module.exports = modifyProfile;
