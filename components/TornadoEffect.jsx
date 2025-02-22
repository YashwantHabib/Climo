import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const NUM_PARTICLES = 15; // More particles for a dense tornado

const TornadoEffect = () => {
  const particles = useRef(
    Array.from({length: NUM_PARTICLES}, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animations = particles.map((anim, index) => {
      return Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration: 4000 + Math.random() * 2000, // Different speeds for variety
          useNativeDriver: true,
        }),
      );
    });

    Animated.stagger(200, animations).start();
  }, [particles]);

  return (
    <View style={styles.container}>
      {particles.map((anim, index) => {
        const translateY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [height / 2, height / 4], // Moves upward
        });

        const translateX = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [
            Math.sin(index * (Math.PI / 7)) * (30 + index * 2), // Wider at bottom
            Math.sin(index * (Math.PI / 7) + Math.PI) * (5 + index * 0.5),
          ],
        });

        const rotate = anim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '720deg'], // Faster rotation
        });

        const scale = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1.5], // Particles change size slightly
        });

        const opacity = anim.interpolate({
          inputRange: [0, 0.7, 1],
          outputRange: [0.3, 0.7, 0], // Particles fade out
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                left: width / 2 - 10, // Centered
                transform: [{translateY}, {translateX}, {rotate}, {scale}],
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
  particle: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'rgba(180, 180, 180, 0.7)', // Grayish misty color
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default TornadoEffect;
