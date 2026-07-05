import express from 'express';
import {
    getNotes,
    getReadNotes,
    postNote,
    updateNote,
    deleteNote,
} from '../controller/noteController.js';

const noteRouter = express.Router();

noteRouter.get('/', getNotes);
noteRouter.get('/read', getReadNotes);
noteRouter.post('/', postNote);
noteRouter.put('/:id', updateNote);
noteRouter.delete('/:id', deleteNote);

export default noteRouter;
