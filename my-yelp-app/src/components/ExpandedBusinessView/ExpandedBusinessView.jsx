import React from 'react';
import './ExpandedBusinessView.css';

function ExpandedBusinessView({ business, onClose }) {
  if (!business) return null;

  const {
    name,
    rating,
    review_count,
    location,
    categories,
    price,
    image_url,
    phone,
    url
  } = business;

  return (
    <div className="expanded-business-view">
      <button className="close-button" onClick={onClose}>
        <span className="material-symbols-outlined">close</span>
      </button>
      
      <div className="business-header">
        <h1>{name}</h1>
      </div>

      <div className="business-details">
        <p>Rating: {rating} ({review_count} reviews)</p>
        <p>Price: {price}</p>
        <p>Categories: {categories.map(cat => cat.title).join(', ')}</p>
        <p>Address: {location.address1}</p>
        <p>Phone: {phone}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">View on Yelp</a>
      </div>
      
      <button><span class="material-symbols-outlined">add</span></button>
    </div>
  );
}

export default ExpandedBusinessView;