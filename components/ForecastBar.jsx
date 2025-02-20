import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

const forecastData = [
  {
    day: 'MON',
    icon: 'https://cdn-icons-png.flaticon.com/128/9420/9420939.png',
    temp: 25,
    condition: 'Cloudy',
  },
  {
    day: 'TUE',
    icon: 'https://cdn-icons-png.flaticon.com/128/5828/5828361.png',
    temp: 27,
    condition: 'Rainy',
  },
  {
    day: 'WED',
    icon: 'https://cdn-icons-png.flaticon.com/128/5828/5828361.png',
    temp: 28,
    condition: 'Partly Cloudy',
  },
  {
    day: 'THU',
    icon: 'https://cdn-icons-png.flaticon.com/128/5825/5825968.png',
    temp: 30,
    condition: 'Sunny',
  },
  {
    day: 'FRI',
    icon: 'https://cdn-icons-png.flaticon.com/128/5825/5825968.png',
    temp: 29,
    condition: 'Sunny',
  },
];

const ForecastBar = ({onSelect}) => {
  return (
    <View style={styles.container}>
      {forecastData.map((item, index) => (
        <Pressable
          key={index}
          style={styles.card}
          onPress={() => onSelect(item)}>
          <Text style={[styles.text, styles.day]}>{item.day}</Text>
          <Image source={{uri: item.icon}} style={styles.icon} />
          <Text style={[styles.text, styles.temp]}>{item.temp}°</Text>
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
    padding: 8,
    borderRadius: 10,
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
    width: 40,
    height: 40,
  },
});

export default ForecastBar;
