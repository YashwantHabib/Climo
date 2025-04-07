import React, {useState} from 'react';
import {View, Text, SafeAreaView, StatusBar, Pressable} from 'react-native';
import {Bolt, RefreshCwIcon} from 'lucide-react-native';
import WeatherSlider from '../components/WeatherSlider';
import ForecastBar from '../components/ForecastBar';
import WeatherInfo from '../components/WeatherInfo';
import SunEffect from '../components/SunEffect';
import CloudEffect from '../components/CloudEffect';
import RainEffect from '../components/RainEffect';
import SnowEffect from '../components/SnowEffect';
import MistEffect from '../components/MistEffect';
import TornadoEffect from '../components/TornadoEffect';
import useWeather from '../hooks/useWeather';
import LocationModal from '../hooks/LocationModal';
import styles from '../styles/weatherStyles';

const WeatherScreen = ({navigation}) => {
  const {
    weather,
    forecast,
    location,
    fadeAnim,
    cloudAnim,
    cloudAnim2,
    getCurrentLocation,
    updateWeather,
    setCity, // 👈 Destructure it
  } = useWeather();

  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      {/* Top Bar */}
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

      {/* Weather Info */}
      <View style={styles.content}>
        <WeatherInfo weather={weather} fadeAnim={fadeAnim} />

        {/* Weather Effects */}
        {weather.condition.toLowerCase().includes('cloud') && (
          <>
            <CloudEffect cloudAnim={cloudAnim} />
            <CloudEffect
              cloudAnim={cloudAnim2}
              cloudImageStyle={styles.cloudImage2}
            />
          </>
        )}
        {weather.condition.toLowerCase().includes('mist') && <MistEffect />}
        {weather.condition.toLowerCase().includes('rain') && <RainEffect />}
        {weather.condition.toLowerCase().includes('snow') && <SnowEffect />}
        {weather.condition.toLowerCase().includes('clear') && <SunEffect />}

        {/* Refresh Button */}
        <Pressable style={styles.refresh} onPress={getCurrentLocation}>
          <RefreshCwIcon color="white" size={24} />
        </Pressable>

        <WeatherSlider forecast={forecast} updateWeather={updateWeather} />
        <ForecastBar forecast={forecast} updateWeather={updateWeather} />
      </View>

      {/* Location Modal */}
      <LocationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        searchText={searchText}
        setSearchText={setSearchText}
        getCurrentLocation={getCurrentLocation}
        setCity={setCity}
      />
    </SafeAreaView>
  );
};

export default WeatherScreen;
