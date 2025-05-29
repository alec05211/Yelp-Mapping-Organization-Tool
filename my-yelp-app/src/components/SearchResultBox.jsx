import React from 'react'

function SearchResultBox({ results, onSelect }) {
  return (
    <div>
      {results.map((business) => (
        <button
          key={business.id}
          style={{ display: 'block', margin: '8px 0', width: '100%' }}
          onClick={() => onSelect(business)}
        >
          {business.name} — {business.location.address1}
        </button>
      ))}
    </div>
  )
}

export default SearchResultBox