const express = require('express')
const app = express();
const routes = express.Router();
const port = process.env.PORT || 5000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bodyParser = require('body-parser');


app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
        );
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    })
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/', require('./routes/contacts.js'));

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});