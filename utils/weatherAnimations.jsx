import {Animated} from 'react-native';

export const startCloudAnimation = (condition, cloudAnim, duration = 8000) => {
  if (condition === 'Clouds') {
    cloudAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(cloudAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(cloudAnim, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }
};

export const startSunAnimation = (condition, sunParticles) => {
  if (condition === 'Clear') {
    sunParticles.setValue(0);
    Animated.loop(
      Animated.timing(sunParticles, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
    ).start();
  }
};

export const fadeInOutAnimation = (fadeAnim, callback) => {
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  }).start(() => {
    callback();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  });
};
