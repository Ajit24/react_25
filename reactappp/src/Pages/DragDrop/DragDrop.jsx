import React, { useState, useRef } from 'react';
import '../DragDrop/DragDrop.css';

const DragDrop = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Format file size to human-readable format
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Check if file is an image
  const isImageFile = (file) => {
    return file.type.startsWith('image/');
  };

  // Handle file selection
  const handleFileSelect = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map(file => ({
      id: Date.now() + Math.random().toString(36).substring(2, 10),
      file,
      name: file.name,
      size: file.size,
      preview: isImageFile(file) ? URL.createObjectURL(file) : null
    }));

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  // Trigger file input click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Remove a file
  const handleRemoveFile = (id) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  // Clear all files
  const handleClearAll = () => {
    setFiles([]);
  };

  return (
    <div className="drag-drop-container">
      <div className="uploader-card">
        <h1 className="uploader-title">File Uploader</h1>
        <p className="uploader-subtitle">Drag & drop files or browse to upload</p>

        <div
          className={`drop-area ${isDragging ? 'active' : ''}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="drop-text">Drop files here</p>
          <p>or</p>
          <button className="browse-button" onClick={handleBrowseClick}>
            Browse Files
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="file-input"
            onChange={handleFileInputChange}
            multiple
          />
        </div>

        {files.length > 0 && (
          <div className="file-list">
            <div className="file-list-header">
              <span>Uploaded Files ({files.length})</span>
              <button className="clear-all" onClick={handleClearAll}>
                Clear All
              </button>
            </div>

            {files.map(file => (
              <div className="file-item" key={file.id}>
                <div className="file-preview">
                  {file.preview ? (
                    <img src={file.preview} alt={file.name} />
                  ) : (
                    <span>📄</span>
                  )}
                </div>
                <div className="file-info">
                  <h3 className="file-name">{file.name}</h3>
                  <p className="file-size">{formatFileSize(file.size)}</p>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveFile(file.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {files.length === 0 && (
          <div className="empty-list">
            <p>No files uploaded yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDrop;