import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// MongoDB connection URI
const uri = "mongodb+srv://narenroy:Japan555@cluster1.hjgpm.mongodb.net/";

// Mongoose schema for Password
const passwordSchema = new mongoose.Schema(
  {
    website: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Mongoose model for Password
const Password = mongoose.models.Password || mongoose.model('Password', passwordSchema);

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

// GET method to return the list of passwords
export async function GET() {
  try {
    await connectToDatabase();
    const passwords = await Password.find({});
    return NextResponse.json(passwords);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch passwords' }, { status: 500 });
  }
}

// POST method to handle adding a new password
export async function POST(request) {
  try {
    const body = await request.json();
    const { website, username, password } = body;

    if (!website || !username || !password) {
      return NextResponse.json(
        { error: 'Website, username, and password are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const newPassword = new Password({ website, username, password });
    const savedPassword = await newPassword.save();

    return NextResponse.json(savedPassword, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add password' }, { status: 500 });
  }
}

// DELETE method to handle deleting a password by its ID
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const passwordId = url.searchParams.get('id');

    if (!passwordId) {
      return NextResponse.json({ error: 'Invalid password ID' }, { status: 400 });
    }

    // Ensure that passwordId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(passwordId)) {
      return NextResponse.json({ error: 'Invalid ObjectId format' }, { status: 400 });
    }

    await connectToDatabase();
    
    // Perform the delete operation using ObjectId
    const result = await Password.deleteOne({ _id: new mongoose.Types.ObjectId(passwordId) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Password deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Password not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete password' }, { status: 500 });
  }
}
