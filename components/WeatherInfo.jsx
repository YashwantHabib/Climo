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
  Sun: require('../assets/weatherIcons/Sun.png'),
  Moon: require('../assets/weatherIcons/Moon.png'),
  Cloud: require('../assets/weatherIcons/Cloud.png'),
  Drizzle: require('../assets/weatherIcons/Drizzle.png'),
  Rain: require('../assets/weatherIcons/CloudDark.png'),
  Thunder: require('../assets/weatherIcons/Thunder.png'),
  SnowFlake: require('../assets/weatherIcons/SnowFlake.png'),
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
              <View style={styles.lineLeft}></View>
              <View style={styles.line}></View>
              <Text style={styles.text}>TEMP: {weather.temp}°</Text>
              <Text style={styles.text}>FEELS: {weather.feelsLike}°</Text>
              <Text style={styles.text}>HUMID: {weather.humidity}%</Text>
              <Text style={styles.text}>MAX: {weather.maxTemp}°</Text>
              <Text style={styles.text}>MIN: {weather.minTemp}°</Text>
            </View>

            {/* Right Info Block */}
            <View style={styles.infoBlockRight}>
              <View style={styles.line}></View>
              <Text style={styles.text}>SUNRISE: {weather.sunrise}</Text>
              <Text style={styles.text}>SUNSET: {weather.sunset}</Text>
              <Text style={styles.text}>
                VISIBILITY: {weather.visibility}km
              </Text>
            </View>

            {/* Bottom Info Block */}
            <View style={styles.infoBlockBottom}>
              <View style={styles.line}></View>
              <Text style={styles.text}>WIND</Text>
              <Text style={styles.text}>DEG: {weather.windDeg}°</Text>
              <Text style={styles.text}>GUST: {weather.windGust} m/s</Text>
              <Text style={styles.text}>SPEED: {weather.windSpeed} m/s</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </Animated.View>
  );
};

export default WeatherInfo;
