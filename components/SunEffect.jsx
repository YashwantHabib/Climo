import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';

const SunEffect = () => {
  const glowAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 2, // Slight pulsating effect
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.sunParticle,
        {transform: [{scale: glowAnim}]}, // Only pulsates, no movement
      ]}
    />
  );
};

const styles = StyleSheet.create({
  sunParticle: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'yellow',
    borderRadius: 5,
    top: 100,
    left: '50%',
  },
});

export default SunEffect;
