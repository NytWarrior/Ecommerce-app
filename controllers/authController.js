import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        //validations
        if (!name) {
            return resizeBy.send({ error: 'Name is required!' });
        }
        if (!email) {
            return resizeBy.send({ error: 'Email is required!' });
        }
        if (!password) {
            return resizeBy.send({ error: 'Password is required!' });
        }
        if (!phone) {
            return resizeBy.send({ error: 'Phone number is required!' });
        }
        if (!address) {
            return resizeBy.send({ error: 'Address is required!' });
        }

        //check user
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already Register please login!',
            })
        }
        //register user 
        const hashedPassword = await hashPassword(password);

        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();

        res.status(201).send({
            success: true,
            message: 'User register successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })

    }
};
