const validator = require("../helper/validate");
const savePresident = async (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    party: "required|string",
    deathCause: "required|string",
    birthday: "required|date",
    vice: "required|string",
    start: "required|date",
    end: "required|date",
  };

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};

const saveWish = async (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    party: "required|string",
    birthday: "required|date",
    vice: "required|string",
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};
module.exports = {
  savePresident,
  saveWish,
};
