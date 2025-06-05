import React from 'react'
import BusinessItem from './BusinessItem/BusinessItem'

function SearchResultBox({ results, onSelect }) {
  return (
    <div className="search-results">
      {/* Map through each business in the results array */}
      {results?.map((business) => (
        <button
          key={business.id}
          className="result-item"
          onClick={() => onSelect(business)}
          style={{ display: 'block', margin: '8px 0', width: '100%' }}
        >
          <BusinessItem business={business} />
        </button>
      ))}
    </div>
  )
}

export default SearchResultBox