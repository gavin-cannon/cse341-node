const express = require('express')
const app = express();
const routes = express.Router();
const port = process.env.PORT || 8080;


app.use('/', require('./routes/index.js'));

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});