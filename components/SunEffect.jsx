import React from 'react';
import {Animated, Easing} from 'react-native';
import styles from '../styles/weatherStyles';

const SunEffect = ({sunParticles}) => {
  const glowAnim = new Animated.Value(1);
  const rotateAnim = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(glowAnim, {
        toValue: 1.5,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  Animated.loop(
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.sunParticles,
        {
          transform: [
            {
              translateY: sunParticles.interpolate({
                inputRange: [0, 1],
                outputRange: [30, -30],
              }),
            },
            {scale: glowAnim},
            {rotate: spin},
          ],
          opacity: sunParticles.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ]}
    />
  );
};

export default SunEffect;
