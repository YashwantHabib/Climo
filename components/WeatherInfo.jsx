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
              <Text style={styles.textInfo}>TEMP: 25°</Text>
              <Text style={styles.textInfo}>FEELS: 25°</Text>
              <Text style={styles.textInfo}>HUMID: 80%</Text>
              <Text style={styles.textInfo}>MAX: 28°</Text>
              <Text style={styles.textInfo}>MIN: 22°</Text>
            </View>

            {/* Right Info Block */}
            <View style={styles.infoBlockRight}>
              <Text style={[styles.textInfo, styles.textInfoR]}>
                VISIBILITY: 10km
              </Text>
              <Text style={[styles.textInfo, styles.textInfoR]}>
                SUNRISE: 7:00
              </Text>
              <Text style={[styles.textInfo, styles.textInfoR]}>
                SUNSET: 6:00
              </Text>
            </View>

            {/* Bottom Info Block */}
            <View style={styles.infoBlockBottom}>
              <Text style={[styles.textInfo, styles.textInfoR]}>WIND</Text>
              <Text style={[styles.textInfo, styles.textInfoR]}>DEG: 45°</Text>
              <Text style={[styles.textInfo, styles.textInfoR]}>
                GUST: 10 m/s
              </Text>
              <Text style={[styles.textInfo, styles.textInfoR]}>
                SPEED: 15 m/s
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </Animated.View>
  );
};

export default WeatherInfo;
