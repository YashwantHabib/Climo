import React, {useEffect, useRef} from 'react';
import {Animated, View, StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const NUM_SNOWFLAKES = 50;

const SnowEffect = () => {
  const snowAnimations = useRef(
    Array.from({length: NUM_SNOWFLAKES}, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animations = snowAnimations.map(anim => {
      return Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration: 5000 + Math.random() * 600,
          useNativeDriver: true,
        }),
      );
    });
    Animated.stagger(150, animations).start();
  }, [snowAnimations]);

  return (
    <View style={styles.container}>
      {snowAnimations.map((anim, index) => {
        const translateY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, height / 2],
        });
        const translateX = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Math.random() * 10 - 5],
        });
        const scale = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.2],
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.snowflake,
              {
                left: `${Math.random() * 100}%`,
                transform: [{translateY}, {translateX}, {scale}],
                opacity: anim,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  snowflake: {
    position: 'absolute',
    width: 5,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 2,
  },
});

export default SnowEffect;
