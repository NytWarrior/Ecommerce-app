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