const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port =process.env.PORT||5002;


// middleware
app.use(express.json())
app.use(cors())






app.get('/',(req,res)=>{
     res.send('Mobile info is comming soon....')
})
app.listen(port,()=>{
    console.log(`this server is going on port ${port}`);
})