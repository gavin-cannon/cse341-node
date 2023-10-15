const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const bodyParser = require("body-parser");

router.use(
  "/presidents/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

module.exports = router;
