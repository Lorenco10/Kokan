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
    height: Metrics.screenHeight * 0.07,
    width: Metrics.screenHeight * 0.07,
    borderRadius: Metrics.screenHeight * 0.01,
    position: 'absolute',
    top: Metrics.screenHeight * 0.01,
    right: Metrics.screenHeight * 0.06,
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
  currBox: {
    height: Metrics.screenHeight * 0.12,
    width: Metrics.screenWidth * 0.9,
    marginTop: Metrics.screenHeight * 0.05
  },
  currContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  textInput: {
    height: '190%',
    width: '80%',
    color: Colors.panther,
    fontSize: 13,
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: 0.5,
    fontFamily: 'SpaceMono-Regular',
    paddingBottom: 0,
    paddingTop: 0
  },
  searchButton: {
    height: '5%',
    width: '81%',
    borderRadius: 20,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '83%',
    left: '10%',
    backgroundColor: 'white'
  }
});
