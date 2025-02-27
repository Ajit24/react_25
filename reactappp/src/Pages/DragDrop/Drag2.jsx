import React, { useState, useRef } from 'react'; // Import React library and hooks for state and ref management
import '../DragDrop/DragDrop.css'; // Import CSS file for styling the DragDrop component

const DragDrop = () => { // Define a functional component named DragDrop
  const [files, setFiles] = useState([]); // State to store the list of uploaded files, initialized as an empty array
  const [isDragging, setIsDragging] = useState(false); // State to track if a file is being dragged over the drop area
  const fileInputRef = useRef(null); // Reference to the hidden file input element for programmatic control

  // Format file size to human-readable format
  const formatFileSize = (bytes) => { // Function to convert file size from bytes to a readable format (e.g., KB, MB)
    if (bytes === 0) return '0 Bytes'; // Return '0 Bytes' if the file size is 0
    const k = 1024; // Define the base unit (1024 bytes = 1 KB)
    const sizes = ['Bytes', 'KB', 'MB', 'GB']; // Array of size units
    const i = Math.floor(Math.log(bytes) / Math.log(k)); // Calculate the appropriate unit index
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]; // Return formatted size with 2 decimal places
  };

  // Check if file is an image
  const isImageFile = (file) => { // Function to determine if a file is an image based on its MIME type
    return file.type.startsWith('image/'); // Returns true if the file type starts with 'image/'
  };

  // Handle file selection
  const handleFileSelect = (selectedFiles) => { // Function to process selected files (from drag or input)
    const newFiles = Array.from(selectedFiles).map(file => ({ // Convert FileList to array and map to custom object
      id: Date.now() + Math.random().toString(36).substring(2, 10), // Generate unique ID using timestamp and random string
      file, // Store the original file object
      name: file.name, // Store the file name
      size: file.size, // Store the file size in bytes
      preview: isImageFile(file) ? URL.createObjectURL(file) : null // Create a preview URL if it's an image, otherwise null
    }));

    setFiles(prevFiles => [...prevFiles, ...newFiles]); // Update state by appending new files to the existing list
  };

  // Handle drag events
  const handleDragEnter = (e) => { // Function triggered when a dragged item enters the drop area
    e.preventDefault(); // Prevent default browser behavior (e.g., opening the file)
    setIsDragging(true); // Set dragging state to true to highlight the drop area
  };

  const handleDragLeave = (e) => { // Function triggered when a dragged item leaves the drop area
    e.preventDefault(); // Prevent default behavior
    setIsDragging(false); // Set dragging state to false to remove highlight
  };

  const handleDragOver = (e) => { // Function triggered when a dragged item is over the drop area
    e.preventDefault(); // Prevent default behavior to allow dropping
  };

  const handleDrop = (e) => { // Function triggered when files are dropped into the drop area
    e.preventDefault(); // Prevent default behavior
    setIsDragging(false); // Reset dragging state
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) { // Check if files were dropped
      handleFileSelect(e.dataTransfer.files); // Process the dropped files
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => { // Function triggered when files are selected via the file input
    if (e.target.files && e.target.files.length > 0) { // Check if files were selected
      handleFileSelect(e.target.files); // Process the selected files
    }
  };

  // Trigger file input click
  const handleBrowseClick = () => { // Function to programmatically trigger the file input dialog
    fileInputRef.current.click(); // Simulate a click on the hidden file input
  };

  // Remove a file
  const handleRemoveFile = (id) => { // Function to remove a specific file from the list
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id)); // Filter out the file with the given ID
  };

  // Clear all files
  const handleClearAll = () => { // Function to remove all files from the list
    setFiles([]); // Reset the files state to an empty array
  };

  return ( // Render the component's UI
    <div className="drag-drop-container"> // Outer container for styling
      <div className="uploader-card"> // Card-like container for the uploader UI
        <h1 className="uploader-title">File Uploader</h1> // Title of the uploader
        <p className="uploader-subtitle">Drag & drop files or browse to upload</p> // Instructional subtitle

        <div // Drop area div with dynamic class and event handlers
          className={`drop-area ${isDragging ? 'active' : ''}`} // Add 'active' class when dragging
          onDragEnter={handleDragEnter} // Handle drag enter event
          onDragOver={handleDragOver} // Handle drag over event
          onDragLeave={handleDragLeave} // Handle drag leave event
          onDrop={handleDrop} // Handle drop event
        >
          <p className="drop-text">Drop files here</p> // Text prompting to drop files
          <p>or</p> // Separator text
          <button className="browse-button" onClick={handleBrowseClick}> // Button to trigger file input
            Browse Files
          </button>
          <input // Hidden file input for manual file selection
            type="file" // File input type
            ref={fileInputRef} // Attach ref for programmatic access
            className="file-input" // Styling class
            onChange={handleFileInputChange} // Handle file selection event
            multiple // Allow multiple files to be selected
          />
        </div>

        {files.length > 0 && ( // Conditionally render file list if there are uploaded files
          <div className="file-list"> // Container for the list of uploaded files
            <div className="file-list-header"> // Header for the file list
              <span>Uploaded Files ({files.length})</span> // Display number of uploaded files
              <button className="clear-all" onClick={handleClearAll}> // Button to clear all files
                Clear All
              </button>
            </div>

            {files.map(file => ( // Map over files to render each file item
              <div className="file-item" key={file.id}> // Container for individual file item
                <div className="file-preview"> // Preview section for the file
                  {file.preview ? ( // If there's a preview (image), show it
                    <img src={file.preview} alt={file.name} /> // Display image preview
                  ) : ( // Otherwise, show a generic file icon
                    <span>📄</span> // Placeholder for non-image files
                  )}
                </div>
                <div className="file-info"> // File details section
                  <h3 className="file-name">{file.name}</h3> // Display file name
                  <p className="file-size">{formatFileSize(file.size)}</p> // Display formatted file size
                </div>
                <button // Button to remove the file
                  className="remove-button"
                  onClick={() => handleRemoveFile(file.id)} // Call remove function with file ID
                >
                  ✕ // Remove icon
                </button>
              </div>
            ))}
          </div>
        )}

        {files.length === 0 && ( // Conditionally render message if no files are uploaded
          <div className="empty-list"> // Container for empty state message
            <p>No files uploaded yet</p> // Message indicating no files
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDrop; // Export the DragDrop component for use in other parts of the app