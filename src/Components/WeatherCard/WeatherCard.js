import './WeatherCard.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { WiRain } from "react-icons/wi";
import { WiCloudy } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { WiThunderstorm } from "react-icons/wi";


const API_BASE = "https://api.openweathermap.org/data/2.5/weather?"
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
export function WeatherCard({ coordinates }) {
    const [locationInfo, setLocationInfo] = useState([])
    const [overcast, setOvercast] = useState("");


    const convertTemp = (kelvin) => {
        let fahreinheit = Math.floor(1.8 * (kelvin - 273) + 32)
        return fahreinheit;
    }

    const renderIcon = (cast) => {
        if(cast === "Clouds"){
            return <WiCloudy className='card__icon' />
        }else if(cast === "Clear"){
            return <WiDaySunny className='card__icon' />
        }else if(cast === "Thunderstorm"){
            return <WiThunderstorm className='card__icon' />
        }else if(cast === "Rain"){
            return <WiRain className='card__icon' />
        }
    }

    const convertTime = (timestamp) => {
        let date = new Date(timestamp * 1000).toLocaleTimeString();
        return date;
    }

    useEffect(() => {
        if (coordinates[0] !== undefined && coordinates[1] !== undefined) {
            axios.get(`${API_BASE}lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${WEATHER_API_KEY}`)
                .then(res => {
                    setLocationInfo([res.data])
                    setOvercast(prev => prev !== res.data.weather[0].main ? res.data.weather[0].main : prev)
                })
        }
    }, [coordinates])

    if (locationInfo[0] !== undefined) {
        return (
                <div tabIndex={0} className={`card card--${overcast}`} >
                    <button className='card__delete' onClick={() => console.log("click to delete card")}>&times;</button>
                    <div className='card__outlook'>
                        {renderIcon(overcast)}
                        <span className='card__temp'>{convertTemp(locationInfo[0].main.temp)}°</span>
                    </div>

                    <div className='card__sun'>
                        <p className='card__sun-text'>
                            {<WiSunrise className='card__icon--small' />}
                            {convertTime(locationInfo[0].sys.sunrise)}
                            {" EST"}
                        </p>
                        <p className='card__sun-text'>
                            {<WiSunset className='card__icon--small' />}
                            {convertTime(locationInfo[0].sys.sunset)}
                            {" EST"}
                        </p>
                    </div>
                    <p className='card__location'>{`${locationInfo[0].name}, ${locationInfo[0].sys.country}`}</p>
                    <p className='card__description'>{locationInfo[0].weather[0].description}</p>
                </div>
        )
    }

}