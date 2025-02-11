import { NextResponse } from 'next/server';
import mongoose from 'mongoose';


const db = process.env.NEXT_PUBLIC_MONGO_DB_URI;
// MongoDB connection URI
const uri = db;

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

// Helper function to add CORS headers
function addCorsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

// GET method to return the list of passwords
export async function GET() {
  try {
    await connectToDatabase();
    const passwords = await Password.find({});
    const response = NextResponse.json(passwords);
    return addCorsHeaders(response);
  } catch (error) {
    console.error(error);
    const response = NextResponse.json({ error: 'Failed to fetch passwords' }, { status: 500 });
    return addCorsHeaders(response);
  }
}

// POST method to handle adding a new password
export async function POST(request) {
  try {
    const body = await request.json();
    const { website, username, password } = body;

    if (!website || !username || !password) {
      const response = NextResponse.json(
        { error: 'Website, username, and password are required' },
        { status: 400 }
      );
      return addCorsHeaders(response);
    }

    await connectToDatabase();
    const newPassword = new Password({ website, username, password });
    const savedPassword = await newPassword.save();

    const response = NextResponse.json(savedPassword, { status: 201 });
    return addCorsHeaders(response);
  } catch (error) {
    console.error(error);
    const response = NextResponse.json({ error: 'Failed to add password' }, { status: 500 });
    return addCorsHeaders(response);
  }
}

// DELETE method to handle deleting a password by its ID
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const passwordId = url.searchParams.get('id');

    if (!passwordId) {
      const response = NextResponse.json({ error: 'Invalid password ID' }, { status: 400 });
      return addCorsHeaders(response);
    }

    // Ensure that passwordId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(passwordId)) {
      const response = NextResponse.json({ error: 'Invalid ObjectId format' }, { status: 400 });
      return addCorsHeaders(response);
    }

    await connectToDatabase();
    
    // Perform the delete operation using ObjectId
    const result = await Password.deleteOne({ _id: new mongoose.Types.ObjectId(passwordId) });

    if (result.deletedCount === 1) {
      const response = NextResponse.json({ message: 'Password deleted successfully' });
      return addCorsHeaders(response);
    } else {
      const response = NextResponse.json({ error: 'Password not found' }, { status: 404 });
      return addCorsHeaders(response);
    }
  } catch (error) {
    console.error(error);
    const response = NextResponse.json({ error: 'Failed to delete password' }, { status: 500 });
    return addCorsHeaders(response);
  }
}

// OPTIONS method to handle preflight requests
export async function OPTIONS() {
  const response = NextResponse.json({});
  return addCorsHeaders(response);
}
