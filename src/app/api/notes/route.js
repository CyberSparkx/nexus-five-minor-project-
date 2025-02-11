import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const db = process.env.NEXT_PUBLIC_MONGO_DB_URI;
// MongoDB connection URI
const uri = db;

// Mongoose schema for Note
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Mongoose model for Note
const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

// Connect to the database
async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return mongoose.connection.db;
}

// Helper function to add CORS headers
function addCorsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

// GET method to return the list of notes
export async function GET() {
  try {
    await connectToDatabase();
    const notes = await Note.find({});
    const response = NextResponse.json(notes);
    return addCorsHeaders(response);
  } catch (error) {
    console.error(error);
    const response = NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
    return addCorsHeaders(response);
  }
}

// POST method to handle adding a new note
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title || !description) {
      const response = NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
      return addCorsHeaders(response);
    }

    await connectToDatabase();
    const newNote = new Note({ title, description });
    const savedNote = await newNote.save();

    const response = NextResponse.json(savedNote, { status: 201 });
    return addCorsHeaders(response);
  } catch (error) {
    console.error(error);
    const response = NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
    return addCorsHeaders(response);
  }
}

// DELETE method to handle deleting a note by its ID
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const noteId = url.searchParams.get('id');

    if (!noteId) {
      const response = NextResponse.json({ error: 'Invalid note ID' }, { status: 400 });
      return addCorsHeaders(response);
    }

    // Ensure that noteId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      const response = NextResponse.json({ error: 'Invalid ObjectId format' }, { status: 400 });
      return addCorsHeaders(response);
    }

    await connectToDatabase();
    
    // Perform the delete operation using ObjectId
    const result = await Note.deleteOne({ _id: new mongoose.Types.ObjectId(noteId) });

    if (result.deletedCount === 1) {
      const response = NextResponse.json({ message: 'Note deleted successfully' });
      return addCorsHeaders(response);
    } else {
      const response = NextResponse.json({ error: 'Note not found' }, { status: 404 });
      return addCorsHeaders(response);
    }
  } catch (error) {
    console.error(error);
    const response = NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
    return addCorsHeaders(response);
  }
}

// OPTIONS method to handle preflight requests
export async function OPTIONS() {
  const response = NextResponse.json({});
  return addCorsHeaders(response);
}
