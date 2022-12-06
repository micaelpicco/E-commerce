const { Router } = require("express");
const router = Router();
const { payment } = require("./Controllers/payment");
const passport = require("passport");
const { marketedProduct, profile } = require("../DataBase/db");
const mercadopago = require("mercadopago");
const nodemailer = require("nodemailer");
const { reduceStock } = require("./Controllers/variantsStock");

router.get("/", passport.authenticate("jwt", { session: false }), payment);

router.post("/notificar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = req.query;
    const topic = query.topic;
    const user = await profile.findByPk(id);

    const allProducts = await marketedProduct.findAll({
      where: {
        profileId: id,
        pagado: false,
      },
    });
    const data = await allProducts;

    let a = [];
    switch (topic) {
      case "payment":
        const paymentId = query.id;
        const payment = await mercadopago.payment.findById(paymentId);
        console.log(payment.body.additional_info.items);
        for (let i = 0; i < payment.body.additional_info.items.length; i++) {
          if (payment.body.status === "approved") {
            a.push(payment.body.additional_info.items[i].id);
          }
        }
        break;
      default:
        break;
    }
    console.log(a);

    let contador = 0;

    for (const productSold of data) {
      if (a.includes(productSold.variantId)) {
        const comprados = await marketedProduct.update(
          {
            status: productSold.status,
            price: productSold.price,
            name: productSold.name,
            size: productSold.size,
            color: productSold.color,
            demographic: productSold.demographic,
            productoId: productSold.productoId,
            sellerId: productSold.sellerId,
            pagado: true,
          },
          { where: { id: productSold.id } }
        );
        await reduceStock(productSold.variantId, 1);

        const vendedor = await profile.findOne({
          where: {
            id: productSold.sellerId,
          },
        });

        console.log(vendedor.mail);

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL,
          to: vendedor.mail,
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
        contador = contador + 1;
        if (contador === data.length - 1) {
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
            text: `Hola ${user.name}, has comprado ${data.length} productos en Express Clothes. La compra de los mismos ha sido aprobada y ya estan siendo despachados y enviados. 
    
    Muchas gracias por su compra.`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.send("Email NO enviado");
            } else {
              res.send("Email enviado");
            }
          });
        }
      } else continue;
    }

    return "Comprado";
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
