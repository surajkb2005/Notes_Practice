import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import Note from './model/notes.js';
import connectDB from './config/dbconfig.js';

dotenv.config();
connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/books',async (req,res)=>{
    const notes = await Note.find();

    res.status(200).json({
        message:'Notes fetched successfully',
        notes:notes
    });
});

app.post('/books', async (req, res) => {
    const { title, content, read } = req.body;

    const newNote = new Note({
        title, content, read
    });

    await newNote.save();

    res.status(200).json({
        message: 'Note created successfully',
        note: newNote
    });
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});