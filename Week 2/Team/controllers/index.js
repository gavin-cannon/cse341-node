const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require("dotenv").config({ path: ".env" });

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        decprecationErrors: true,
    }
});
const getProfessionalJson = (req, res, next) => {

    async function run() {
        try {
            // Connect the client to the server (optional starting in v4.7)
            console.log("hello")
            await client.connect();
            const database = client.db("CSE-341");
            const proInfo = database.collection("W02-Team");
            const proJson = await proInfo.findOne();
            res.json(proJson.proInfo);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);

}


module.exports = { getProfessionalJson };