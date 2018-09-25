import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Animated,
  Easing
} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import currencies from './currencies';

// Styles
import styles from './Styles/LaunchScreenStyles';
import { Metrics, Colors } from '../Themes';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base: 'EUR',
      target: 'USD',
      convert: false,
      text: '',
      openMenu: false,
      active: 'base',
      showFeed: true,
      textLength: 13,
      date: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-'),
      time: new Date().toLocaleTimeString().replace('/.*(d{2}:d{2}:d{2}).*/', '$1'),
      rates: {},
      feedRates: {}
    };

    this.getRates = this.getRates.bind(this);
    this.onChange = this.onChange.bind(this);
    this.animate = this.animate.bind(this);
    this.animateMenu = this.animateMenu.bind(this);

    this.activeAnim = new Animated.Value(0);
    this.menuAnim = new Animated.Value(0);
  }

  componentDidMount() {
    axios.get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`).then(response => {
      this.setState({ rates: response.data.rates, feedRates: response.data.rates });
      this.tickerRef.startAnimation();
    });
    //this.interval = setInterval(
    //() =>
    //this.setState({
    //time: new Date().toLocaleTimeString().replace('/.*(d{2}:d{2}:d{2}).*/', '$1')
    //}),
    //1000
    //);
  }

  /*   componentWillUnmount() {
    clearInterval(this.interval);
  } */

  onChange(value) {
    this.textInput.setNativeProps({ text: value });
    this.setState({ text: value });
  }

  getRates() {
    axios.get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`).then(response => {
      this.setState({ rates: response.data.rates, convert: true });
    });
  }

  animate(move) {
    Animated.timing(this.activeAnim, {
      toValue: move ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.back(0.01)),
      useNativeDriver: true
    }).start(() => {
      this.setState({ active: move ? 'target' : 'base' });
    });
  }

  animateMenu(move) {
    Animated.timing(this.menuAnim, {
      toValue: move ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.back(0.01)),
      useNativeDriver: true
    }).start(() => {
      this.setState({ openMenu: !this.state.openMenu });
    });
  }

  render() {
    const { base, target, rates, convert, text, textLength, showFeed } = this.state;
    const activeCurrency = this.state.active;

    const translateY = this.activeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [Metrics.screenHeight * 0.259, Metrics.screenHeight * 0.385],
      extrapolate: 'clamp'
    });

    const flip = this.menuAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
      extrapolate: 'clamp'
    });

    const drop = this.menuAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.background}>
        <StatusBar translucent hidden />
        <TouchableOpacity
          activeOpacity={1}
          style={{
            height: Metrics.screenHeight * 0.06,
            width: Metrics.screenHeight * 0.06,
            borderRadius: Metrics.screenHeight * 0.15,
            position: 'absolute',
            //backgroundColor: 'white',
            top: Metrics.screenHeight * 0.02,
            right: Metrics.screenHeight * 0.02,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            this.animateMenu(!this.state.openMenu);
          }}
        >
          <AnimatedIcon
            name="menu-down"
            size={40}
            color="red"
            style={{ elevation: 5, transform: [{ rotate: flip }] }}
          />
        </TouchableOpacity>
        {/* <View
          style={{
            height: Metrics.screenHeight * 0.2,
            width: Metrics.screenWidth,
            backgroundColor: '#282828',
            top: +Metrics.screenHeight * 0.4
          }}
        /> */}
        <Text style={styles.titleText}>Kōkan Rates</Text>
        <AnimatedIcon
          name="rhombus"
          size={20}
          color="#00FF7B"
          style={{
            position: 'absolute',
            left: Metrics.screenWidth * 0.1,
            transform: [{ translateY }]
          }}
        />
        <TouchableOpacity
          style={{
            height: Metrics.screenHeight * 0.04,
            width: Metrics.screenWidth * 0.15,
            borderRadius: Metrics.screenWidth * 0.08,
            position: 'absolute',
            top: Metrics.screenHeight * 0.32,
            left: Metrics.screenHeight * 0.135,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            this.setState({ base: target, target: base, convert: false }, () => {
              this.getRates();
            });
          }}
        >
          <Icon name="undo-variant" size={18} color="white" />
        </TouchableOpacity>
        <TextTicker
          ref={ref => (this.tickerRef = ref)}
          style={styles.scrollText}
          duration={100000}
          marqueeOnMount={false}
          loop
          repeatSpacer={0}
        >
          {showFeed
            ? Object.keys(this.state.feedRates).map(key => {
                return `${'EUR'}-${key} ${this.state.feedRates[key]}  |  `;
              })
            : ' '}
        </TextTicker>
        <View
          style={{
            height: Metrics.screenHeight * 0.25,
            width: Metrics.screenWidth,
            marginTop: Metrics.screenHeight * 0.05,
            paddingLeft: Metrics.screenWidth * 0.1
            //backgroundColor: 'black'
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                height: Metrics.screenHeight * 0.08,
                width: Metrics.screenWidth * 0.12,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {
                this.animate(false);
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 22,
                  fontFamily: 'SpaceMono-Regular'
                }}
              >
                {this.state.base}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: Metrics.screenHeight * 0.08,
                width: Metrics.screenWidth * 0.42,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
                borderRadius: 10
              }}
            >
              <TextInput
                ref={component => (this.textInput = component)}
                maxLength={textLength}
                keyboardType="numeric"
                placeholder="Enter Value"
                multiline
                placeholderTextColor={Colors.steel}
                underlineColorAndroid="rgba(255,255,255, 0.0)"
                style={{
                  height: Metrics.screenHeight * 0.075,
                  width: Metrics.screenWidth * 0.4,
                  maxHeight: 80,
                  color: 'black',
                  fontSize: text.length <= 9 ? 16 : 14,
                  fontWeight: '200',
                  textAlign: 'center',
                  fontFamily: 'monospace'
                }}
                onChangeText={value => this.onChange(value)}
                onFocus={() => {
                  this.setState(
                    {
                      convert: false,
                      textLength: 13,
                      text: text.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1')
                    },
                    () => {
                      this.textInput.setNativeProps({ text: this.state.text });
                    }
                  );
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  this.setState(
                    {
                      convert: text !== '',
                      textLength: 17,
                      text: text !== '' ? parseFloat(text).toLocaleString('en') : ''
                    },
                    () => {
                      this.textInput.setNativeProps({ text: this.state.text });
                    }
                  );
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                height: Metrics.screenHeight * 0.08,
                width: Metrics.screenWidth * 0.12,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {
                this.animate(true);
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 22,
                  fontFamily: 'SpaceMono-Regular'
                }}
              >
                {this.state.target}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: Metrics.screenHeight * 0.08,
                width: Metrics.screenWidth * 0.42,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
                borderRadius: 10
              }}
            >
              <Text
                style={{
                  color: Colors.panther,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: text.length <= 12 ? 16 : 14,
                  fontWeight: '200',
                  fontFamily: 'monospace'
                }}
              >
                {convert
                  ? (
                      Math.round(
                        rates[target] * Number(text.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1')) * 100
                      ) / 100
                    ).toLocaleString('en')
                  : '...'}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView
          overScrollMode="never"
          style={{
            height: Metrics.screenHeight * 0.2,
            width: Metrics.screenWidth,
            marginTop: Metrics.screenHeight * 0.1
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 30,
              paddingRight: 30
            }}
          >
            {currencies.map((prop, index) => {
              return index <= 3 ? (
                <TouchableOpacity
                  style={{
                    height: Metrics.screenHeight * 0.07,
                    width: Metrics.screenWidth * 0.2,
                    borderRadius: Metrics.screenHeight * 0.08,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => {
                    this.setState({ [`${activeCurrency}`]: prop.acro, convert: false }, () => {
                      this.getRates();
                    });
                  }}
                >
                  <Text
                    style={{
                      color: '#00FF7B',
                      fontSize: 18,
                      fontFamily: 'SpaceMono-Regular'
                    }}
                  >
                    {prop.acro}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    height: Metrics.screenHeight * 0.07,
                    width: Metrics.screenWidth * 0.2,
                    borderRadius: Metrics.screenHeight * 0.08,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => {
                    this.setState({ [`${activeCurrency}`]: prop.acro, convert: false }, () => {
                      this.getRates();
                    });
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontFamily: 'SpaceMono-Regular'
                    }}
                  >
                    {prop.acro}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>
            Date: {this.state.date} | {this.state.time} UTC
          </Text>
        </View>
      </View>
    );
  }
}
