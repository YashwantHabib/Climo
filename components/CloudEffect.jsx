import React from 'react';
import {Animated, Image} from 'react-native';
import styles from '../styles/weatherStyles';

const CloudEffect = ({cloudAnim, cloudImageStyle}) => {
  return (
    <Animated.Image
      source={{uri: 'https://cdn-icons-png.flaticon.com/128/9420/9420939.png'}}
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
          opacity: cloudAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.7, 0.9, 0.7],
          }),
          resizeMode: 'contain', // Ensure the image is not cropped
        },
      ]}
    />
  );
};

export default CloudEffect;
