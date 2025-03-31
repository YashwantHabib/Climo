import React from 'react';
import {View, Text, Pressable, TextInput, Modal} from 'react-native';
import {MapPin, X} from 'lucide-react-native';
import styles from '../styles/weatherStyles';

const LocationModal = ({
  modalVisible,
  setModalVisible,
  searchText,
  setSearchText,
  getCurrentLocation,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.closeButton}>
          <Text style={styles.modalTitle}>LOCATION</Text>
          <Pressable onPress={() => setModalVisible(false)}>
            <X color="white" size={20} />
          </Pressable>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="gray"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Pressable style={styles.currentLocation} onPress={getCurrentLocation}>
          <MapPin color="white" size={20} />
          <Text style={styles.currentLocationText}>CURRENT LOCATION</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

export default LocationModal;
