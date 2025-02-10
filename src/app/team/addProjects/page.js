'use client';

import { useEffect, useState } from 'react';

export default function ProjectForm() {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [flag, setFlag] = useState(false);

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Clear previous messages
        setError(null);
        setSuccess(null);

        // Validate form data
        if (!title || !imageUrl) {
            setError('Title and Image URL are required');
            return;
        }

        const newProject = { title, imageUrl, link };

        try {
            // Sending POST request to add a new project
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess('Project added successfully!');
                setTitle('');
                setImageUrl('');
                setLink('');
                console.log('Saved Project:', data);
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to add project');
            }
        } catch (err) {
            setError('Failed to add project');
            console.error(err);
        }
    };

    useEffect(() => {
        function checkCredentials() {
            let name = prompt("Enter your name:");
            let password = prompt("Enter your password:");
            
            if (name === "Naren Roy" && password === "Japan555") {
                setFlag(true);
                alert("Login successful!");
            } else {
                alert("Invalid credentials, please try again.");
            }
            
            console.log("Flag status:", flag);
        }
        checkCredentials();
    }, []);

    return (
        <div className={`max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8`}>
            {flag ? (
                <>
                    <h2 className="text-3xl font-semibold text-center text-gray-900">Add a New Project</h2>

                    {/* Error or Success message */}
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    {success && <p className="text-green-500 text-center mt-4">{success}</p>}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {/* Project Title */}
                        <div className="flex flex-col">
                            <label htmlFor="title" className="text-lg font-semibold text-gray-700">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-2 p-3 border border-gray-300 rounded-lg"
                                placeholder="Enter project title"
                                required
                            />
                        </div>

                        {/* Project Image URL */}
                        <div className="flex flex-col">
                            <label htmlFor="imageUrl" className="text-lg font-semibold text-gray-700">Image URL</label>
                            <input
                                type="url"
                                id="imageUrl"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="mt-2 p-3 border border-gray-300 rounded-lg"
                                placeholder="Enter image URL"
                                required
                            />
                        </div>

                        {/* Project Link (Optional) */}
                        <div className="flex flex-col">
                            <label htmlFor="link" className="text-lg font-semibold text-gray-700">Project Link (Optional)</label>
                            <input
                                type="url"
                                id="link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className="mt-2 p-3 border border-gray-300 rounded-lg"
                                placeholder="Enter project link (optional)"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="mt-6 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                            >
                                Add Project
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <p className="text-center text-red-500">You must be logged in to add a project.</p>
            )}
        </div>
    );
}
