//imports
import http from 'http'
const bodyParser = require('body-parser')
import express from 'express'
import mongoose from 'mongoose'
import blogRoutes from './routes/blog'
import redis from 'redis'
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

import { User } from './models/user'
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
  console.log("\n        ----Error in connecting to Databse---- \n \n ", err);

})

con.on('open', function(args) {
  console.log("\n        ----connection to database opened----\n \n ");
});
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//@route blogController

app.post('/signup', (req,res,next) => {
  bcrypt.hash(req.body.password, 10 , (err,hash) => {
    if (err){
      console.log(`[Bcrypt] : Error in hashing password : ${err}`)
      res.status(301).json({
        message:" Error in creatting new user stage 1 ",
        data : err
      })
    }
    else {
      const user = new User({
        name:req.body.name,
        password:hash
      })
      user.save()
          .then(result => {
            console.log(`Error in creating new user Stage 2 `)
            res.status(202).json({
              message:`Error in creating new user Stage 2 `,
              data:result
            })
          })
          .catch(err => {
            console.log(`Error in creating new user Stage 3`)
            res.status(302).json({
              message:`Error in creating new user Stage 3`,
              data:err
            })
          })
    }
  })
})

app.post('/login', (req, res, next) => {
  User.find({
      name: req.body.name
    })
    .then(result => {
      console.log(result)
      if (result.length < 1) {
        return res.status(301).json({
          message: "Error in authentication"
        })
      }
      bcrypt.compare(req.body.password, result[0].password, (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(201).json({
            message: " error in authentication",
            erroe: err
          })
        }
        if (doc) {
          const token = jwt.sign({
            userName: req.body.username
          }, process.env.JWT_KEY, {
            expiresIn: "1h"
          })

					 return res.status(200).json({
            message: "user authenticated successfully !",
						session:req.session,
						token:token
          })
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(201).json({
        message: " error in authentication",
        error: err
      })
    })
});
app.use('/blog', blogRoutes)


app.listen(port, () => console.log(`server listening on port ${port}`))
