import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  background: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center'
  },
  titleText: {
    color: 'white',
    fontSize: 26,
    fontFamily: 'SpaceMono-Regular',
    paddingTop: Metrics.screenHeight * 0.05
  },
  scrollText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'SpaceMono-Regular',
    paddingTop: Metrics.screenHeight * 0.02
  },
  dateText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'SpaceMono-Regular',
    paddingBottom: Metrics.screenHeight * 0.02,
    paddingRight: Metrics.screenHeight * 0.02
  },
  dateBox: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  }
});
