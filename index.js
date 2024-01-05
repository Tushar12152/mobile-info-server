const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port =process.env.PORT||5002;



// middleware
app.use(express.json())
app.use(cors())





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tgzt8q2.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();
    const userCollection = client.db("mobileInfo-db").collection("users");
    const mobileCollection = client.db("mobileInfo-db").collection("mobiles");
 
    

//user collection

    app.post('/users',async(req,res)=>{
           const user=req.body;
        //    console.log(user);
        const result=await userCollection.insertOne(user)
        res.send(result)

    })

    app.get('/users',async(req,res)=>{
          const result=await userCollection.find().toArray()
          res.send(result)
    })





    //mobile-collection

    app.post('/mobiles',async(req,res)=>{
           const mobile=req.body;
          //  console.log(mobile);
          const result=await mobileCollection.insertOne(mobile)
          res.send(result)
    })


    app.get('/mobiles',async(req,res)=>{
         const result=await mobileCollection.find().toArray()
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





app.get('/',(req,res)=>{
     res.send('Mobile info is comming soon....')
})
app.listen(port,()=>{
    console.log(`this server is going on port ${port}`);
})