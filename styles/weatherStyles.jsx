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
  weatherIcon: {width: '200', height: '200'},
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
});

export default styles;
