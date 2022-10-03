const express = require("express")
const cors = require("cors")
// const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())



//To-do-app
//new commit
//new commit
//new commit
//appuser
//WjhvR3jI7k5DXHY4

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dctmt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const listCollection = client.db('To-do-app').collection('list');

        app.get('/list', async (req, res) => {
            const query = {};
            const cursor = listCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.post('/list', async (req, res) => {
            const newService = req.body;
            console.log(newService);
            const result = await listCollection.insertOne(newService);
            res.send(result);
        });

        app.delete('/list/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await listCollection.deleteOne(query);
            res.send(result);
        });
        app.put('/list/:id', async (req, res) => {
            const id = req.params.id;
            const updatUser = req.body;
            console.log(updatUser);
            const filter = { _id: ObjectId(id) }
            const option = { upsert: true };
            const updateDoc = {
                $set: {
                    title: updatUser.title,
                    description: updatUser.description
                }
            };
            const result = await listCollection.updateOne(filter, updateDoc, option)
            res.send(result);
        });
    }
    finally {

    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Running my node CRUD server')
})

app.listen(port, () => {
    console.log('crud server is running ');
})