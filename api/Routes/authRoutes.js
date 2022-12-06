const { Router } = require("express");
const { getUser } = require("./Controllers/getUser");
const { isUserAuthenticated } = require("./Utils/auth");
const { profile } = require("../DataBase/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const router = Router();

router.get("/user", isUserAuthenticated, getUser);
router.get("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send("succes");
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await profile.findOne({
      where: {
        mail: email,
      },
    });
    if (!oldUser) {
      return res.send("No existen usuarios con ese email");
    }
    const secret = process.env.SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.mail, id: oldUser.id }, secret, {
      expiresIn: "2h",
    });
    const link = `${
      process.env.BACKEND || "http://localhost:3001"
    }/auth/reset-password/${oldUser.id}/${token}`;
    //console.log(link);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: oldUser.mail,
      subject: "Enlace de recuperacion de password",
      text: `Hola ${oldUser.name}, para crear tu nuevo password accede a este link ${link} 
            recuerda que solamente tienes una hora para usarlo, en caso de no haber solicitado
            la recuperacion de password has caso omiso a este mensaje.
            Atentamente equipo de express clothes`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("Email de recuperacion enviado");
  } catch (error) {
    res.send(err.message);
  }
});
1;
router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await profile.findOne({
    where: {
      id: id,
    },
  });
  if (!oldUser) {
    return res.send("User Not Exist!!");
  }
  const secret = process.env.SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.redirect(`${process.env.FRONTEND}/reset?user=${oldUser.id}`);
  } catch (err) {
    res.send("not verified");
  }
});

router.put("/reset-password", async (req, res) => {
  const { id, password } = req.body;
  console.log(id);
  try {
    let passwordHash = await bcrypt.hash(password, 8);
    const user = await profile.update(
      {
        password: passwordHash,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.send("nuevo password configurado");
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/verify/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const user = await profile.findOne({
    where: {
      id: id,
    },
  });
  if (!user) {
    return res.send("El usuario no existe");
  }
  const secret = process.env.SECRET + user.password;
  try {
    const verify = jwt.verify(token, secret);
    await profile.update(
      {
        verified: true,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.redirect(`${process.env.FRONTEND}/verified`);
  } catch (err) {
    res.redirect(`${process.env.FRONTEND}/not-verified`);
  }
});

router.post("/not-verified", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await profile.findOne({
      where: {
        mail: email,
      },
    });

    if (!user) return res.send("No hay un usuario registrado con este email");

    if (user) {
      // token and link
      const secret = process.env.SECRET + user.password;
      const token = jwt.sign({ email: user.mail, id: user.id }, secret, {
        expiresIn: 60 * 60 * 24,
      });
      const link = `${
        process.env.BACKEND || "http://localhost:3001"
      }/auth/verify/${user.id}/${token}`;
      // mail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: user.mail,
        subject: "Verificacion de usuario",
        text: `Bienvenido ${user.name}, gracias por registrarte para terminar el proceso
            de registro ingresa en el siguiente link para verificar tu cuenta ${link} el link
            tendra un tiempo de expiracion de un dia.
            Atentamente equipo de express clothes`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.send("Email de confirmacion enviado");
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/sendemail", async (req, res) => {
  const { mail } = req.query;
  const productos = req.body;

  const user = await profile.findOne({
    where: {
      mail: mail,
    },
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.mail,
    subject: "Express Clothes",
    text: `Hola ${user.name}, has comprado ${productos.length} productos en Express Clothes. La compra de los mismos ha sido aprobada y ya estan siendo despachados y enviados. 
    
    Muchas gracias por su compra.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send("Email NO enviado");
    } else {
      res.send("Email enviado");
    }
  });
});

router.post("/sendemailsellers", async (req, res) => {
  const { mail } = req.query;
  const productos = req.body;

  const user = await profile.findOne({
    where: {
      mail: mail,
    },
  });

  let vendedores = [];
  for (const productSold of productos) {
    const vendedor = await profile.findOne({
      where: {
        id: productSold.profileId,
      },
    });
    vendedores.push(vendedor.mail);
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: vendedores,
    subject: "Express Clothes",
    text: `Estimado vendedor de "Express Clothes", usted ha realizado una venta de sus productos al usuario ${user.mail}. Por favor pongase en contacto con el mismo para coordinar el envio. 
    
    Muchas gracias.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send("Email NO enviado");
    } else {
      res.send("Email enviado");
    }
  });
});

module.exports = router;
