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

const weatherIcons = {
  '01d': require('../assets/weatherIcons/Sun.png'),
  '01n': require('../assets/weatherIcons/Moon.png'),
  '02d': require('../assets/weatherIcons/Sun.png'),
  '02n': require('../assets/weatherIcons/Moon.png'),
  '03d': require('../assets/weatherIcons/Cloud.png'),
  '03n': require('../assets/weatherIcons/Cloud.png'),
  '04d': require('../assets/weatherIcons/CloudDark.png'),
  '04n': require('../assets/weatherIcons/CloudDark.png'),
  '09d': require('../assets/weatherIcons/Drizzle.png'),
  '09n': require('../assets/weatherIcons/Drizzle.png'),
  '10d': require('../assets/weatherIcons/CloudDark.png'),
  '10n': require('../assets/weatherIcons/CloudDark.png'),
  '11d': require('../assets/weatherIcons/Thunder.png'),
  '11n': require('../assets/weatherIcons/Thunder.png'),
  '13d': require('../assets/weatherIcons/SnowFlake.png'),
  '13n': require('../assets/weatherIcons/SnowFlake.png'),
};

const WeatherInfo = ({weather, fadeAnim}) => {
  const [modalVisible, setModalVisible] = useState(false);

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
                SUNRISE:{weather.sunrise}
              </Text>
              <Text style={[styles.textInfo, styles.textInfoR]}>
                SUNSET:{weather.sunset}
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
