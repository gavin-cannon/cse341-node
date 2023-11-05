const express = require("express");
const app = express();
const routes = express.Router();
const controller = require("../controllers");
const bodyParser = require("body-parser");
const validator = require("../middleware/validation-middleware.js");

const dotenv = require("dotenv").config({ path: ".env" });
const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0,
  baseURL: "https://presidents.onrender.com",
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.BASEURL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
routes.use(auth(config));

// req.isAuthenticated is provided from the auth router
routes.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

const { requiresAuth } = require("express-openid-connect");

routes.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

routes.use("/", require("./swagger"));
routes.get("/presidents", requiresAuth(), controller.allPresidents);
routes.get("/presidents/:userId", requiresAuth(), controller.onePresident);
routes.post(
  "/presidents",
  requiresAuth(),
  bodyParser.json(),
  validator.savePresident,
  controller.createPresident
);

routes.put(
  "/presidents/:id",
  requiresAuth(),
  validator.savePresident,
  bodyParser.json(),
  controller.updatePresident
);
routes.delete(
  "/presidents/:id",
  requiresAuth(),
  bodyParser.json(),
  controller.deletePresident
);

routes.get("/wishPresidents", requiresAuth(), controller.allWishPresidents);
routes.get(
  "/wishPresidents/:userId",
  requiresAuth(),
  controller.oneWishPresident
);
routes.post(
  "/wishPresidents",
  requiresAuth(),
  bodyParser.json(),
  validator.saveWish,
  controller.createWishPresident
);
routes.put(
  "/wishPresidents/:id",
  requiresAuth(),
  validator.saveWish,
  bodyParser.json(),
  controller.updateWishPresident
);
routes.delete(
  "/wishPresidents/:id",
  requiresAuth(),
  bodyParser.json(),
  controller.deleteWishPresident
);

module.exports = routes;
