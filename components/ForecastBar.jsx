import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import weatherIcons from '../utils/weatherIcons'; // Import the icons from your central file

const ForecastBar = ({forecast, updateWeather}) => {
  return (
    <View style={styles.container}>
      {forecast.length > 0 ? (
        forecast.map((item, index) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() =>
              updateWeather({
                icon: item.data.weather[0].icon,
                temp: Math.round(item.data.main.temp),
                condition: item.data.weather[0].description,
                temp_min: Math.round(item.data.main.temp_min),
                temp_max: Math.round(item.data.main.temp_max),
                feels_like: Math.round(item.data.main.feels_like),
                humidity: item.data.main.humidity,
                visibility: item.data.visibility / 1000,
                wind: {
                  speed: item.data.wind.speed,
                  deg: item.data.wind.deg,
                },
                sunrise: item.data.sys.sunrise,
                sunset: item.data.sys.sunset,
                timezone: item.data.timezone,
              })
            }>
            <Text style={[styles.text, styles.day]}>{item.day}</Text>
            <Image
              source={weatherIcons[item.data.weather[0].icon]}
              style={styles.icon}
            />
            <Text style={[styles.text, styles.temp]}>
              {Math.round(item.data.main.temp)}
            </Text>
          </Pressable>
        ))
      ) : (
        <Text style={styles.text}>Loading forecast...</Text>
      )}
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
