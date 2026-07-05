import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Note from './model/notes.js';
import connectDB from './config/dbconfig.js';
import noteRouter from './routes/noteRoutes.js';

dotenv.config();
connectDB();

const app = express(); //using express is to make the server handling easier
app.use(cors()); //using cors is to allow cross-origin requests

const port = process.env.PORT || 5000;

app.use(express.json());
// using the noteRouter for handling routes related to notes
app.use('/notes', noteRouter);

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
