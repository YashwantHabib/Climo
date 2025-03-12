import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

const forecastData = [
  {
    day: 'MON',
    icon: 'Sun',
    temp: 25,
    condition: 'Clouds',
  },
  {
    day: 'TUE',
    icon: 'Sun',
    temp: 27,
    condition: 'Rain',
  },
  {
    day: 'WED',
    icon: 'Thunder',
    temp: 28,
    condition: 'Mist',
  },
  {
    day: 'THU',
    icon: 'SnowFlake',
    temp: 30,
    condition: 'Snow',
  },
  {
    day: 'FRI',
    icon: 'Cloud',
    temp: 29,
    condition: 'Clear',
  },
];

const weatherIcons = {
  Sun: require('../assets/weatherIcons/Sun.png'),
  Moon: require('../assets/weatherIcons/Moon.png'),
  Cloud: require('../assets/weatherIcons/Cloud.png'),
  Drizzle: require('../assets/weatherIcons/Drizzle.png'),
  Rain: require('../assets/weatherIcons/CloudDark.png'),
  Thunder: require('../assets/weatherIcons/Thunder.png'),
  SnowFlake: require('../assets/weatherIcons/SnowFlake.png'),
};

const ForecastBar = ({onSelectWeather}) => {
  return (
    <View style={styles.container}>
      {forecastData.map((item, index) => (
        <Pressable
          key={index}
          style={styles.card}
          onPress={() => onSelectWeather(item)}>
          <Text style={[styles.text, styles.day]}>{item.day}</Text>
          <Image source={weatherIcons[item.icon]} style={styles.icon} />
          <Text style={[styles.text, styles.temp]}>{item.temp}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
    color: 'white',
  },
  container: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  card: {
    alignItems: 'center',
    padding: 10,
  },
  day: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d1d1d1',
  },
  temp: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default ForecastBar;
