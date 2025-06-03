import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSubmit} class="search">
            <span className="material-symbols-outlined"> search </span>
            <input
                type="text"
                class="search-input"
                placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button type="submit" class="button">Search</button>
        </form>
    )
}

export default SearchBar