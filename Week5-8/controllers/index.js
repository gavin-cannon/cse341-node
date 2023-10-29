const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const dotenv = require("dotenv").config({ path: ".env" });

const uri = process.env.CONNECTION_STRING;

const bodyParser = require("body-parser");
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    decprecationErrors: true,
  },
});

const allPresidents = (req, res, next) => {
  async function run() {
    try {
      await client.connect();
      const database = client.db("Presidents");
      const presidents = database.collection("Presidents");
      const presidentsJson = await presidents.find({}).toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
      });
      res.json(presidentsJson);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
};

const onePresident = (req, res, next) => {
  if (!ObjectId.isValid(req.params.userId)) {
    res
      .status(400)
      .json(
        "ID is not valid. ID must be valid to get one President. Please try again."
      );
  }
  async function run() {
    try {
      await client.connect();
      const database = client.db("Presidents");
      const presidents = database.collection("Presidents");
      const singlePresidentJson = await presidents.findOne(
        {
          _id: new ObjectId(req.params.userId),
        },
        function (err, result) {
          if (err) {
            res.status(400).json({ message: err });
          }
        }
      );
      res.json(singlePresidentJson);
    } finally {
      // Ensures that the client will close when you finish/erro
      await client.close();
    }
  }
  run().catch(console.dir);
};

const createPresident = (req, res, next) => {
  const president = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    party: req.body.party,
    deathCause: req.body.deathCause,
    birthday: req.body.birthday,
    vice: req.body.vice,
    start: req.body.start,
    end: req.body.end,
  };

  async function run() {
    try {
      await client.connect();
      const database = client.db("Presidents");
      const presidents = database.collection("Presidents");
      const newPresident = req.body;
      const result = await presidents.insertOne(newPresident);
      res.status(201).json(result);
    } finally {
      await client.close();
    }
  }

  run().catch(console.dir);
};

const updatePresident = (req, res, next) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    party: req.body.party,
    deathCause: req.body.deathCause,
    birthday: req.body.birthday,
    vice: req.body.vice,
    start: req.body.start,
    end: req.body.end,
  };

  async function run() {
    try {
      await client.connect();
      const database = client.db("Presidents");
      const presidents = database.collection("Presidents");
      const result = await presidents.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      if (response.modifiedCount > 0) {
        res.status(204).send("No Content");
      } else {
        res
          .status(500)
          .json(
            response.error ||
              "Some error occured while updating the information."
          );
      }
    } finally {
      await client.close();
    }
  }

  run().catch(console.dir);
};
const deletePresident = (req, res, next) => {
  console.log(req.params.id);
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json(
        "ID is not valid. ID must be valid to delete one President. Please try again."
      );
  }
  async function run() {
    try {
      await client.connect();
      const database = client.db("Presidents");
      const presidents = database.collection("Presidents");
      const result = await presidents.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(200).send("OK");
      } else {
        res.status(500).json(response.error) ||
          "Some error occured while deleting the President file.";
      }
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
};

module.exports = {
  allPresidents,
  onePresident,
  createPresident,
  updatePresident,
  deletePresident,
};
