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
            await client.connect();
            const database = client.db("CSE-341");
            const contacts = database.collection("Contacts");
            const contactsJson = await contacts.find({}).toArray()
            res.json(contactsJson);
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
            await client.connect();
            const database = client.db("CSE-341");
            const contacts = database.collection("Contacts");
            const singleContactJson = await contacts.findOne({ _id: new ObjectId(req.params.userId) });
            res.json(singleContactJson);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);

}

module.exports = { bethJson, threeContacts, oneContact };