const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./Routes/index");
const { logger } = require("./Routes/Utils/logger");
const { errorHandler } = require("./Routes/Utils/errorHandler");
const passport = require("passport");
const mercadopago = require("mercadopago");
const { payment, merchant_orders } = require("mercadopago");

require("dotenv").config();

const cookieParser = require("cookie-parser");
const session = require("express-session");

require("./Auth/verify-token");
require("./Auth/GoogleSSO");

const server = express();

server.name = "API";

server.use(morgan("dev"));

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());

server.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    `${process.env.FRONTEND || "http://localhost:3000"}`
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,Set-Cookie"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,OPTIONS, PUT, DELETE"
  );
  next();
});

server.get("/", (req, res, next) => {
  res.send("hello world");
});

//Token del usuario de prueba vendedor de mercadopago
mercadopago.configure({
  access_token:
    "APP_USR-3893474685008819-102513-18f45e4330eab9e0b1cbfc72f531cf92-1224963305",
});

server.use(passport.initialize());

server.use("/", routes);
server.use(logger);

// Error catching endware.
server.use(errorHandler);

module.exports = server;
