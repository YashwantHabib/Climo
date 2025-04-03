import React from 'react';
import {View, Text, Pressable, TextInput, Modal} from 'react-native';
import {MapPin, X} from 'lucide-react-native';
import styles from '../styles/weatherStyles';
import {fetchWeatherByCity} from '../components/Api';

const LocationModal = ({
  modalVisible,
  setModalVisible,
  searchText,
  setSearchText,
}) => {
  const handleSearch = () => {
    if (searchText.length > 2) {
      console.log('Searching for:', searchText);
      setModalVisible(false); // Close the modal after logging the search term.
    }
  };

  return (
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
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;
