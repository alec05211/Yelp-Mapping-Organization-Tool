import React from 'react'; 
import './Navbar.css';

function Navbar() {
    
    const handleSelect = () => {
        console.log("Personal Collection button clicked.");
        onListButtonClick();
    }
    
    return (
        <div class="navbar">
            <button class="location-button"> <span class="material-symbols-outlined">near_me</span> Location</button>
            
            <button class="my-list-button" onClick={() => handleSelect()}> 
                <span class="material-symbols-outlined">bookmarks</span> 
            </button>
        </div>
    );
}

export default Navbar;