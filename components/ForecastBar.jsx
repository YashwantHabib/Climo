import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

const forecastData = [
  {
    day: 'MON',
    icon: 'https://cdn-icons-png.flaticon.com/128/9420/9420939.png',
    temp: 25,
    condition: 'Clouds',
  },
  {
    day: 'TUE',
    icon: 'https://cdn-icons-png.flaticon.com/128/5825/5825968.png',
    temp: 27,
    condition: 'Rain',
  },
  {
    day: 'WED',
    icon: 'https://cdn-icons-png.flaticon.com/128/5825/5825968.png',
    temp: 28,
    condition: 'Mist',
  },
  {
    day: 'THU',
    icon: 'https://cdn-icons-png.flaticon.com/128/5825/5825968.png',
    temp: 30,
    condition: 'Snow',
  },
  {
    day: 'FRI',
    icon: 'https://cdn-icons-png.flaticon.com/128/5825/5825968.png',
    temp: 29,
    condition: 'Clear',
  },
];

const ForecastBar = ({onSelectWeather}) => {
  return (
    <View style={styles.container}>
      {forecastData.map((item, index) => (
        <Pressable
          key={index}
          style={styles.card}
          onPress={() => onSelectWeather(item)}>
          <Text style={[styles.text, styles.day]}>{item.day}</Text>
          <Image source={{uri: item.icon}} style={styles.icon} />
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
