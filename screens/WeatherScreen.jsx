import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  Animated,
} from 'react-native';
import {Bolt} from 'lucide-react-native';
import WeatherSlider from '../components/WeatherSlider';
import ForecastBar from '../components/ForecastBar';

const WeatherScreen = ({navigation}) => {
  const [weather, setWeather] = useState({
    icon: 'https://cdn-icons-png.flaticon.com/128/5825/5825968.png',
    temp: 28,
    condition: 'Clear',
  });

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const cloudAnim = useRef(new Animated.Value(0)).current;
  const sunParticles = useRef(new Animated.Value(0)).current;
  const cloudAnimationRef = useRef(null);
  const sunAnimationRef = useRef(null);
  const cloudAnim2 = useRef(new Animated.Value(0)).current; // For the second cloud
  const cloudAnimationRef2 = useRef(null); // Ref for the second cloud animation

  useEffect(() => {
    if (weather.condition === 'Clouds') {
      if (cloudAnimationRef.current) {
        cloudAnimationRef.current.stop();
      }
      cloudAnim.setValue(0);

      cloudAnimationRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(cloudAnim, {
            toValue: 1,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(cloudAnim, {
            toValue: 0,
            duration: 8000,
            useNativeDriver: true,
          }),
        ]),
      );
      cloudAnimationRef.current.start();
    } else if (cloudAnimationRef.current) {
      cloudAnimationRef.current.stop();
    }
    // Second Cloud Animation
    if (weather.condition === 'Clouds') {
      if (cloudAnimationRef2.current) {
        cloudAnimationRef2.current.stop();
      }
      cloudAnim2.setValue(0); // Reset value

      cloudAnimationRef2.current = Animated.loop(
        Animated.sequence([
          Animated.timing(cloudAnim2, {
            toValue: 1,
            duration: 10000, // Different duration (e.g., 10 seconds)
            useNativeDriver: true,
          }),
          Animated.timing(cloudAnim2, {
            toValue: 0,
            duration: 10000, // Different duration
            useNativeDriver: true,
          }),
        ]),
      );
      cloudAnimationRef2.current.start();
    } else if (cloudAnimationRef2.current) {
      cloudAnimationRef2.current.stop();
    }
  }, [weather.condition]);

  useEffect(() => {
    if (weather.condition === 'Clear') {
      if (sunAnimationRef.current) {
        sunAnimationRef.current.stop();
      }
      sunParticles.setValue(0);

      sunAnimationRef.current = Animated.loop(
        Animated.timing(sunParticles, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      );
      sunAnimationRef.current.start();
    } else if (sunAnimationRef.current) {
      sunAnimationRef.current.stop();
    }
  }, [weather.condition]);

  const updateWeather = newWeather => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setWeather(newWeather);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />

      <View style={styles.topBar}>
        <Text style={[styles.text, styles.location]}>Bagalkot</Text>
        <Pressable
          style={styles.icon}
          onPress={() => navigation.navigate('Settings')}>
          <Bolt color="black" size={24} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <WeatherInfo weather={weather} fadeAnim={fadeAnim} />
        {weather.condition === 'Clouds' && (
          <>
            <CloudEffect cloudAnim={cloudAnim} />
            <CloudEffect
              cloudAnim={cloudAnim2}
              cloudImageStyle={styles.cloudImage2}
            />
          </>
        )}
        {weather.condition === 'Clear' && (
          <SunEffect sunParticles={sunParticles} />
        )}
        <WeatherControls />
        <ForecastBar onSelectWeather={updateWeather} />
      </View>
    </SafeAreaView>
  );
};

const WeatherInfo = ({weather, fadeAnim}) => (
  <Animated.View style={[styles.weatherInfo, {opacity: fadeAnim}]}>
    <Image source={{uri: weather.icon}} style={styles.weatherIcon} />
    <Text style={[styles.text, styles.temperature]}>{weather.temp}</Text>
    <Text style={styles.text}>{weather.condition}</Text>
  </Animated.View>
);

const WeatherControls = () => (
  <View style={styles.sliderContainer}>
    <View style={styles.nowContainer}>
      <Pressable style={styles.circularButton} onPress={() => {}} />
      <Text style={styles.nowText}>NOW</Text>
    </View>
    <WeatherSlider />
  </View>
);

const SunEffect = ({sunParticles}) => {
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

const CloudEffect = ({cloudAnim, cloudImageStyle}) => {
  // Added prop for styling
  const imageStyle = cloudImageStyle || styles.cloudImage; // Use prop or default style

  return (
    <Animated.Image
      source={{uri: 'https://cdn-icons-png.flaticon.com/128/9420/9420939.png'}}
      style={[
        imageStyle, // Use the dynamic style
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
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFAE7C',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'sans-serif-condensed',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherInfo: {
    alignItems: 'center',
  },
  weatherIcon: {
    width: '30%',
    aspectRatio: 1,
  },
  temperature: {
    fontSize: 100,
  },
  sliderContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  nowContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  circularButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nowText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sunParticles: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'yellow',
    borderRadius: 5,
    top: 100,
    left: '50%',
  },
  cloudImage: {
    // Style for the first cloud
    position: 'absolute',
    width: 150,
    height: 80,
    top: '25%', // Slightly lower position for variety
    left: '20%', // Slightly different left position
    resizeMode: 'contain',
  },
  cloudImage2: {
    // Style for the second cloud
    position: 'absolute',
    width: 120, // Slightly smaller
    height: 70,
    top: '35%', // Different top position
    left: '20%', // Different left position
    resizeMode: 'contain',
  },
});

export default WeatherScreen;
