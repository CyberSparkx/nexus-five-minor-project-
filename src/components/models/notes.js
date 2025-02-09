import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        required: true, 
        trim: true 
    }
});

export default mongoose.models.notes || mongoose.model('notes', notesSchema);