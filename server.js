import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to ecommerce app",
    })
})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})