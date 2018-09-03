import express from 'express';
import blogController from '../controllers/blog'
const router = express.Router();


router.get('/',blogController.get_all_blogs)

router.post('/',blogController.add_blog)

router.delete('/:id',blogController.delete_blog)

module.exports = router;
