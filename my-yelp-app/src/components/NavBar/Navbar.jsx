import React from 'react'; 
import './Navbar.css';

function Navbar() {
    return (
        <div class="navbar">
            <button class="location-button"> <span class="material-symbols-outlined">near_me</span> Location</button>
            <p>Yelp Mapper</p>
        </div>
    );
}

export default Navbar;