import React, {useRef} from 'react';
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
const STEPS = ['6 A', '9', '12 P', '3', '6', '9'];
const STEP_WIDTH = (SLIDER_WIDTH - THUMB_SIZE) / (STEPS.length - 1);

const WeatherSlider = () => {
  const position = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(0);

  // Handles slider movement
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
    shadowColor: '#000', // Black shadow
    shadowOffset: {width: 0, height: 4}, // Offset shadow
    shadowOpacity: 0.3, // Shadow visibility
    shadowRadius: 4, // Blurriness of shadow
    elevation: 5, // Required for Android
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
