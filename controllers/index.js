const bethJson = (req, res, next) => {
    res.json(`Beth O'Driscoll`)
}

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotenv = require("dotenv").config({ path: ".env" });

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        decprecationErrors: true,
    }
});
const threeContacts = (req, res, next) => {

    async function run() {
        try {
            // Connect the client to the server (optional starting in v4.7)
            await client.connect();
            const database = client.db("CSE-341");
            const proInfo = database.collection("Contacts");
            const proJson = await proInfo.find({}).toArray()
            res.json(proJson);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);

}

const oneContact = (req, res, next) => {

    async function run() {
        try {
            // Connect the client to the server (optional starting in v4.7)
            await client.connect();
            const database = client.db("CSE-341");
            const proInfo = database.collection("Contacts");
            const proJson = await proInfo.findOne({ _id: new ObjectId(req.params.userId) });
            res.json(proJson);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);

}

module.exports = { bethJson, threeContacts, oneContact };