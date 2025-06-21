import React from 'react'; 
import './Navbar.css';

function Navbar({ onListButtonClick }) {
  return (
    <div className="navbar">
      <button className="location-button">
        <span className="material-symbols-outlined">near_me</span> Location
      </button>
      <button className="my-list-button" onClick={onListButtonClick}>
        <span className="material-symbols-outlined">bookmarks</span>
      </button>
    </div>
  );
}

export default Navbar;