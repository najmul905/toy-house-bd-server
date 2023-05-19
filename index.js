const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app=express()
const port=process.env.PORT||5000;


app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Toy house bd')
})



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yq5wikg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("toysDB");
    const toysCollection = database.collection("toys");


app.get('/toys',async(req,res)=>{
  const cursor=toysCollection.find()
  const result=await cursor.toArray();
  res.send(result)
})
    app.post('/toys',async(req,res)=>{
      const toy=req.body
      console.log('new user',toy)
      const result = await toysCollection.insertOne(toy);
      res.send(result)
  })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.listen(port,()=>{
    console.log(`Toy house is running on ${port}`)
})