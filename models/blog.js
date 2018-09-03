import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:{
    type:String,
    required:true
  },
  content:{
    type:String
  }
})

module.exports = mongoose.model('Blog', blogSchema)
