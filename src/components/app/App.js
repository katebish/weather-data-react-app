import { isEmpty } from 'lodash';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { getCurrentWeatherDataForLocation, getGeocodeForCity } from '../../services/weatherService';

import CityCard from '../city/CityCard';


const App = () => {
  const [searchContent, setSearchContent] = useState('');
  const [weatherForCities, setWeatherForCities] = useState({});
  const [failedToFetch, setFailedToFetch] = useState(false);
  const [failedToReload, setFailedToReload] = useState({});

  const handleCityChange = (event) => {
    setSearchContent(event.target.value);
  };

  const fetchWeatherData = async (lat, lon) => await getCurrentWeatherDataForLocation(lat, lon);

  const handleSearchCity = async () => {
    setFailedToFetch(false);

    try {
      const { lat, lon, name } = await getGeocodeForCity(searchContent);
      const { description, temp, feelsLike } = await fetchWeatherData(lat, lon);
      setWeatherForCities({
        ...weatherForCities,
        [name]: {
          lat,
          lon,
          description,
          temp,
          feelsLike
        }
      });
      setSearchContent('');
    } catch (error) {
      setFailedToFetch(true);
    }
  };

  const handleReloadWeatherData = async (name, lat, lon) => {
    setFailedToReload({
      ...failedToReload,
      [name]: false
    });

    try {
      const { description, temp, feelsLike } = await fetchWeatherData(lat, lon);
      setWeatherForCities({
        ...weatherForCities,
        [name]: {
          ...weatherForCities[name],
          description,
          temp,
          feelsLike
        }
      });
    } catch (error) {
      setFailedToReload({
        ...failedToReload,
        [name]: true
      });
    }
  };

  const handleDeleteCity = (cityName) => {
    const updatedWeatherForCities = { ...weatherForCities };
    delete updatedWeatherForCities[cityName];
    setWeatherForCities(updatedWeatherForCities);
  };

  const noCities = isEmpty(weatherForCities);
  
  return (
    <div>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h2">World Weather</Typography>
        </Grid>
        <Grid item>
          <TextField
            error={failedToFetch}
            helperText={failedToFetch && "Failed to find weather data for city"}
            label="Outlined"
            name="city"
            onChange={handleCityChange}
            onKeyDown={({ key }) => {
              if(key === "Enter") handleSearchCity();
            }}
            value={searchContent}
            variant="outlined"
          />
        </Grid>
        {noCities && (
          <Grid item>
            <Typography>No cities added</Typography>
          </Grid>
        )}
        {!noCities && (
          <Grid item container direction="row" justifyContent="center" spacing={2}>
            {Object.entries(weatherForCities).map(([cityName, data]) =>
              <Grid item key={cityName}>
                <CityCard
                  name={cityName}
                  reloadWeatherData={() => handleReloadWeatherData(cityName, data.lat, data.lon)}
                  deleteCity={() => handleDeleteCity(cityName)}
                  reloadError={failedToReload[cityName]}
                  {...data}
                />
                </Grid>
            )}
          </Grid>
        )}
      </Grid>
      
    </div>
  );
};

export default App;
