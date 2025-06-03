import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResultBox from './components/SearchResultBox';
import FoodRecSection from './components/FoodRecSection/FoodRecSection';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxlYzA1MjExIiwiYSI6ImNtYjhuZzFjcjBvbzQyam9laHN1cmVsdTUifQ.d-ocdRu3CrMv0-LphfQMdQ'

function App() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: -87.6298,
    latitude: 41.8781,
    zoom: 11
  });

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search?term=${encodeURIComponent(query)}&location=Chicago`
      );
      const data = await response.json();
      setResults(data.businesses || []);
      setHasSearched(true);
      if (data.businesses && data.businesses.length > 0) {
        setViewState({
          longitude: data.businesses[0].coordinates.longitude,
          latitude: data.businesses[0].coordinates.latitude,
          zoom: 12
        });
      }
    } catch (error) {
      console.error('Error fetching Yelp data:', error);
      setResults([]);
    }
  };

  const handleSelect = (business) => {
    setViewState({
      longitude: business.coordinates.longitude,
      latitude: business.coordinates.latitude,
      zoom: 14
    })
  }

  const handleCategoryClick = (category) => {
    handleSearch(category);
  };

  return (
    <div className="app-layout">
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} class="search-bar"/>
      </div>

      <FoodRecSection onCategoryClick={handleCategoryClick} />
      
      {hasSearched && (
        <div className="content-container">
          <div className="results-container">
            <SearchResultBox results={results} onSelect={handleSelect} />
          </div>
          
          <div className="map-container">
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              mapboxAccessToken={MAPBOX_TOKEN}
              style={{ width: '100%', height: '100%' }}
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
            </Map>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
