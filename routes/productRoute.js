import express from 'express';
import {
    createProductController,
    deleteProductController,
    getAllProductController,
    getProductController,
    getProductImageController,
    productCountController,
    productFiltersController,
    productListController,
    relatedProductController,
    searchProductController,
    updateProductController,
}
    from '../controllers/productController.js';
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

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

router.get('/related-product/:pid/:cid', relatedProductController);

export default router;