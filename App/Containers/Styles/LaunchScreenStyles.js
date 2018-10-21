import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

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
  },
  menuBox: {
    height: Metrics.screenHeight * 0.06,
    width: Metrics.screenHeight * 0.06,
    borderRadius: Metrics.screenHeight * 0.15,
    position: 'absolute',
    //backgroundColor: 'white',
    top: Metrics.screenHeight * 0.02,
    right: Metrics.screenHeight * 0.02,
    justifyContent: 'center',
    alignItems: 'center'
  },
  greenIcon: {
    position: 'absolute',
    left: Metrics.screenWidth * 0.1
  },
  switchBox: {
    height: Metrics.screenHeight * 0.04,
    width: Metrics.screenWidth * 0.15,
    borderRadius: Metrics.screenWidth * 0.08,
    position: 'absolute',
    top: Metrics.screenHeight * 0.32,
    left: Metrics.screenHeight * 0.135,
    justifyContent: 'center',
    alignItems: 'center'
  },
  conversionBox: {
    height: Metrics.screenHeight * 0.25,
    width: Metrics.screenWidth,
    marginTop: Metrics.screenHeight * 0.05,
    paddingLeft: Metrics.screenWidth * 0.1
  },
  baseBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  baseTextBox: {
    height: Metrics.screenHeight * 0.08,
    width: Metrics.screenWidth * 0.12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  baseText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'SpaceMono-Regular'
  },
  baseInputBox: {
    height: Metrics.screenHeight * 0.08,
    width: Metrics.screenWidth * 0.42,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 10
  },
  baseInput: {
    height: Metrics.screenHeight * 0.075,
    width: Metrics.screenWidth * 0.4,
    maxHeight: 80,
    color: 'black',
    fontWeight: '200',
    textAlign: 'center',
    fontFamily: 'monospace'
  },
  targetBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  targetTextBox: {
    height: Metrics.screenHeight * 0.08,
    width: Metrics.screenWidth * 0.12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  targetText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'SpaceMono-Regular'
  },
  targetResultBox: {
    height: Metrics.screenHeight * 0.08,
    width: Metrics.screenWidth * 0.42,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 10
  },
  targetResult: {
    color: Colors.panther,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: '200',
    fontFamily: 'monospace'
  },
  convertBox: {
    position: 'absolute',
    height: Metrics.screenHeight * 0.05,
    width: Metrics.screenWidth * 0.2,
    top: Metrics.screenHeight * 0.48,
    left: Metrics.screenWidth * 0.57,
    backgroundColor: 'white',
    borderRadius: Metrics.screenHeight * 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  convertText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'SpaceMono-Regular'
  },
  currBox: {
    height: Metrics.screenHeight * 0.2,
    width: Metrics.screenWidth,
    marginTop: Metrics.screenHeight * 0.1
  },
  currContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },
  currTextBox: {
    height: Metrics.screenHeight * 0.07,
    width: Metrics.screenWidth * 0.2,
    borderRadius: Metrics.screenHeight * 0.08,
    justifyContent: 'center',
    alignItems: 'center'
  },
  currText: {
    color: '#00FF7B',
    fontSize: 18,
    fontFamily: 'SpaceMono-Regular'
  }
});
