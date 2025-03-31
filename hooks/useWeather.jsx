import {useState, useEffect, useRef} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {fetchWeatherData} from '../components/Api';
import {Animated} from 'react-native';
import {
  startCloudAnimation,
  startSunAnimation,
  fadeInOutAnimation,
} from '../utils/weatherAnimations';

const useWeather = () => {
  const [currentData, setCurrentData] = useState(null);
  const [weather, setWeather] = useState({
    icon: 'Sun',
    temp: 28,
    condition: 'Clear',
  });
  const [location, setLocation] = useState('Fetching location...');

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
        sunrise: new Date(currentData.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(currentData.sys.sunset * 1000).toLocaleTimeString(),
        wind: {
          speed: currentData.wind.speed,
          deg: currentData.wind.deg,
        },
        condition: currentData.weather[0].description,
      });
    }
  }, [currentData]);

  // **Restart Cloud Animation when Weather Updates**
  useEffect(() => {
    if (weather.condition.toLowerCase().includes('cloud')) {
      cloudAnim.setValue(0); // Reset animation
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
    const hasPermission = await requestLocationPermission();
    let lat = 34.6937;
    let lon = 135.5023;

    if (hasPermission) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          lat = position.coords.latitude;
          lon = position.coords.longitude;
          const weatherData = await fetchWeatherData(lat, lon);
          if (weatherData) {
            setLocation(weatherData.name);
            setCurrentData(weatherData);
            console.log(currentData);
          }
        },
        async () => {
          const weatherData = await fetchWeatherData(lat, lon);
          if (weatherData) {
            setLocation(weatherData.name);
            setCurrentData(weatherData);
            console.log(currentData);
          }
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      console.log('Using default coordinates.');
      const weatherData = await fetchWeatherData(lat, lon);
      if (weatherData) {
        setLocation(weatherData.name);
        setCurrentData(weatherData);
        console.log(currentData);
      }
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    weather,
    location,
    fadeAnim,
    cloudAnim,
    cloudAnim2,
    sunParticles,
    getCurrentLocation,
    updateWeather,
  };
};

export default useWeather;
