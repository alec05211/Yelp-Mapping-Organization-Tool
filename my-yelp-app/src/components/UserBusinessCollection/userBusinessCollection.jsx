import React, { useEffect, useState } from "react";
import "./UserBusinessCollection.css";
import DroppableFolder from "../DraggableItems/DroppableFolder";
import DraggableFavorite from "../draggableItems/DraggableFavorite";

function UserBusinessCollection({ onClose }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/folders")
      .then((res) => res.json())
      .then((data) => {
        // Ensure folders is always an array
        setFolders(Array.isArray(data) ? data : []);
      })
      .catch(() => setFolders([])); // On error, set to empty array

    fetch("http://localhost:5000/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCreateFolder = () => {
    if (!newFolderName) return;

    fetch("http://localhost:5000/api/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newFolderName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFolders((prev) => [...prev, data]);
        setNewFolderName("");
      });
  };

  const handleFolderClick = (folder) => {
    console.log("Folder clicked:", folder);
    
  };

  const handleFavoriteClick = (biz) => {
    console.log("Favorite clicked:", biz);
  };

  // On drop event handler
  const handleDrop = (favoriteId, folderId) => {
    fetch('http://localhost:5000/api/folders/add-favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favoriteId, folderId }),
    })
      .then(res => res.json())
      .then(data => {
        // Update UI state as needed
      });
  };

  return (
    <div className="user-business-collection">
      <button className="close-collection" onClick={onClose}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <h2>Your Business Collection</h2>
      {showCreateFolder ? (
        <div className="create-folder-form">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="New folder name"
          />
          <button onClick={handleCreateFolder}>
            <span className="material-symbols-outlined">
              keyboard_return
            </span>
          </button>
          <button onClick={() => setShowCreateFolder(false)}>
            <span className="material-symbols-outlined">
              cancel
            </span>
          </button>
        </div>
      ) : (
        <button onClick={() => setShowCreateFolder(true)}>
          <span className="material-symbols-outlined">create_new_folder</span>
        </button>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="collection-inline">
          {folders.map((folder) => (
            <DroppableFolder
              key={folder._id}
              folder={folder}
              onDrop={handleDrop}
              onClick={() => handleFolderClick(folder)}
            />
          ))}
          {favorites.map((biz) => (
            <DraggableFavorite
              key={biz._id}
              biz={biz}
              onClick={() => handleFavoriteClick(biz)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBusinessCollection;