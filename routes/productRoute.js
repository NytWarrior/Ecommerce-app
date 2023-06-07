import express from 'express';
import { createProductController, deleteProductController, getAllProductController, getProductController, getProductImageController, productFiltersController, updateProductController, } from '../controllers/productController.js';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//get all product
router.get('/get-product', getAllProductController);

//get product by slug
router.get('/get-product/:slug', getProductController);

router.get('/product-image/:pid', getProductImageController);
//delete product
router.delete('/delete-product/:pid', deleteProductController);

//update a product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);
//filter product
router.post('/product-filters', productFiltersController);

export default router;