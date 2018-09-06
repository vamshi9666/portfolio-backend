import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name:String,
  password:String
})

module.exports = mongoose.model('User',userSchema);
