const express = require("express");
const app = express();
const routes = express.Router();
const port = process.env.PORT || 5000;

app.use("/", require("./routes/contacts.js"));

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
