import React from 'react';
import {Animated} from 'react-native';
import styles from '../styles/weatherStyles';

const SunEffect = ({sunParticles}) => (
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
        ],
        opacity: sunParticles.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        }),
      },
    ]}
  />
);

export default SunEffect;
