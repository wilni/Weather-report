import './WeatherCard.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { WiRain } from "react-icons/wi";
import { WiCloudy } from "react-icons/wi";
import { WiNightAltCloudy } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { WiThunderstorm } from "react-icons/wi";
import { WiDayFog } from "react-icons/wi";
import { WiNightFog } from "react-icons/wi";
import { WiNightClear } from "react-icons/wi";
import { WiNightAltThunderstorm } from "react-icons/wi";
import { WiNightAltRain } from "react-icons/wi";


const API_BASE = "https://api.openweathermap.org/data/2.5/weather?"
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

export function WeatherCard({ coordinates, handleDelete }) {
    const [locationInfo, setLocationInfo] = useState([])
    const [overcast, setOvercast] = useState("");
    const [isDayTime, setIsDayTime] = useState(true);


    const convertTemp = (kelvin) => {
        let fahreinheit = Math.floor(1.8 * (kelvin - 273) + 32)
        return fahreinheit;
    }

    const renderIcon = (cast) => {
        if (cast === "Clouds") {
            return isDayTime? <WiCloudy className='card__icon' /> : <WiNightAltCloudy className='card__icon' /> 
        } else if (cast === "Clear") {
           return isDayTime ? <WiDaySunny className='card__icon' /> : <WiNightClear className='card__icon' />
        } else if (cast === "Thunderstorm") {
            return isDayTime? <WiThunderstorm className='card__icon' /> : <WiNightAltThunderstorm className='card__icon' />
        } else if (cast === "Rain") {
            return isDayTime? <WiRain className='card__icon' /> : <WiNightAltRain className='card__icon' /> 
        } else if (cast === "Haze") {
            return isDayTime? <WiDayFog className='card__icon' /> : <WiNightFog className='card__icon' />
        }
    }

    const convertTime = (timestamp, timezone) => {
        let date = new Date(timestamp * 1000 ).toLocaleTimeString();
        return date;
    }

    useEffect(() => {
        if (coordinates.lat !== undefined && coordinates.lng !== undefined) {
            axios.get(`${API_BASE}lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${WEATHER_API_KEY}`)
                .then(res => {
                    console.log(res.data)
                    setLocationInfo([res.data])
                    setOvercast(prev => prev !== res.data.weather[0].main ? res.data.weather[0].main : prev)
                    switch (res.data.weather[0].icon[2]) {
                        case "n":
                            setIsDayTime(false)
                            break;
                        case "d":
                            setIsDayTime(true)
                            break;
                    }
                })
        }
    }, [coordinates])

    if (locationInfo[0] !== undefined) {
        return (
            <div tabIndex={0} className={`card card--${overcast} ${!isDayTime ? "card--night" : ""}`} >
                <button className='card__delete' onClick={() => {
                    handleDelete(coordinates)
                }}>&times;</button>
                <div className='card__outlook'>
                    {renderIcon(overcast)}
                    <span className='card__temp'>{convertTemp(locationInfo[0].main.temp)}°</span>
                </div>

                <div className='card__sun'>
                    <p className='card__sun-text'>
                        {<WiSunrise className='card__icon--small' />}
                        {convertTime(locationInfo[0].sys.sunrise, locationInfo[0].timezone)}
                        {" EST"}
                    </p>
                    <p className='card__sun-text'>
                        {<WiSunset className='card__icon--small' />}
                        {convertTime(locationInfo[0].sys.sunset, locationInfo[0].timezone)}
                        {" EST"}
                    </p>
                </div>
                <p className='card__location'>{`${locationInfo[0].name}, ${locationInfo[0].sys.country}`}</p>
                <p className='card__description'>{locationInfo[0].weather[0].description}</p>
            </div>
        )
    }

}