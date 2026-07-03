import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});