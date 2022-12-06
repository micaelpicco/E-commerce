const { profile, Op } = require("../../DataBase/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await profile.findOne({
      where: { username: username },
    });

    console.log(user);

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        message: "Usuario o contraseña invalida",
      });
    }

    if (!user.verified) {
      return res.status(401).json({
        message:
          "Por favor verifica tu cuenta en el enlace que se te envio a tu correo electronico",
      });
    }

    if (user && passwordCorrect) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      return res.json({
        token: token,
        message: "Credenciales correctas",
      });
    }
  } catch (err) {
    next(err);
  }
};

const signInGoogle = async (req, res) => {};

module.exports = {
  signIn,
  signInGoogle,
};
