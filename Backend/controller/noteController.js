import Note from '../model/notes.js';
//no need of importing express here

// Task : do error handling everywhere in the controller functions and send appropriate error messages to the client.
// eg use try catch blocks

export async function getNotes(req, res) {
    const notes = await Note.find();

    res.status(200).json({
        message: 'Notes fetched successfully',
        notes: notes,
    });
}

export async function getReadNotes(req, res) {
    const notes = await Note.find({ read: true });

    res.status(200).json({
        message: 'Read notes fetched successfully',
        notes: notes,
    });
}

export async function postNote(req, res) {
    const { title, content, read } = req.body;

    const newNote = new Note({
        title,
        content,
        read,
    });

    await newNote.save();

    res.status(200).json({
        message: 'Note created successfully',
        note: newNote,
    });
}

export async function updateNote(req, res) {
    const id = req.params.id;
    const { title, content, read } = req.body;

    const updateNote = await Note.findByIdAndUpdate(
        id,
        { title, content, read },
        { returnDocument: 'after' },
    );

    if (!updateNote) {
        return res.status(404).json({
            message: 'Note not found',
        });
    }

    res.status(200).json({
        message: 'Note updated successfully',
        note: updateNote,
    });
}

export async function deleteNote(req, res) {
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
        return res.status(404).json({
            message: 'Note not found',
        });
    }

    res.status(200).json({
        message: 'Note deleted successfully',
    });
}
