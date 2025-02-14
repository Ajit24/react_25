import React, { useState } from 'react';
import '../NestedFile/Nested2.css';


const mockData = {
    id: 'root',
    name: 'root',
    type: 'folder',
    children: [
      {
          id: 'public',
          name: 'public',
          type: 'folder',
          children: [
            { id: 'favicon.ico', name: 'favicon.ico', type: 'file' },
            { id: 'robots.txt', name: 'robots.txt', type: 'file' },
            { id: 'index.html', name: 'index.html', type: 'file' }
  
          ]
        },
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        children: [
          {
            id: 'components',
            name: 'components',
            type: 'folder',
            children: [
              { id: 'button.jsx', name: 'Button.jsx', type: 'file' },
              { id: 'input.jsx', name: 'Input.jsx', type: 'file' }
            ]
          },
          { id: 'app.jsx', name: 'App.jsx', type: 'file' },
          { id: 'main.jsx', name: 'main.jsx', type: 'file' }
        ]
      },
      
      { id: 'package.json', name: 'package.json', type: 'file' },
      { id: 'readme.md', name: 'README.md', type: 'file' }
    ]
  };

function FileNode({ node, level = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isFolder = node.type === 'folder';

  const handleToggle = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="file-node">
      <div
        className={`file-item ${isHovered ? 'hovered' : ''}`}
        style={{ '--level': level }}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="file-content">
          {/* Simple arrow icons using HTML entities */}
          {isFolder && (
            <span className="chevron">
              {isOpen ? '▼' : '▶'}
            </span>
          )}
          {/* Simple folder/file icons using HTML entities */}
          <span className="file-icon">
            {isFolder ? (
              isOpen ? '📂' : '📁'
            ) : '📄'}
          </span>
          <span className="file-name">{node.name}</span>
        </div>
        {isHovered && (
          <div className="actions">
            <button
              className="action-button"
              onClick={(e) => {
                e.stopPropagation();
                // Add actions here
              }}
            >
              ⋮
            </button>
          </div>
        )}
      </div>
      {isFolder && (
        <div className={`children ${isOpen ? 'open' : ''}`}>
          {node.children?.map((child) => (
            <FileNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

const NestedFile = () => {
  return (
    <div className="file-system">
      <div className="file-system-header">
        <h1>File Explorer</h1>
        <p>Browse through your project files</p>
      </div>
      <div className="file-system-container">
        <div className="file-system-toolbar">
          <span className="toolbar-title">Project Files</span>
          <span className="toolbar-count">{mockData.children?.length || 0} items</span>
        </div>
        <div className="file-system-content">
          <FileNode node={mockData} />
        </div>
      </div>
    </div>
  );
};

export default NestedFile;

export { NestedFile }