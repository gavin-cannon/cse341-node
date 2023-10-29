const express = require("express");
const app = express();
const routes = express.Router();
const port = process.env.PORT || 5000;
const passport = require("passport");

app.use("/", require("./routes/presidents.js"));
// app.use("/users", usersRouter);

// app.use(passport.initialize());

// app.get("/google", passport.authenticate("google", { scope: "profile" }));

// app.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     // res.redirect('/');
//     res.end("Logged in!");
//   }
// );

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
