import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, StatusBar} from 'react-native';
import {X, MapPin, Thermometer, Wind, Grid, Sun} from 'lucide-react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const SettingsScreen = ({navigation}) => {
  const [temperature, setTemperature] = useState('C');
  const [windSpeed, setWindSpeed] = useState('M/S');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={styles.topBar}>
            <Text style={styles.text}>Settings</Text>
            <Pressable style={styles.icon} onPress={() => navigation.goBack()}>
              <X color="white" size={24} />
            </Pressable>
          </View>
          <View style={styles.settingList}>
            <SettingToggle
              title="Temperature"
              icon={<Thermometer color="white" size={20} />}
              options={['C', 'F']}
              value={temperature}
              setValue={setTemperature}
            />
            <SettingToggle
              title="Wind Speed"
              icon={<Wind color="white" size={20} />}
              options={['M/S', 'MPH']}
              value={windSpeed}
              setValue={setWindSpeed}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const SettingItem = ({title, icon}) => (
  <View style={styles.settingItem}>
    <View style={styles.settingLeft}>
      {icon}
      <Text style={styles.settingText}>{title}</Text>
    </View>
  </View>
);

const SettingToggle = ({title, icon, options, value, setValue}) => (
  <View style={styles.settingItem}>
    <View style={styles.settingLeft}>
      {icon}
      <Text style={styles.settingText}>{title}</Text>
    </View>
    <View style={styles.singleToggle}>
      {options.map((option, index) => (
        <Pressable
          key={option}
          style={[
            styles.toggleButton,
            value === option && styles.toggleActive,
            index === 0 && styles.toggleLeft, // Left rounded
            index === options.length - 1 && styles.toggleRight, // Right rounded
          ]}
          onPress={() => setValue(option)}>
          <Text
            style={[
              styles.toggleText,
              value === option && styles.toggleTextActive,
            ]}>
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#171717',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#171717',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'sans-serif-condensed',
    color: 'white',
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
  settingList: {
    width: '90%',
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingText: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: 'sans-serif-condensed',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    textTransform: 'uppercase',
    fontFamily: 'sans-serif-condensed',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  singleToggle: {
    flexDirection: 'row',
    backgroundColor: '#444',
    borderRadius: 10,
    overflow: 'hidden', // Ensures the rounded shape
  },

  toggleButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  toggleLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  toggleRight: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  toggleText: {
    color: 'gray',
    textTransform: 'uppercase',
    fontFamily: 'sans-serif-condensed',
  },

  toggleTextActive: {
    color: 'white',
  },
});

export default SettingsScreen;
