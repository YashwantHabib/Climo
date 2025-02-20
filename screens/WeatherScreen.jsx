import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import {Bolt} from 'lucide-react-native';
import WeatherSlider from '../components/WeatherSlider';
import ForecastBar from '../components/ForecastBar';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const WeatherScreen = ({navigation}) => {
  const [weather, setWeather] = useState({
    temp: 28,
    condition: 'Sunny',
    icon: 'https://cdn-icons-png.flaticon.com/128/5825/5825968.png',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={[styles.text, styles.location]}>Bagalkot</Text>
        <Pressable
          style={styles.icon}
          onPress={() => navigation.navigate('Settings')}>
          <Bolt color="black" size={24} />
        </Pressable>
      </View>

      {/* Weather Info with Animation */}
      <View style={styles.content}>
        <WeatherInfo weather={weather} />
        <WeatherControls />
        <ForecastBar onSelect={setWeather} />
      </View>
    </SafeAreaView>
  );
};

const WeatherInfo = ({weather}) => {
  const scale = useSharedValue(0.5);

  React.useEffect(() => {
    scale.value = withSpring(1, {damping: 5, stiffness: 120});
  }, [weather]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: scale.value,
  }));

  return (
    <Animated.View style={[styles.weatherInfo, animatedStyle]}>
      <Image source={{uri: weather.icon}} style={styles.weatherIcon} />
      <Text style={[styles.text, styles.temperature]}>{weather.temp}</Text>
      <Text style={styles.text}>{weather.condition}</Text>
    </Animated.View>
  );
};

const WeatherControls = () => (
  <View style={styles.sliderContainer}>
    <View style={styles.nowContainer}>
      <Pressable style={styles.circularButton} onPress={() => {}} />
      <Text style={styles.nowText}>NOW</Text>
    </View>
    <WeatherSlider />
  </View>
);

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
    width: 120,
    height: 120,
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
});

export default WeatherScreen;
