const express = require('express')
const app = express();
const routes = express.Router();
const controller = require('../controllers');
const bodyParser = require("body-parser");
// app.use(bodyParser.json())

routes.use("/", require("./swagger"));
routes.get('/contacts', controller.threeContacts);
routes.get('/contacts/:userId', controller.oneContact);
routes.post('/contacts', bodyParser.json(), controller.createContact);
/*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Add a user',
                schema: { $ref: '#/definitions/AddUser' }
        } */
routes.put('/contacts/:id', bodyParser.json(), controller.updateContact);
routes.delete('/contacts/:id', bodyParser.json(), controller.deleteContact);

module.exports = routes;