const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const bodyParser = require("body-parser");
// app.use(bodyParser.json());

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", bodyParser.json(), swaggerUi.setup(swaggerDocument));

module.exports = router;
