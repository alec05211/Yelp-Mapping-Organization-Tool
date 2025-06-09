import React from 'react';
import './businessItem.css';

function BusinessItem({ business, handleExpandedBusinessView }) {


  const expandBusinessView = (business) => {
    console.log(`Expanding view for: ${business.name}`);
    handleExpandedBusinessView(business);
  }

  const { 
    name, 
    rating, 
    review_count, 
    location, 
    categories,
    price,
    image_url 
  } = business

  return (
    <div className="business-item">
      <img src={image_url} alt={name} className="image" />
      <div className="business-info">
        <p>{name}</p>
        <p>Rating: {rating} ({review_count} reviews)</p>
        <p>{location.address1}</p>
        <p>{categories.map(cat => cat.title).join(', ')}</p>
        <p>{price}</p>

        <button className="expand-card-button" onClick={() => expandBusinessView(business)}> 
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  )
}

export default BusinessItem;


// {
//   "businesses": [{
//     "id": "unique-business-id",
//     "name": "Business Name",
//     "rating": 4.5,
//     "price": "$$$",
//     "phone": "+14159083801",
//     "review_count": 1738,
//     "categories": [
//       { "alias": "thai", "title": "Thai" }
//     ],
//     "coordinates": {
//       "latitude": 37.7829,
//       "longitude": -122.4190
//     },
//     "location": {
//       "address1": "123 Main St",
//       "city": "Chicago",
//       "state": "IL",
//       "zip_code": "60601"
//     },
//     "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/...",
//     "url": "https://www.yelp.com/biz/business-url",
//     "distance": 1234.5,
//     "is_closed": false,
//     "transactions": ["pickup", "delivery"]
//   }]
// }