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
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  overlay: {
    width: '90%',
    height: '80%',
    position: 'relative',
    alignItems: 'center',
  },
  infoBlockLeft: {
    position: 'absolute',
    left: 20,
    top: '40%',
  },
  infoBlockRight: {
    position: 'absolute',
    right: 20,
    top: '2%',
  },
  infoBlockBottom: {
    position: 'absolute',
    right: 20,
    bottom: 100,
  },
});

export default styles;
