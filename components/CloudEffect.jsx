import React from 'react';
import {Animated, Image} from 'react-native';
import styles from '../styles/weatherStyles';

const CloudEffect = ({cloudAnim, cloudImageStyle}) => {
  return (
    <Animated.Image
      source={require('../assets/weatherIcons/Cloud.png')}
      style={[
        cloudImageStyle || styles.cloudImage, // Default style if none is provided
        {
          transform: [
            {
              translateX: cloudAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-80, 50],
              }),
            },
          ],

          resizeMode: 'contain', // Ensure the image is not cropped
        },
      ]}
    />
  );
};

export default CloudEffect;
