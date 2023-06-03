import express from 'express';
import { createProductController, getProductCntroller } from '../controllers/productController.js';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

router.get('/get-product', getProductCntroller);

export default router;