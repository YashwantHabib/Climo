import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const forecastData = [
  {
    day: 'MON',
    icon: 'https://cdn-icons-png.flaticon.com/128/9420/9420939.png',
    temp: 25,
  },
  {
    day: 'TUE',
    icon: 'https://cdn-icons-png.flaticon.com/128/5828/5828361.png',
    temp: 27,
  },
  {
    day: 'WED',
    icon: 'https://cdn-icons-png.flaticon.com/128/5828/5828361.png',
    temp: 28,
  },
  {
    day: 'THU',
    icon: 'https://cdn-icons-png.flaticon.com/128/5825/5825968.png',
    temp: 30,
  },
  {
    day: 'FRI',
    icon: 'https://cdn-icons-png.flaticon.com/128/5825/5825968.png',
    temp: 29,
  },
];

const ForecastBar = () => {
  return (
    <View style={styles.container}>
      {forecastData.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={[styles.text, styles.day]}>{item.day}</Text>
          <Image source={{uri: item.icon}} style={styles.icon} />

          <Text style={[styles.text, styles.temp]}>{item.temp}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
  },
  container: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  card: {
    alignItems: 'center',
  },
  day: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  temp: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 25,
    aspectRatio: 1,
  },
});

export default ForecastBar;
