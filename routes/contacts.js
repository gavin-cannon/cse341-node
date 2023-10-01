const express = require('express')
const app = express();
const routes = express.Router();
const controller = require('../controllers');
const bodyParser = require("body-parser");
// app.use(bodyParser.json())

routes.get('/contacts/all', controller.threeContacts);
routes.get('/contacts/:userId', controller.oneContact);
routes.post('/', bodyParser.json(), controller.createContact);
routes.put('/:id', bodyParser.json(), controller.updateContact);
routes.delete('/:id', bodyParser.json(), controller.deleteContact);

module.exports = routes;