import React, { useState } from 'react'
import BusinessItem from '../BusinessItem/BusinessItem'

function SearchResultBox({ results, onSelect, onExpand}) {
  const [expandedId, setExpandedId] = useState(null);

  const handleClick = (business) => {
    setExpandedId(expandedId === business.id ? null : business.id);
    onSelect(business);
  };

  return (
    <div className="search-results">
      {results?.map((business) => (
        <button key={business.id} className={`result-item ${expandedId === business.id ? 'expanded' : ''}`} onClick={() => handleClick(business)} style={{ display: 'block', width: '100%' }}>
          {expandedId !== business.id ? (
            <div className="collapsed-view">
              <span>{business.name}</span> - 
              <span>{business.location.address1}</span>
            </div>
          ) : (
            <BusinessItem business={business} handleExpandedBusinessView={onExpand}/>
          )}
        </button>
      ))}
    </div>
  )
}

export default SearchResultBox