import React, { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar.jsx'
import SearchResultBox from './components/SearchResultBox.jsx'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxlYzA1MjExIiwiYSI6ImNtYjhuZzFjcjBvbzQyam9laHN1cmVsdTUifQ.d-ocdRu3CrMv0-LphfQMdQ' // mapbox public access token on mapbox website

function App() {
  const [results, setResults] = useState([])
  const [viewport, setViewport] = useState({
    longitude: -87.6298,
    latitude: 41.8781,
    zoom: 11,
    width: '100%',
    height: 400,
  })

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search?term=${encodeURIComponent(query)}&location=Chicago`
      )
      const data = await response.json()
      setResults(data.businesses || [])
      if (data.businesses && data.businesses.length > 0) {
        setViewport({
          longitude: data.businesses[0].coordinates.longitude,
          latitude: data.businesses[0].coordinates.latitude,
          zoom: 12,
        })
      }
    } catch (error) {
      console.error('Error fetching Yelp data:', error)
      setResults([])
    }
  }

  const handleSelect = (business) => {
    alert(`Selected: ${business.name}`)
    setViewport({
      longitude: business.coordinates.longitude,
      latitude: business.coordinates.latitude,
      zoom: 14,
    })
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <SearchResultBox results={results} onSelect={handleSelect} />
      <div style={{ height: 400, marginTop: 16 }}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={setViewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {results.map(business => (
            <Marker
              key={business.id}
              longitude={business.coordinates.longitude}
              latitude={business.coordinates.latitude}
            >
              <div style={{ color: 'red' }}>📍</div>
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </>
  )
}

export default App
