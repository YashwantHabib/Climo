import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

// Constants
const SLIDER_WIDTH = Dimensions.get('window').width * 0.7;
const THUMB_SIZE = 40;

const WeatherSlider = ({forecast, updateWeather}) => {
  if (!forecast || !forecast.list || !forecast.city) {
    return null; // Handle cases where forecast data isn't available yet
  }

  const {timezone} = forecast.city;
  const firstSixForecasts = forecast.list.slice(0, 6);

  // Generate time labels for steps
  const STEPS = firstSixForecasts.map(entry => {
    const date = new Date((entry.dt + timezone) * 1000);
    let hours = date.getUTCHours();

    // Convert to 12-hour format
    const period = hours >= 12 ? 'P' : 'A';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

    return `${hours}${period}`;
  });

  const STEP_WIDTH = (SLIDER_WIDTH - THUMB_SIZE) / (STEPS.length - 1);

  const position = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      let newX = Math.min(
        SLIDER_WIDTH - THUMB_SIZE,
        Math.max(0, gesture.dx + currentIndex.current * STEP_WIDTH),
      );
      position.setValue(newX);
    },
    onPanResponderRelease: () => {
      currentIndex.current = Math.round(position._value / STEP_WIDTH);
      Animated.timing(position, {
        toValue: currentIndex.current * STEP_WIDTH,
        duration: 200,
        useNativeDriver: false,
      }).start();
      updateWeather({
        icon: firstSixForecasts[currentIndex.current].weather[0].icon,
        temp: Math.round(firstSixForecasts[currentIndex.current].main.temp),
        condition:
          firstSixForecasts[currentIndex.current].weather[0].description,
        temp_min: Math.round(
          firstSixForecasts[currentIndex.current].main.temp_min,
        ),
        temp_max: Math.round(
          firstSixForecasts[currentIndex.current].main.temp_max,
        ),
        feels_like: Math.round(
          firstSixForecasts[currentIndex.current].main.feels_like,
        ),
        humidity: firstSixForecasts[currentIndex.current].main.humidity,
        visibility: firstSixForecasts[currentIndex.current].visibility / 1000,
        wind: {
          speed: firstSixForecasts[currentIndex.current].wind.speed,
          deg: firstSixForecasts[currentIndex.current].wind.deg,
        },
        sunrise: forecast.city.sunrise,
        sunset: forecast.city.sunset,
        timezone: forecast.city.timezone,
      });
      //Update weather based on slider value
    },
  });

  return (
    <View style={styles.container}>
      {/* Slider Track */}
      <View style={styles.track}>
        {STEPS.map((_, index) => (
          <View key={index} style={styles.dot} />
        ))}
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{translateX: position}],
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>

      {/* Labels under Slider */}
      <View style={styles.labels}>
        {STEPS.map((label, index) => (
          <Text key={index} style={[styles.text, styles.stepLabel]}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '10%',
  },
  track: {
    width: SLIDER_WIDTH,
    height: 40,
    backgroundColor: '#262626',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: THUMB_SIZE / 2,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: '#737373',
    borderRadius: 3,
  },
  thumb: {
    backgroundColor: 'white',
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SLIDER_WIDTH - 20,
    marginTop: 20,
  },
  text: {
    fontFamily: 'sans-serif-condensed',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default WeatherSlider;
