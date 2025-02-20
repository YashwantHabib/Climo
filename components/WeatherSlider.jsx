import React, {useRef} from 'react';
import {View, Text, StyleSheet, PanResponder, Animated} from 'react-native';

// Constants
const SLIDER_WIDTH = 250;
const STEPS = ['6 A', '9', '12 P', '3', '6', '9'];
const STEP_WIDTH = SLIDER_WIDTH / (STEPS.length - 1); // Distance between steps

const WeatherSlider = () => {
  const position = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(0);

  // Handles slider movement
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      let newX = Math.min(
        SLIDER_WIDTH, // Allow reaching the last step
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
          style={[styles.thumb, {transform: [{translateX: position}]}]}
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
    paddingTop: 10,
  },
  track: {
    width: SLIDER_WIDTH,
    height: 10,
    backgroundColor: '#e69c6e',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: '#5a4a42',
    borderRadius: 3,
  },
  thumb: {
    position: 'absolute',
    width: 6,
    height: 40, // Bar-style handle
    backgroundColor: '#000',
    borderRadius: 3,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SLIDER_WIDTH + 10,
    marginTop: 20,
  },
  text: {
    fontFamily: 'sans-serif-condensed',
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default WeatherSlider;
