import './WeatherCard.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { WiRain } from "react-icons/wi";
import { WiCloudy } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";


const API_BASE = "https://api.openweathermap.org/data/2.5/weather?"
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
export function WeatherCard({ coordinates }) {
    const [locationInfo, setLocationInfo] = useState([])
    const [overcast, setOvercast] = useState("");


    const convertTemp = (kelvin) => {
        let fahreinheit = Math.floor(1.8 * (kelvin - 273) + 32)
        return fahreinheit;
    }

    useEffect(() => {
        if (coordinates[0] !== undefined && coordinates[1] !== undefined) {
            axios.get(`${API_BASE}lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${WEATHER_API_KEY}`)
                .then(res => {
                    console.log(res.data)
                    setLocationInfo([res.data])
                    setOvercast(prev => prev !== res.data.weather[0].main ? res.data.weather[0].main : prev)
                }).then(r => console.log(locationInfo))
        }
    }, [coordinates])

    if (locationInfo[0] !== undefined) {
        return (
            <div>
                <div className={`card card--${overcast}`} >
                    <div className='card__outlook'>
                        {overcast === "Clouds" ? <WiCloudy className='card__icon' /> : <WiDaySunny className='card__icon' />}
                        <span className='card__temp'>{convertTemp(locationInfo[0].main.temp)}°</span>
                    </div>
                    <div className='card__details'>
                        
                    </div>
                    <p className='card__location'>{`${locationInfo[0].name}, ${locationInfo[0].sys.country}`}</p>
                </div>
            </div>
        )
    }

}