import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import {MapPin, X} from 'lucide-react-native';
import styles from '../styles/weatherStyles';

const LocationModal = ({
  modalVisible,
  setModalVisible,
  searchText,
  setSearchText,
  getCurrentLocation,
  setCity,
}) => {
  const [cityList, setCityList] = useState([]);

  const handleSearch = () => {
    if (searchText.length > 2) {
      setCity(searchText);
      setCityList(prev => [
        searchText,
        ...prev.filter(city => city !== searchText),
      ]);
      setSearchText('');
      setModalVisible(false);
    }
  };

  const handleCityPress = city => {
    setCity(city);
    setModalVisible(false);
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

          <Pressable
            style={styles.currentLocation}
            onPress={async () => {
              await getCurrentLocation();
              setModalVisible(false);
            }}>
            <MapPin color="white" size={20} />
            <Text style={styles.currentLocationText}>CURRENT LOCATION</Text>
          </Pressable>

          {/* City History List */}
          <ScrollView style={styles.cityList}>
            {cityList.map((city, index) => (
              <Pressable
                key={index}
                onPress={() => handleCityPress(city)}
                style={styles.cityItem}>
                <Text style={styles.cityText}>{city}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;
