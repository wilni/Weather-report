
# Weather-report
<img width="1430" alt="Screen Shot 2022-09-25 at 2 26 12 PM" src="https://user-images.githubusercontent.com/81815266/192160480-fa4e69a1-d684-478f-b2a9-7a2d644ea79a.png">

<img width="1433" alt="Screen Shot 2022-09-29 at 7 53 32 PM" src="https://user-images.githubusercontent.com/81815266/193161767-03552263-5895-49b8-b386-ee32e77a2995.png">


This app allows for location search and autocomplete using google's APIs. 
When a location is entered a weather card for that location will be added to the page. 
As many locations as needed may be added. 

This app consumes data form OpenWeatherMap.org's API:
https://openweathermap.org/api

This app also uses Google maps APIs:
https://mapsplatform.google.com/


## Install and Run

This app is built with React to install 

- clone the repository
- npm i 

You will need to provide Google maps API key and enable the following APIs:
- Maps Javascript API
- Places API
- Geocoding API

Place the API key in the last script of the index.html file found in the public folder

<img width="873" alt="Screen Shot 2022-09-25 at 2 58 08 PM" src="https://user-images.githubusercontent.com/81815266/192160559-8bd0b267-567e-4607-b768-8831861fbfcf.png">

You will need the OpenWeatherMap.org API key and place it in a .env file under key REACT_APP_WEATHER_API_KEY or change the key name in the App.js file of the src folder.

To run the application run the following and open http://localhost:3000 to view it in your browser.
- npm start







## dependencies

    "axios": "^0.27.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.4.0",
    "react-places-autocomplete": "^7.3.0",
    "react-scripts": "5.0.1",
    "sass": "^1.55.0"


## Tech Stack

- React
- Sass
- Js
- Axios

## License

MIT License

Copyright (c) 2022 Wilniyobri Tavarez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
