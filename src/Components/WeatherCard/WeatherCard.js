import './WeatherCard.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';


const API_BASE = "https://api.openweathermap.org/data/2.5/weather?"
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
export function WeatherCard({ coordinates }) {
    const [locationInfo, setLocationInfo] = useState({})
    useEffect(() => {
        if(coordinates[0] != undefined && coordinates[1] != undefined){
            axios.get(`${API_BASE}lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${WEATHER_API_KEY}`)
            .then(res => {
                console.log(res.data)
                setLocationInfo(res.data)
            })
        }
    }, [coordinates])
    return (
        <div>
            <p>{coordinates[0] != undefined ? `${coordinates[0]} ${coordinates[1]}` : ""}</p>
            <div className='card'>
                <h2 className='card__location'>{locationInfo.name}</h2>
                <h2></h2>
            </div>
        </div>

    )
}