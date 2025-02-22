import React, {useEffect, useState} from 'react';
import {Animated, View, StyleSheet} from 'react-native';

const ThunderEffect = () => {
  const [thunderAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const thunderSequence = () => {
      Animated.sequence([
        Animated.timing(thunderAnim, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(thunderAnim, {
          toValue: 0.5,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(thunderAnim, {
          toValue: 1,
          duration: 60,
          useNativeDriver: true,
        }),
        Animated.timing(thunderAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.delay(800 + Math.random() * 1500),
      ]).start(() => thunderSequence());
    };

    thunderSequence();
  }, [thunderAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.thunderbolt, {opacity: thunderAnim}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  thunderbolt: {
    position: 'absolute',
    width: 8,
    height: 100,
    backgroundColor: 'yellow',
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 15,
    transform: [{rotate: `${Math.random() * 20 - 10}deg`}],
  },
});

export default ThunderEffect;
