import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar.jsx'

function App() {
  const [results, setResults] = useState([])

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search?term=${encodeURIComponent(query)}&location=Chicago`
      )
      const data = await response.json()
      setResults(data.businesses || [])
    } catch (error) {
      console.error('Error fetching Yelp data:', error)
      setResults([])
    }
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {results.map((business) => (
          <li key={business.id}>
            <strong>{business.name}</strong> — {business.location.address1}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
