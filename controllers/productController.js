import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from 'slugify';

export const createProductController = async (req, res) => {
    try {

        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ message: 'Name is required!' });
            case !description:
                return res.status(500).send({ message: 'Description is required!' });
            case !price:
                return res.status(500).send({ message: 'Price is required!' });
            case !category:
                return res.status(500).send({ message: 'Category is required!' });
            case !quantity:
                return res.status(500).send({ message: 'Quantity is required!' });
            case photo && photo.size > 1000000:
                return res.status(500).send({ message: 'Photo is required and should be  less than 1mb!!' });
        }

        const products = await productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.cotentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product Created Successfully!',
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Something went wrong!!'
        })
    }
}

//get all products
export const getAllProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate('category')
            .select('-photo')
            .limit(12)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: 'All producteds fetched!!',
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong!!',
            error: error.message
        })
    }
}

//get a product
export const getProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .populate('category')
            .select('-photo')

        res.status(200).send({
            success: true,
            message: 'Product fetched!!',
            product,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong!!',
            error: error.message
        })
    }
}