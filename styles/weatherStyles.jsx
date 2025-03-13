import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  refresh: {margin: 10},
  icon: {position: 'absolute', right: 16},
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '20',
  },
  weatherInfo: {alignItems: 'center'},
  weatherIcon: {width: '250', height: '250'},
  weatherIconCloud: {width: '250', height: '200'},
  temperature: {fontSize: 120},

  cloudImage: {
    position: 'absolute',
    width: 150,
    height: 80,
    top: '25%',
    left: '20%',
  },
  cloudImage2: {
    position: 'absolute',
    width: 120,
    height: 70,
    top: '35%',
    left: '20%',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: '90%',
    height: '80%',
    position: 'relative',
    alignItems: 'center',
  },
  textInfo: {
    color: 'gray',
  },
  textInfoR: {
    textAlign: 'right',
  },
  infoBlockLeft: {
    position: 'absolute',
    left: 10,
    top: '40%',
  },
  infoBlockRight: {
    position: 'absolute',
    right: 10,
    textAlign: 'right',
  },
  infoBlockBottom: {
    position: 'absolute',
    right: 10,
    top: '60%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'black',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#222',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  currentLocationText: {
    color: 'white',
    marginLeft: 10,
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
