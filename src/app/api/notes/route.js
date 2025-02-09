import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// MongoDB connection URI
const uri = "mongodb+srv://narenroy:Japan555@cluster1.hjgpm.mongodb.net/";

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

// GET method to return the list of notes
export async function GET() {
  try {
    await connectToDatabase();
    const notes = await Note.find({});
    return NextResponse.json(notes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

// POST method to handle adding a new note
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const newNote = new Note({ title, description });
    const savedNote = await newNote.save();

    return NextResponse.json(savedNote, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
  }
}

// DELETE method to handle deleting a note by its ID
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const noteId = url.searchParams.get('id');

    if (!noteId) {
      return NextResponse.json({ error: 'Invalid note ID' }, { status: 400 });
    }

    // Ensure that noteId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return NextResponse.json({ error: 'Invalid ObjectId format' }, { status: 400 });
    }

    await connectToDatabase();
    
    // Perform the delete operation using ObjectId
    const result = await Note.deleteOne({ _id: new mongoose.Types.ObjectId(noteId) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Note deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}
