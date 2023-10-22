const express = require("express");
const app = express();
const routes = express.Router();
const controller = require("../controllers");
const bodyParser = require("body-parser");
const validator = require("../middleware/validation-middleware.js");

routes.use("/", require("./swagger"));
routes.get("/presidents", controller.allPresidents);
routes.get("/presidents/:userId", controller.onePresident);
routes.post(
  "/presidents",
  bodyParser.json(),
  validator.savePresident,
  controller.createPresident
);
routes.put(
  "/presidents/:id",
  validator.savePresident,
  bodyParser.json(),
  controller.updatePresident
);
routes.delete("/presidents/:id", bodyParser.json(), controller.deletePresident);

module.exports = routes;
