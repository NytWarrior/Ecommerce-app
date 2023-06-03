import express from 'express';
import { createProductController, getAllProductController, getProductController, } from '../controllers/productController.js';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//get all product
router.get('/get-product', getAllProductController);

//get product by slug
router.get('/get-product/:slug', getProductController);

export default router;