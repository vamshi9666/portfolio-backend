import  Blog  from '../models/blog'

exports.get_all_blogs = (req,res,next) => {
  Blog.find({})
      .then(result => {
        console.log(result);
        res.status(200).json({
          count:result.lenght,
          data:result
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
