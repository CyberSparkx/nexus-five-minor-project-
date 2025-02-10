import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// MongoDB connection URI
const uri = "mongodb+srv://narenroy:Japan555@cluster1.hjgpm.mongodb.net/";

// Mongoose schema for Project
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    link: {
      type: String,  // URL string for the project link
      required: false, // link is optional, set to false if not mandatory
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Mongoose model for Project
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

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
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

// GET method to return the list of projects
export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({});
    const response = NextResponse.json(projects);
    return addCorsHeaders(response);
  } catch (error) {
    console.error(error);
    const response = NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    return addCorsHeaders(response);
  }
}

// POST method to handle adding a new project
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, imageUrl, link } = body;

    if (!title || !imageUrl) {
      const response = NextResponse.json(
        { error: 'Title and imageUrl are required' },
        { status: 400 }
      );
      return addCorsHeaders(response);
    }

    await connectToDatabase();
    const newProject = new Project({ title, imageUrl, link });
    const savedProject = await newProject.save();

    const response = NextResponse.json(savedProject, { status: 201 });
    return addCorsHeaders(response);
  } catch (error) {
    console.error(error);
    const response = NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
    return addCorsHeaders(response);
  }
}

// OPTIONS method to handle preflight requests
export async function OPTIONS() {
  const response = NextResponse.json({});
  return addCorsHeaders(response);
}
