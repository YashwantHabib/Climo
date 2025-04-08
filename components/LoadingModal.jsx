import React from 'react';
import {Modal, View, Text, Image, StyleSheet} from 'react-native';

const LoadingModal = ({visible}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Image
            source={require('../assets/weatherIcons/Umbrella.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Hold my umbrella</Text>
          <Text style={styles.subtext}>Fetching the weather for you...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#222',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtext: {
    color: '#ccc',
    fontSize: 14,
  },
});

export default LoadingModal;
