import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Camera} from 'lucide-react-native';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
      <Text style={styles.info}>Adjust your preferences here.</Text>
      <Text>Settinggssss</Text>
      <Camera color="red" size={48} />
      <Button
        title="Go to Weather"
        onPress={() => navigation.navigate('Weather')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    marginVertical: 10,
    fontSize: 16,
    color: 'gray',
  },
});

export default SettingsScreen;
