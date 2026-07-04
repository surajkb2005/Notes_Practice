import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import Note from './model/notes.js';
import connectDB from './config/dbconfig.js';

dotenv.config();
connectDB();

const app = express(); //using express is to make the server handling easier
app.use(cors()); //using cors is to allow cross-origin requests

const port = process.env.PORT || 5000;

app.use(express.json());
 
app.get('/books', async (req, res) => {
    const notes = await Note.find();

    res.status(200).json({
        message: 'Notes fetched successfully',
        notes: notes
    });
});

app.get('/books/read', async (req, res) => {
    const notes = await Note.find({ read: true });

    res.status(200).json({
        message: 'Read notes fetched successfully',
        notes: notes
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

app.put('/books/:id', async (req, res) => {
    const id = req.params.id;
    const { title, content, read } = req.body;

    const updateNote = await Note.findByIdAndUpdate(id, { title, content, read }, { new: true });

    if (!updateNote) {
        return res.status(404).json({
            message: 'Note not found'
        });
    }

    res.status(200).json({
        message: 'Note updated successfully',
        note: updateNote
    });
});

app.delete('/books/:id', async (req, res) => {
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
        return res.status(404).json({
            message: 'Note not found'
        });
    }

    res.status(200).json({
        message: 'Note deleted successfully'
    });
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});