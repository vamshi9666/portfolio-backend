const User= require('../models/user')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


const authChecker = (req,res,next) => {
  try {
    const pre_token = req.headers.authorization.split(" ")[1];

    const token = jwt.verify( pre_token,process.env.JWT_KEY);
    req.token = token;
    next()
  }
  catch(error) {
    console.log(`[JsonWebToken] : ${error}`);
    res.end(` [JsonWebToken] : Error in auth ! \n [JsonWebToken] : ${error}`)
  }
}

module.exports = authChecker;
