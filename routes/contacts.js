const express = require('express')
const app = express();
const routes = express.Router();
const controller = require('../controllers');

routes.get('/contacts/all', controller.threeContacts);
routes.get('/contacts/:userId', controller.oneContact);

module.exports = routes;