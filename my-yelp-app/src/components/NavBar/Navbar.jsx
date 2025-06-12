import React from 'react'; 
import './Navbar.css';

function Navbar() {
    
    const handleSelect = () => {
        console.log("Personal Collection button clicked.");
        onListButtonClick();
    }
    
    return (
        <div className="navbar">
            <button className="location-button"> <span className="material-symbols-outlined">near_me</span> Location</button>
            
            <button className="my-list-button" onClick={() => handleSelect()}> 
                <span className="material-symbols-outlined">bookmarks</span> 
            </button>
        </div>
    );
}

export default Navbar;