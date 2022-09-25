import React, { useState, useEffect } from 'react';
import './App.scss';
import {WeatherCard} from './Components/WeatherCard/WeatherCard';
import { FaSearchLocation } from "react-icons/fa";



import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

const options = [
  { name: "miami" },
  { name: "hollywood" }
]


function App() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState([]);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0]) 
    setAddress(value)
    setCoordinates([latLng.lat, latLng.lng])
  }


  return (
    <div className="App">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}>

        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>  (
          <div className='searchbox'>
            <FaSearchLocation className='searchbox__icon'/>
            <input className='searchbox__input' {...getInputProps({placeholder: "Search for location"})} />

            <div className='searchbox__options'>
            {loading ? <div>... loading</div> : null}

            {suggestions.map(s => {
              const style = {
                backgroundColor: s.active? "#6c757d":  "rgba(92, 92, 92, 0.506)"
              }
              return <div className='searchbox__option' key={s.placeId} {...getSuggestionItemProps(s, {style})}>
                 {s.description}
               </div>
            })}
            </div>
          </div>
        ) }
      </PlacesAutocomplete>
      
      <WeatherCard coordinates={coordinates}/>
        
    </div>
  );
}

export default App;

