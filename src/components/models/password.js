import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
    website: { 
        type: String, 
        required: true,
        trim: true
    },
    username: { 
        type: String, 
        required: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true,
    }
});

export default mongoose.models.Password || mongoose.model('Password', passwordSchema);