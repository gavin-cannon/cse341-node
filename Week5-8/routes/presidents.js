const express = require("express");
const app = express();
const routes = express.Router();
const controller = require("../controllers");
const bodyParser = require("body-parser");

routes.use("/", require("./swagger"));
routes.get("/presidents", controller.allPresidents);
routes.get("/presidents/:userId", controller.onePresident);
routes.post("/presidents", bodyParser.json(), controller.createPresident);
routes.put("/presidents/:id", bodyParser.json(), controller.updatePresident);
routes.delete("/presidents/:id", bodyParser.json(), controller.deletePresident);

module.exports = routes;
