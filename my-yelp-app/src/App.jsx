import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResultBox from './components/SearchResultBox/SearchResultBox';
import FoodRecSection from './components/FoodRecSection/FoodRecSection';
import Navbar from './components/Navbar/Navbar';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ExpandedBusinessView from './components/ExpandedBusinessView/ExpandedBusinessView';


const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: -87.6298,
    latitude: 41.8781,
    zoom: 11
  });
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businessExpanded, setBusinessExpanded] = useState(false);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/api/search?term=${encodeURIComponent(query)}&location=Chicago`);
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

  const handleBusinessSelect = (business) => {
    setSelectedBusiness(business);
    setViewState({
      longitude: business.coordinates.longitude,
      latitude: business.coordinates.latitude,
      zoom: 14
    });
  };

  const handleCategoryClick = (category) => {
    handleSearch(category);
  };

  const handleExpandedBusinessView = (business) => {
    setBusinessExpanded(true);
  };
  
  const onListButtonClick = () => {

  };

  return (
    <div className="app-layout">
      <div className="navbar-section">
        <Navbar/>
      </div>
      
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} className="search-bar"/>
      </div>

      <div className="food-rec-section">
        <FoodRecSection onCategoryClick={handleCategoryClick} />
      </div>
      
      {hasSearched && (
        <div className="content-container">
          <div className={`results-container ${businessExpanded ? 'shifted' : ''}`}>
            <SearchResultBox 
              results={results} 
              onSelect={handleBusinessSelect} 
              onExpand={handleExpandedBusinessView}
            />
          </div>
          
          {businessExpanded && (
            <div className="selected-business-expandedContainer">
              <ExpandedBusinessView business={selectedBusiness} onClose={() => setBusinessExpanded(false)}/>
            </div>
          )}

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
