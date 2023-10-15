const express = require('express')
const app = express();
const routes = express.Router();
const controller = require('../controllers');

routes.get('/professional', controller.getProfessionalJson);


module.exports = routes;