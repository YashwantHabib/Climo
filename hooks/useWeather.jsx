import {useState, useEffect, useRef} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {fetchWeatherData, fetchWeatherForecast} from '../components/Api';
import {Animated} from 'react-native';
import {
  startCloudAnimation,
  startSunAnimation,
  fadeInOutAnimation,
} from '../utils/weatherAnimations';
import Geolocation from '@react-native-community/geolocation'; // Import Geolocation

const useWeather = () => {
  const [currentData, setCurrentData] = useState(null);
  const [weather, setWeather] = useState({
    icon: 'Sun',
    temp: 28,
    condition: 'Clear',
  });
  const [location, setLocation] = useState('Fetching location...');
  const [forecast, setForecast] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); //add error state

  // Animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const cloudAnim = useRef(new Animated.Value(0)).current;
  const cloudAnim2 = useRef(new Animated.Value(0)).current;
  const sunParticles = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (currentData) {
      setWeather({
        icon: currentData.weather[0].icon,
        temp: Math.round(currentData.main.temp),
        temp_min: Math.round(currentData.main.temp_min),
        temp_max: Math.round(currentData.main.temp_max),
        feels_like: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        visibility: currentData.visibility / 1000, // Convert to km
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        wind: {
          speed: currentData.wind.speed,
          deg: currentData.wind.deg,
        },
        condition: currentData.weather[0].description,
        timezone: currentData.timezone,
      });
    }
  }, [currentData]);

  useEffect(() => {
    if (weather.condition.toLowerCase().includes('cloud')) {
      cloudAnim.setValue(0);
      cloudAnim2.setValue(0);
      startCloudAnimation(weather.condition, cloudAnim);
      startCloudAnimation(weather.condition, cloudAnim2, 10000);
    }
  }, [weather.condition]);

  useEffect(() => {
    startSunAnimation(weather.condition, sunParticles);
  }, [weather.condition]);

  const updateWeather = newWeather =>
    fadeInOutAnimation(fadeAnim, () => setWeather(newWeather));

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getCurrentLocation = async () => {
    setIsLoading(true);
    setError(null);
    console.log('Requesting permission');
    const hasPermission = await requestLocationPermission();
    let lat = 34.6937;
    let lon = 135.5023;
    console.log('Permission granted:', hasPermission);

    if (hasPermission) {
      Geolocation.getCurrentPosition(
        async position => {
          console.log('Position fetched successfully:', position);
          lat = position.coords.latitude;
          lon = position.coords.longitude;
          console.log(`Latitude: ${lat}, Longitude: ${lon}`);

          try {
            const weatherData = await fetchWeatherData(lat, lon);
            if (weatherData) {
              setLocation(weatherData.name);
              setCurrentData(weatherData);
              console.log('Weather Data:', weatherData);
            }

            const ForecastData = await fetchWeatherForecast(lat, lon);
            if (ForecastData) {
              setForecast(ForecastData);
              console.log('Forecast Data:', ForecastData);
            }
          } catch (apiError) {
            console.error('API Error:', apiError);
            setError('Failed to fetch weather data.');
          } finally {
            setIsLoading(false);
          }
        },
        error => {
          console.error('Error getting location:', error);
          console.log('Geolocation error object:', error);
          setError('Failed to get location.');
          setIsLoading(false);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } else {
      console.log('Using default coordinates.');
      try {
        const weatherData = await fetchWeatherData(lat, lon);
        if (weatherData) {
          setLocation(weatherData.name);
          setCurrentData(weatherData);
          console.log('Weather Data (default location):', weatherData);
        }

        const ForecastData = await fetchWeatherForecast(lat, lon);
        if (ForecastData) {
          setForecast(ForecastData);
          console.log('Forecast Data (default location):', ForecastData);
        }
      } catch (apiError) {
        console.error('API Error:', apiError);
        setError('Failed to fetch weather data.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    weather,
    forecast,
    location,
    fadeAnim,
    cloudAnim,
    cloudAnim2,
    sunParticles,
    getCurrentLocation,
    updateWeather,
    isLoading,
    error,
  };
};

export default useWeather;
