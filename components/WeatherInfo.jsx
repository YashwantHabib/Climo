import React from 'react';
import {Animated, Image, Text, View} from 'react-native';
import styles from '../styles/weatherStyles';

const WeatherInfo = ({weather, fadeAnim}) => (
  <Animated.View style={[styles.weatherInfo, {opacity: fadeAnim}]}>
    <Image source={{uri: weather.icon}} style={styles.weatherIcon} />
    <Text style={[styles.text, styles.temperature]}>{weather.temp}</Text>
    <Text style={styles.text}>{weather.condition}</Text>
  </Animated.View>
);

export default WeatherInfo;
