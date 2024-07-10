const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config()

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();

// Database Name
const dbName = process.env.DB_NAME;

const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(cors())

// console.log(process.env.NAMASTE) // remove this after you've confirmed it is working

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const insertResult = await collection.insertOne(password);
    res.send({success : true, result : insertResult});
})

app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const deleteResult = await collection.deleteOne(password);
    res.send({success : true, result : deleteResult});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
