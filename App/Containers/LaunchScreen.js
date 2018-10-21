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
  Easing,
  NativeModules
} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import styles from './Styles/LaunchScreenStyles';
import { Metrics, Colors } from '../Themes';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base: 'eur',
      target: 'usd',
      convert: false,
      text: '',
      gridRates: {},
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
    this.keyboardDidHide = this.keyboardDidHide.bind(this);

    this.activeAnim = new Animated.Value(0);
    this.menuAnim = new Animated.Value(0);
  }

  componentDidMount() {
    axios.get(`http://www.floatrates.com/daily/${this.state.base}.json`).then(response => {
      console.log(response.data);
      this.setState({ rates: response.data, feedRates: response.data });
      this.tickerRef.startAnimation();
    });
    axios.get('http://www.floatrates.com/daily/cve.json').then(response => {
      this.setState({ gridRates: response.data });
      console.log(response.data);
    });
    this.interval = setInterval(
      () =>
        this.setState({
          time: new Date().toLocaleTimeString().replace('/.*(d{2}:d{2}:d{2}).*/', '$1')
        }),
      1000
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.keyboardDidHideListener.remove();
  }

  onChange(value) {
    this.textInput.setNativeProps({ text: value });
    this.setState({ text: value });
  }

  getRates() {
    axios.get(`http://www.floatrates.com/daily/${this.state.base}.json`).then(response => {
      this.setState({ rates: response.data, convert: true });
    });
  }

  keyboardDidHide() {
    NativeModules.NavigationBarAndroid.hide();
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

    /*     const drop = this.menuAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
      extrapolate: 'clamp'
    }); */

    return (
      <View style={styles.background}>
        <StatusBar translucent hidden />
        <TouchableOpacity
          activeOpacity={1}
          style={styles.menuBox}
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
          style={[
            styles.greenIcon,
            {
              transform: [{ translateY }]
            }
          ]}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.switchBox}
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
          duration={300000}
          marqueeOnMount={false}
          loop
          repeatSpacer={0}
        >
          {showFeed
            ? Object.keys(this.state.feedRates).map(key => {
                return `${'EUR'}-${key.toUpperCase()} ${parseFloat(
                  this.state.feedRates[key].rate
                ).toFixed(4)}  |  `;
              })
            : ' '}
        </TextTicker>
        <View style={styles.conversionBox}>
          <View style={styles.baseBox}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.baseTextBox}
              onPress={() => {
                this.animate(false);
              }}
            >
              <Text style={styles.baseText}>{this.state.base.toUpperCase()}</Text>
            </TouchableOpacity>
            <View style={styles.baseInputBox}>
              <TextInput
                ref={component => (this.textInput = component)}
                maxLength={textLength}
                keyboardType="numeric"
                placeholder="Enter Value"
                multiline
                placeholderTextColor={Colors.steel}
                underlineColorAndroid="rgba(255,255,255, 0.0)"
                style={[
                  styles.baseInput,
                  {
                    fontSize: text.length <= 9 ? 16 : 14
                  }
                ]}
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
          <View style={styles.targetBox}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.targetTextBox}
              onPress={() => {
                this.animate(true);
              }}
            >
              <Text style={styles.targetText}>{this.state.target.toUpperCase()}</Text>
            </TouchableOpacity>
            <View style={styles.targetResultBox}>
              <Text
                style={[
                  styles.targetResult,
                  {
                    fontSize: text.length <= 12 ? 16 : 14
                  }
                ]}
              >
                {convert
                  ? (
                      Math.round(
                        rates[target].rate *
                          Number(text.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1')) *
                          100
                      ) / 100
                    ).toLocaleString('en')
                  : '...'}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.convertBox}
          onPress={() => {
            this.getRates();
          }}
        >
          <Text style={styles.convertText}>Get</Text>
        </TouchableOpacity>
        <ScrollView overScrollMode="never" style={styles.currBox}>
          <View style={styles.currContainer}>
            {Object.keys(this.state.gridRates).map((key, index) => {
              console.log(key);
              return index <= 3 ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.currTextBox}
                  onPress={() => {
                    this.setState({ [`${activeCurrency}`]: key, convert: false });
                  }}
                >
                  <Text style={styles.currText}>{key.toUpperCase()}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.currTextBox}
                  onPress={() => {
                    this.setState({ [`${activeCurrency}`]: key, convert: false }, () => {
                      // this.getRates();
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.currText,
                      {
                        color: 'white'
                      }
                    ]}
                  >
                    {key.toUpperCase()}
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
