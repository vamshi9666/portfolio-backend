//imports
import http from 'http'
const bodyParser = require('body-parser')
import express from 'express'
import mongoose from 'mongoose'
import blogRoutes from './routes/blog'
import redis from 'redis'

//variables
const dotenv = require('dotenv').config()
const app = express()
const port = 5000;

const  redisClient = redis.createClient({
  host:'redis'
});

redisClient.on("error", function (err) {
    console.log("[Redis] : Error  in connecting to redis server" + err);
});

redisClient.on("ready", (err)=> {
  console.log("[Redis] : Redis is ready to connect ");
})

redisClient.on("connect", ()=> {
  console.log("[Redis] : Connected to redis databse");
})
//initializations
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true })
const con = mongoose.connection;

con.on('error',(err)=>{
  console.log("\n        ----Error in connecting to Databse---- \n \n ");
  res.status(404).json({
    message:"error in connecting to mongoDB",
    err:err
  })
})

con.on('open', function(args) {
  console.log("\n        ----connection to database opened----\n \n ");
});
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//@route blogController
app.use('/blog', blogRoutes)


app.listen(port, () => console.log(`server listening on port ${port}`))
