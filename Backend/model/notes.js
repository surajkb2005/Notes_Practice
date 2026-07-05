import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// Now we can create a model using the schema. A model is a class with which we construct documents.
// In this case, each document will be a note with properties and behaviors as declared in our schema.
const Note = mongoose.model('Note', noteSchema);

export default Note;
