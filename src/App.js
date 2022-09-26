import React, { useState, useEffect } from 'react';
import './App.scss';
import { WeatherCard } from './Components/WeatherCard/WeatherCard';
import { FaSearchLocation } from "react-icons/fa";



import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";


function App() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState([]);

  const checkForLocation = (prev, location) => {
    let inList = false;

    prev.forEach(el => {
      if ((el.lat === location.lat) && (el.lng === location.lng)) {
        inList = true;
      }
    })

    return inList;
  }

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    let location = { lat: latLng.lat, lng: latLng.lng }
    setAddress(value)
    setCoordinates(prev => {
      const locationInList = checkForLocation(prev, location)
      if (locationInList) {
        return handleDelete(location)
      } else {
        localStorage.setItem("coordinates", JSON.stringify([...prev, location]))
        return [...prev, location]
      }
    })
  }

  const handleDelete = (location) => {
    setCoordinates(prev => {
      const newCoordinates = prev.filter(loc => (loc.lat !== location.lat) && (loc.lng !== location.lng))
      localStorage.setItem("coordinates", JSON.stringify(newCoordinates))
      return newCoordinates
    })
  }

  
  useEffect(() => {
    const savedCoordinates = JSON.parse(localStorage.getItem("coordinates"))
    setCoordinates(savedCoordinates)
  }, [])

  return (
    <div className={`App ${coordinates[0] ? "" : "App--empty"}`}>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}>

        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='searchbox'>
            <FaSearchLocation className='searchbox__icon' />
            <input className='searchbox__input' {...getInputProps({ placeholder: "Search locations" })} />

            <div className='searchbox__options'>
              {loading ? <div className='loading'><p className='loading__text'>... loading</p></div> : null}

              {suggestions.map(s => {
                const style = {
                  backgroundColor: s.active ? "#6c757d" : "rgba(92, 92, 92, 0.506)"
                }
                return <div className='searchbox__option' key={s.placeId} {...getSuggestionItemProps(s, { style })}>
                  {s.description}
                </div>
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <div className='card-gallery'>
        {coordinates.map((coor, idx) => {
          return <WeatherCard key={idx} coordinates={coor} handleDelete={handleDelete} />
        })}
      </div>

    </div>
  );
}

export default App;

