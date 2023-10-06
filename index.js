const express = require('express')
const app = express();
const routes = express.Router();
const port = process.env.PORT || 5000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


app
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/', require('./routes/contacts.js'));

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});