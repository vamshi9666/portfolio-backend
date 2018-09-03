// require("babel-core/register");

import http from 'http'
import express from 'express'
import mongoose from 'mongoose'
const dotenv = require('dotenv').config()
const app = express()
const port = 5000;



app.listen(port, () => console.log(`server listening on port ${port}`))
