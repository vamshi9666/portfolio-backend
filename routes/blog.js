import express from 'express';
import blogController from '../controllers/blog'
const router = express.Router();


router.get('/',blogController.get_all_blogs )

module.exports = router;
