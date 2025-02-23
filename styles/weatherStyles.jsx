import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  refresh: {position: 'absolute', right: 16},
  icon: {position: 'absolute', right: 16},
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  weatherInfo: {alignItems: 'center'},
  weatherIcon: {width: '30%', aspectRatio: 1},
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
