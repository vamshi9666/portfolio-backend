import  Blog  from '../models/blog'
import mongoose from 'mongoose'

exports.get_all_blogs = (req,res,next) => {
  Blog.find({})
      .then(result => {
        console.log(result);
        res.status(200).json({
          "count":result.length,
          "data":result
        })
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          message:"error in get_all_blogs controller",
          error:err
        })
      })
}

exports.add_blog = (req,res,next) => {
  const blog =  new Blog({
    _id:  mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content
  })
  blog
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: " Blog Created ",
        data: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        message: `error in adding new blog controller ${this}`,
        error : err
      })
    })
}

exports.delete_blog = (req,res,next) => {
  const id = req.params.id;
  Blog.remove({_id :id})
      .then(result => {
        console.log(result);
        res.status(200).json({
          message: " Blog deleted successfully !",
          data: result
        })
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          message: " Error in deleting Blogs ",
          error:err
        })
      })
}
