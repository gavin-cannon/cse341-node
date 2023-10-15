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
      const presidentsJson = await presidents.find({}).toArray();
      res.json(presidentsJson);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
};

const onePresident = (req, res, next) => {
  async function run() {
    try {
      await client.connect();
      const database = client.db("Presidents");
      const presidents = database.collection("Presidents");
      const singlePresidentJson = await presidents.findOne({
        _id: new ObjectId(req.params.userId),
      });
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
    deathCause: req.body.favoriteColor,
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
    favoriteColor: req.body.favoriteColor,
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
      res.status(204).send("No Content");
    } finally {
      await client.close();
    }
  }

  run().catch(console.dir);
};
const deletePresident = (req, res, next) => {
  async function run() {
    try {
      await client.connect();
      const database = client.db("Presidents");
      const presidents = database.collection("Presidents");
      const result = await presidents.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.status(200).send("OK");
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
