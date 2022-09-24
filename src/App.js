import React, { useState, useEffect } from 'react';
import './App.scss';
import {WeatherCard, coordinates} from './Components/WeatherCard/WeatherCard';


import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const options = [
  { name: "miami" },
  { name: "hollywood" }
]


function App() {
  const [searchResults, setSearchResults] = useState([])
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<coordinates>([0,0]);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0]) 
    setAddress(value)
    setCoordinates([latLng.lat, latLng.lng])
  }


  // useEffect(() => {

  // }, [searchResults])

  return (
    <div className="App">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}>

        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>  (
          <div className='searchbox'>
            <input className='searchbox__input' {...getInputProps({placeholder: "Search for location"})} />

            <div className='searchbox__options'>
            {loading ? <div>... loading</div> : null}

            {suggestions.map(s => {
              const style = {
                backgroundColor: s.active? "#ADD8E6": "#f8f8f8"
              }
              return <div{...getSuggestionItemProps(s, {style})}>
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

