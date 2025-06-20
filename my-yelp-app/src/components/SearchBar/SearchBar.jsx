import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSubmit} className="search">
            <span className="material-symbols-outlined" style={{color: '#666',padding: '8px'}}> search </span>
            <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button type="submit" className="button">Search</button>
        </form>
    )
}

export default SearchBar