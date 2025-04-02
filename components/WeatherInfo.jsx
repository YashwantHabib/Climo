import React, {useState} from 'react';
import {
  Animated,
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import styles from '../styles/weatherStyles';

import weatherIcons from '../utils/weatherIcons';

const WeatherInfo = ({weather, fadeAnim}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const formatTime = (timestamp, timezoneOffset) => {
    const date = new Date((timestamp + timezoneOffset) * 1000); // Adjust for timezone
    let hours = date.getUTCHours(); // Get UTC hours and adjust
    let minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    minutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if needed
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <Animated.View style={[styles.weatherInfo, {opacity: fadeAnim}]}>
      <Image source={weatherIcons[weather.icon]} style={styles.weatherIcon} />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={[styles.text, styles.temperature]}>{weather.temp}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{weather.condition}</Text>
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.overlayContainer}>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setModalVisible(false)}>
            <View style={styles.infoBlockLeft}>
              <Text style={styles.textInfo}>TEMP: {weather.temp}°</Text>
              <Text style={styles.textInfo}>FEELS: {weather.feels_like}°</Text>
              <Text style={styles.textInfo}>HUMID: {weather.humidity}%</Text>
              <Text style={styles.textInfo}>MAX: {weather.temp_min}°</Text>
              <Text style={styles.textInfo}>MIN: {weather.temp_max}°</Text>
            </View>

            {/* Right Info Block */}
            <View style={styles.infoBlockRight}>
              <Text style={[styles.textInfo, styles.textInfoR]}>
                VISIBILITY: {weather.visibility}km
              </Text>
              <Text style={[styles.textInfo, styles.textInfoR]}>
                SUNRISE: {formatTime(weather.sunrise, weather.timezone)}
              </Text>
              <Text style={[styles.textInfo, styles.textInfoR]}>
                SUNSET: {formatTime(weather.sunset, weather.timezone)}
              </Text>
            </View>

            {/* Bottom Info Block */}
            <View style={styles.infoBlockBottom}>
              <Text style={[styles.textInfo, styles.textInfoR]}>WIND</Text>
              <Text style={[styles.textInfo, styles.textInfoR]}>
                DEG: {weather.wind.deg}°
              </Text>
              <Text style={[styles.textInfo, styles.textInfoR]}>
                SPEED: {weather.wind.speed}m/s
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </Animated.View>
  );
};

export default WeatherInfo;
