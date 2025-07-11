import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResultBox from './components/SearchResultBox/SearchResultBox';
import FoodRecSection from './components/FoodRecSection/FoodRecSection';
import Navbar from './components/Navbar/Navbar';
import Map, { Marker, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ExpandedBusinessView from './components/ExpandedBusinessView/ExpandedBusinessView';
import UserBusinessCollection from './components/UserBusinessCollection/UserBusinessCollection';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businessExpanded, setBusinessExpanded] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: -87.6298, 
    latitude: 41.8781,
    zoom: 11
  });
  const [userLocation, setUserLocation] = useState(null);
  const [showCollection, setShowCollection] = useState(false);
  const [expandedBusiness, setExpandedBusiness] = useState(null);

  // will reload mapbox with changes in the content-container flexbox 
  const mapRef = useRef(); 
  useEffect(() => {
    if (mapRef.current) {
      if (mapRef.current.resize) {
        mapRef.current.resize();
      }
      
    }
  }, [showCollection]);

  useEffect(() => { // useEffect to get user location when component mounts
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const newLocation = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          };
          setUserLocation(newLocation);
          setViewState(prev => ({
            ...prev,
            ...newLocation,
            zoom: 12
          }));
        },
        error => {
          console.warn("Error getting location:", error.message);
          // Keep default Chicago coordinates if geolocation fails
        }
      );
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleSearch = async (query) => {
    try {
      // Use user's location if available, otherwise default to Chicago
      const location = userLocation 
        ? `${userLocation.latitude},${userLocation.longitude}`
        : 'Chicago';

      const response = await fetch(
        `http://localhost:5000/api/search?term=${encodeURIComponent(query)}&location=${location}`
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
    setExpandedBusiness(business);
  };
  
  const handleToggleCollection = () => setShowCollection(prev => !prev);

  return (
    <div className="app-layout">
      <div className="navbar-section">
        <Navbar onListButtonClick={handleToggleCollection} />
      </div>
      
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} className="search-bar"/>
      </div>

      <div className="food-rec-section">
        <FoodRecSection onCategoryClick={handleCategoryClick} />
      </div>
      
      <div className="content-container">
        {hasSearched && !showCollection && (
          <div className={`results-container`}>
            {!expandedBusiness && (
              <SearchResultBox
                results={results}
                onSelect={handleBusinessSelect}
                onExpand={handleExpandedBusinessView}
              />
            )}

            {expandedBusiness && (
              <ExpandedBusinessView
                business={selectedBusiness}
                onClose={() => setExpandedBusiness(null)}
              />
            )}
          </div>
        )}

        <div className="map-container">
          <Map
            ref={mapRef}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            renderWorldCopies={false}
            reuseMaps
          >
            <GeolocateControl position="top-left" showAccuracyCircle={true} showUserLocation={true} trackUserLocation={true} auto/> 

            {results.map(business => (
              <Marker key={business.id} longitude={business.coordinates.longitude} latitude={business.coordinates.latitude}>
                <div style={{ color: 'red' }}>📍</div>
              </Marker>
            ))}
          </Map>
        </div>
        {showCollection && (
          <div className="user-collection">
            <UserBusinessCollection onClose={handleToggleCollection} />
          </div>
        )}
      </div>
    </div>
      
  );
}

export default App;
