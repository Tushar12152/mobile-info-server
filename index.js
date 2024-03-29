const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port =process.env.PORT||5002;



// middleware
app.use(express.json())
app.use(cors())





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const addCollection = client.db("mobileInfo-db").collection("adds");
 
 
    // adds collection


    app.post('/adds',async(req,res)=>{
         const add=req.body;
        //  console.log(add);
        const result=await addCollection.insertOne(add)
        res.send(result)
    })


    app.get('/adds',async(req,res)=>{
         const result=await addCollection.find().toArray()
         res.send(result)
    })

    app.delete('/adds/:id',async(req,res)=>{
         const id=req.params.id;
         const result=await  addCollection.deleteOne({_id:new ObjectId(id)})
         res.send(result)
    })
    









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



    app.patch('/users/:id',async (req,res)=>{
          const id=req.params.id;
          // console.log(id);
          const filter = { _id: new ObjectId(id) };
          const options = { upsert: true }
          const info=req.body;
          // console.log(info);
          const updateDoc={
            $set:{
              role:info?.role
            }
          }

          const result=await userCollection.updateOne(filter,updateDoc,options)
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

    app.delete('/mobiles/:id',async(req,res)=>{
          const id=req.params.id;
          // console.log(id);
          const query={_id:new ObjectId(id)}
          const result=await mobileCollection.deleteOne(query)
          res.send(result)
    })

    app.get('/mobiles/:id',async(req,res)=>{
           const id=req.params.id;
           const result=await mobileCollection.findOne({_id:new ObjectId(id)})
           res.send(result)
          })


    app.patch('/mobiles/:id',async(req,res)=>{
       const id=req.params.id;
      const filter = {_id:new ObjectId(id)}
      const options = { upsert: true }
  
      const updatedMobile=req.body;
        // console.log(updatedMobile);

      const updateDoc = {
        $set: {
          name:updatedMobile.name,
          brand:updatedMobile.brand,
          ram:updatedMobile.ram,
          rom:updatedMobile.rom,
          battery:updatedMobile.battery,
          processor:updatedMobile.processor,
          camara:updatedMobile.camara,
          price:updatedMobile.price,
          color:updatedMobile.color,
          screen:updatedMobile.screen,
          finger:updatedMobile.finger,
          flash:updatedMobile.flash,
          status:updatedMobile.status,
          network:updatedMobile.network,
          fontCamara:updatedMobile.fontCamara,
          sim:updatedMobile.sim,
          usb:updatedMobile.usb,
          radio:updatedMobile.radio,
          faceLock:updatedMobile.faceLock,

        },
      };

      const result = await mobileCollection.updateOne(filter, updateDoc, options);
      res.send(result)

    })


    app.delete('/users/:id',async(req,res)=>{
          const id=req.params.id
          const result=await userCollection.deleteOne({_id:new ObjectId(id)})
          res.send(result)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to Mong oDB!");
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