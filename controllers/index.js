const bethJson = (req, res, next) => {
    res.json(`Beth O'Driscoll`)
}


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const dotenv = require("dotenv").config({ path: ".env" });

const uri = process.env.CONNECTION_STRING;

const bodyParser = require("body-parser");
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        decprecationErrors: true,
    }
});

const threeContacts = (req, res, next) => {
    try {
        async function run() {
            try {
                await client.connect();
                const database = client.db("CSE-341");
                const contacts = database.collection("Contacts");
                const contactsJson = await contacts.find({}).toArray()
                res.json(contactsJson);
            } finally {
                // await client.close();
            }
        }
        // run().catch(console.dir);
    } catch (err) {
        res.status(500).json(err);
    }
}

const oneContact = (req, res, next) => {
    try {
        async function run() {
            try {
                await client.connect();
                const database = client.db("CSE-341");
                const contacts = database.collection("Contacts");
                const singleContactJson = await contacts.findOne({ _id: new ObjectId(req.params.userId) });
                res.json(singleContactJson);
            } finally {

                // await client.close();
            }
        }
        run().catch(console.dir);
    } catch (err) {
        res.status(500).json(err);
    }
}

const createContact = (req, res, next) => {
    try {
        async function run() {

            try {
                await client.connect();
                const database = client.db("CSE-341");
                const contacts = database.collection("Contacts");
                const newContact = req.body;
                const result = await contacts.insertOne(newContact);
                console.log(result);
                res.status(201).json(result);

            } finally {
                // await client.close();
            }

        }

        run().catch(console.dir);
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateContact = (req, res, next) => {
    try {
        async function run() {

            try {
                await client.connect();
                const database = client.db("CSE-341");
                const contacts = database.collection("Contacts");
                const result = await contacts.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
                res.status(204).send("No Content");
            } finally {
                // await client.close();
            }
        }

        run().catch(console.dir);
    } catch (err) {
        res.status(500).json(err);
    }
}
const deleteContact = (req, res, next) => {
    try {

        async function run() {

            try {
                await client.connect();
                const database = client.db("CSE-341");
                const contacts = database.collection("Contacts");
                const result = await contacts.deleteOne({ _id: new ObjectId(req.params.id) });
                console.log(result);
                res.status(200).send("OK");
            } finally {
                // await client.close();
            }
        }
        run().catch(console.dir);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { bethJson, threeContacts, oneContact, createContact, updateContact, deleteContact };