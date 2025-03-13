import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Pressable,
  Animated,
  Modal,
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Bolt, RefreshCwIcon, MapPin, X} from 'lucide-react-native';
import WeatherSlider from '../components/WeatherSlider';
import ForecastBar from '../components/ForecastBar';
import WeatherInfo from '../components/WeatherInfo';
import SunEffect from '../components/SunEffect';
import CloudEffect from '../components/CloudEffect';
import {
  startCloudAnimation,
  startSunAnimation,
  fadeInOutAnimation,
} from '../utils/weatherAnimations';
import styles from '../styles/weatherStyles';
import RainEffect from '../components/RainEffect';
import ThunderEffect from '../components/ThunderEffect';
import SnowEffect from '../components/SnowEffect';
import MistEffect from '../components/MistEffect';
import TornadoEffect from '../components/TornadoEffect';

const WeatherScreen = ({navigation}) => {
  const [weather, setWeather] = useState({
    icon: 'Sun',
    temp: 28,
    condition: 'Clear',
  });

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const cloudAnim = useRef(new Animated.Value(0)).current;
  const cloudAnim2 = useRef(new Animated.Value(0)).current;
  const sunParticles = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startCloudAnimation(weather.condition, cloudAnim);
    startCloudAnimation(weather.condition, cloudAnim2, 10000); // Second cloud with a different duration
    startSunAnimation(weather.condition, sunParticles);
  }, [weather.condition]);

  const updateWeather = newWeather =>
    fadeInOutAnimation(fadeAnim, () => setWeather(newWeather));

  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState('Fetching location...'); // Default text
  const [searchText, setSearchText] = useState('');

  // Function to request location permission

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const fineLocation = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location for weather updates.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (fineLocation === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Fine location granted');
          return true;
        }

        // If fine location is denied, try requesting coarse location
        const coarseLocation = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        );

        if (coarseLocation === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Coarse location granted (Approximate)');
          return true;
        }

        console.log('Location permission denied');
        return false;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS handles permissions separately
  };

  // Function to get current location
  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setLocation('Permission denied');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`); // Display as "Lat, Long"
      },
      error => {
        console.error(error);
        setLocation('Location unavailable');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // Fetch location on mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      <View style={styles.topBar}>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={[styles.text, styles.location]}>{location}</Text>
        </Pressable>
        <Pressable
          style={styles.icon}
          onPress={() => navigation.navigate('Settings')}>
          <Bolt color="white" size={24} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <WeatherInfo weather={weather} fadeAnim={fadeAnim} />

        {weather.condition === 'Clouds' && (
          <>
            <CloudEffect cloudAnim={cloudAnim} />
            <CloudEffect
              cloudAnim={cloudAnim2}
              cloudImageStyle={styles.cloudImage2}
            />
          </>
        )}
        {weather.condition === 'Mist' && <MistEffect />}
        {weather.condition === 'Rain' && <RainEffect />}
        {weather.condition === 'Snow' && <SnowEffect />}
        {weather.condition === 'Clear' && <SunEffect />}
        <Pressable
          style={styles.refresh}
          onPress={() => updateWeather(weather)}>
          <RefreshCwIcon color="white" size={24} />
        </Pressable>
        <WeatherSlider />
        <ForecastBar onSelectWeather={updateWeather} />
      </View>
      {/* Location Search Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.closeButton}>
              <Text style={styles.modalTitle}>LOCATION</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <X color="white" size={20} />
              </Pressable>
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="gray"
              value={searchText}
              onChangeText={setSearchText}
            />
            <Pressable
              style={styles.currentLocation}
              onPress={getCurrentLocation}>
              <MapPin color="white" size={20} />
              <Text style={styles.currentLocationText}>CURRENT LOCATION</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default WeatherScreen;
