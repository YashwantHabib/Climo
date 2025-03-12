import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Pressable,
  Animated,
} from 'react-native';
import {Bolt, RefreshCwIcon} from 'lucide-react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      <View style={styles.topBar}>
        <Text style={[styles.text, styles.location]}>Bagalkote</Text>
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
    </SafeAreaView>
  );
};

export default WeatherScreen;
