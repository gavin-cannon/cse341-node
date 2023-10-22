const express = require("express");
const app = express();
const routes = express.Router();
const port = process.env.PORT || 5000;

app.use("/", require("./routes/presidents.js"));

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
