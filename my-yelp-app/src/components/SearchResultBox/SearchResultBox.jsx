import React, { useState } from 'react'
import BusinessItem from '../BusinessItem/BusinessItem'
import './SearchResultBox.css';


function SearchResultBox({ results, onSelect, onExpand}) {
  const [expandedId, setExpandedId] = useState(null);

  const handleClick = (business) => {
    setExpandedId(expandedId === business.id ? null : business.id);
    onSelect(business);
  };

  return (
    <div className="search-results">
      {results?.map((business) => (
        <div key={business.id} className={`result-item ${expandedId === business.id ? 'expanded' : ''}`}>
          <div 
            className="result-item-content"
            onClick={() => handleClick(business)}
            role="button"
            tabIndex={0}
            style={{ display: 'block', width: '100%', cursor: 'pointer' }}
          >
            {expandedId !== business.id ? (
              <div className="collapsed-view">
                <p>{business.name} ({business.location.address1}, {business.location.city})</p> 
                <p>{business.price}</p>
                <p>{business.rating} ★</p>
              </div>
            ) : (
              <BusinessItem business={business} handleExpandedBusinessView={onExpand}/>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchResultBox