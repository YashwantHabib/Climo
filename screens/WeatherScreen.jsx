import React from 'react';
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

const WeatherScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Transparent status bar for seamless UI */}
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />

      {/* Top Bar with Location and Settings Icon */}
      <View style={styles.topBar}>
        <Text style={[styles.text, styles.location]}>Bagalkot</Text>
        <Pressable
          style={styles.icon}
          onPress={() => navigation.navigate('Settings')}>
          <Bolt color="black" size={24} />
        </Pressable>
      </View>

      {/* Weather Information */}
      <View style={styles.content}>
        <WeatherInfo />
        <WeatherControls />
        <ForecastBar />
      </View>
    </SafeAreaView>
  );
};

const WeatherInfo = () => (
  <View style={styles.weatherInfo}>
    <Image
      source={{uri: 'https://cdn-icons-png.flaticon.com/128/5825/5825968.png'}}
      style={styles.weatherIcon}
    />
    <Text style={[styles.text, styles.temperature]}>28</Text>
    <Text style={styles.text}>SUNNY</Text>
  </View>
);

const WeatherControls = () => (
  <View style={styles.sliderContainer}>
    {/* NOW Button */}
    <View style={styles.nowContainer}>
      <Pressable style={styles.circularButton} onPress={() => {}} />
      <Text style={styles.nowText}>NOW</Text>
    </View>
    {/* Weather Forecast Slider */}
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
    fontFamily: 'Sigmar-Regular',
    textTransform: 'uppercase',
  },
  location: {
    fontSize: 14,
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
});

export default WeatherScreen;
