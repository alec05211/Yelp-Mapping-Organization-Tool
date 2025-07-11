import React from 'react';
import './ExpandedBusinessView.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ExpandedBusinessView({ business, onClose }) {
  const handleAddBusiness = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessId: business.id,
          name: business.name,
          rating: business.rating,
          image_url: business.image_url,
          url: business.url,
          location: business.location,
          // any other fields intended to be saved
        })
      });

      if (!response.ok) {throw new Error('Failed to add business to favorites');}   // if response is not ok, throw an error                                          
    } catch (error) {
      console.error('ERROR ADDING BUSINESS! -> ', error);
      alert('Failed to add business');
    }
  };

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
      <h1>{name}</h1>
      <div>
        <section className="restaurant-interactables">
          <button onClick={handleAddBusiness} className="add-button">
            <span className="material-symbols-outlined">add</span>
          </button>
          <button className='yelp-link-button'>
            <a href={url} target="_blank" rel="noopener noreferrer">View on Yelp</a>
          </button>
          <button className='website-button'>
            <p>website</p>
          </button>
          <button>
            <a href={`tel:${phone}`}>Call</a>
          </button>
        </section>

        <div>
          <p>Rating: {rating} ({review_count} reviews)</p>
          <p>Price: {price}</p>
          <p>Categories: {categories.map(cat => cat.title).join(', ')}</p>
          <p>Address: {location.address1}</p>
          <p>Phone: {phone}</p>
        </div>
      </div>
      
      
      
      
      
    </div>
  );
}

export default ExpandedBusinessView;