const express = require('express')
const app = express();
const routes = express.Router();
const controller = require('../controllers');

routes.get('/', controller.bethJson);

module.exports = routes;