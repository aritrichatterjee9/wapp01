import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
  const [city, setCity] = useState('london');
  const [weatherData, setWeatherData] = useState(null);

  const APIKey = '546b8e7bc2e42c8c92a2572386d39b0a'; // change this to your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    document.getElementById('weatherInput').focus();
  },);

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = () => {
    fetchData();
  }

  const handleKeypress = e => {
    if (e.charCode === 13) {
      fetchData();
    }
  };


  const renderWeatherData = () => {
    if (!weatherData) {
      return null;
    }

    const {
      name,
      sys: { country },
      main: { humidity, pressure, temp },
      weather: [{ description, icon }],
    } = weatherData;

    const d = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return (
      <div className="results" style={styles.results}>
        <div style={{ fontSize: 30 }}>
          {name}, {country}
        </div>

        <div style={{ color: 'darkgrey', fontSize: 18 }}>
          {days[d.getDay()]}, {month[d.getMonth()]} {d.getDate()}, {d.getFullYear()}
        </div>

        <div style={{ fontSize: 54, fontWeight: 'bold' }}>{Math.round(temp)}° C</div>

        <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather icon" />

        <div style={{ textTransform: 'capitalize', marginBottom: 20 }}>{description}</div>

        <div>Humidity : {humidity}%</div>
        <div>Pressure : {pressure} hPa</div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="weather">
          <input
            id="weatherInput"
            type="text"
            name="city"
            placeholder="City name"
            onChange={handleChange}
            onKeyPress={handleKeypress}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>

        {renderWeatherData()}
      </header>
    </div>
  );
}

const styles = {
  results: {
    border: '1px solid #111111',
    borderRadius: 15,
    backgroundColor: '#111',
    padding: '2rem',
    margin: '1rem',
    boxShadow: 'rgb(84 179 207 / 50%) 3px 3px 2px 0px',
  },
};

export default App;
