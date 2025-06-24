import React, { useEffect, useState } from "react";
import "./UserBusinessCollection.css";

function UserBusinessCollection({ onClose }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");

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
    // Add your folder click handling logic here
  };

  const handleFavoriteClick = (biz) => {
    console.log("Favorite clicked:", biz);
    // Add your favorite click handling logic here
  };

  return (
    <div className="user-business-collection">
      <button className="close-collection" onClick={onClose}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <input
        type="text"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
        placeholder="New folder name"
      />
      <button onClick={handleCreateFolder}>Create Folder</button>
      <h2>Your Business Collection</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="collection-inline">
          {folders.map((folder) => (
              <button key={folder._id} className="collection-item-btn" onClick={() => handleFolderClick(folder)}>
                <span role="img" aria-label="folder">📁</span> {" "} {folder.name}
              </button>
          ))}
          {favorites.map((biz) => (
              <button key={biz._id} className="collection-item-btn" onClick={() => handleFavoriteClick(biz)}>
                {biz.name}
              </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBusinessCollection;