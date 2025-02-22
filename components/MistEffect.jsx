import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
const NUM_MIST = 5;

const MistEffect = () => {
  const mistAnimations = useRef(
    Array.from({length: NUM_MIST}, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animations = mistAnimations.map(anim => {
      return Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration: 5000 + Math.random() * 2000, // Slower, natural mist movement
          useNativeDriver: true,
        }),
      );
    });

    Animated.stagger(500, animations).start();
  }, [mistAnimations]);

  return (
    <View style={styles.container}>
      {mistAnimations.map((anim, index) => {
        const translateY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [height + 50, -100], // Moves from bottom to top
        });
        const translateX = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [Math.random() * 30 - 15, Math.random() * 30 - 15], // Slight horizontal drift
        });
        const scale = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1.4], // Expands slightly as it floats
        });
        const opacity = anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.1, 0.4, 0.1], // Fades in and out smoothly
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.mist,
              {
                left: `${Math.random() * 100}%`,
                transform: [{translateY}, {translateX}, {scale}],
                opacity,
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
  mist: {
    position: 'absolute',
    width: 80, // Larger mist particles
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // More transparent
    borderRadius: 50,
    shadowColor: 'white',
    shadowOpacity: 0.4,
    shadowRadius: 15, // Blurred effect
  },
});

export default MistEffect;
