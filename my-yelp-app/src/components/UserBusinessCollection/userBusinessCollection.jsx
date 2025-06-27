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
  const [currentFolder, setCurrentFolder] = useState(null);

  const visibleFolders = folders.filter(f => (currentFolder ? f.parentFolderId === currentFolder._id : !f.parentFolderId));
  const visibleFavorites = favorites
    .filter(fav => fav.type === "favorite")
    .filter(fav => (currentFolder ? fav.folderId === currentFolder._id : !fav.folderId));

  const fetchData = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/folders")
      .then((res) => res.json())
      .then((data) => setFolders(Array.isArray(data) ? data : []))
      .catch(() => setFolders([]));

    fetch("http://localhost:5000/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateFolder = () => {
    if (!newFolderName) return;

    fetch("http://localhost:5000/api/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newFolderName, parentFolderId: currentFolder ? currentFolder._id : null }),
    }).then((res) => res.json())
      .then(() => {
        fetchData();
        setNewFolderName("");
      });
  };

  const handleBackClick = () => {
    setCurrentFolder(null); // Go back to root
  };

  const handleFavoriteClick = (biz) => {
    console.log("Favorite clicked:", biz);
  };

  const handleDrop = (favoriteId, folderId) => {
    fetch('http://localhost:5000/api/folders/add-favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favoriteId, folderId }),
    }).then(res => res.json())
      .then(() => {
        fetchData(); 
      });
  };

  return (
    <div className="user-business-collection">
      <button className="close-collection" onClick={onClose}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <h2>Your Business Collection</h2>
      {currentFolder && (
        <button onClick={handleBackClick}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      )}
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
          {visibleFolders.map((folder) => (
            <DroppableFolder
              key={folder._id}
              folder={folder}
              onDrop={handleDrop}
              onClick={() => setCurrentFolder(folder)} // sets current folder to reset the collection view to current open folder
            />
          ))}
          {visibleFavorites.map((biz) => (
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