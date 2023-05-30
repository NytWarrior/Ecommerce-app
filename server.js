import express from 'express';
import dotenv, { config } from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import cors from 'cors';

//configure env
dotenv.config();

//database config
connectDB();

const app = express();

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/category", categoryRoutes);


app.get("/", (req, res) => {
    res.send({
        message: "Welcome to ecommerce app",
    })
})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})