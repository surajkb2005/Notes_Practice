import express from 'express';
import Note from '../model/notes.js';

const bookRouter = express.Router();

bookRouter.get('/', async (req, res) => {
    const notes = await Note.find();

    res.status(200).json({
        message: 'Notes fetched successfully',
        notes: notes
    });
});

bookRouter.get('/read', async (req, res) => {
    const notes = await Note.find({ read: true });

    res.status(200).json({
        message: 'Read notes fetched successfully',
        notes: notes
    });
});

bookRouter.post('/', async (req, res) => {
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

bookRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, content, read } = req.body;

    const updateNote = await Note.findByIdAndUpdate(id, { title, content, read }, { returnDocument: "after" });

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

bookRouter.delete('/:id', async (req, res) => {
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

export default bookRouter;