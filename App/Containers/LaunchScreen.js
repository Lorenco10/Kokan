import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard
} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import currencies from './currencies';

// Styles
import styles from './Styles/LaunchScreenStyles';
import { Metrics, Colors } from '../Themes';

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base: 'EUR',
      target: 'USD',
      convert: false,
      text: '',
      showFeed: true,
      textLength: 13,
      date: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-'),
      time: new Date().toLocaleTimeString().replace('/.*(d{2}:d{2}:d{2}).*/', '$1'),
      rates: {}
    };

    this.getRates = this.getRates.bind(this);
  }

  componentDidMount() {
    axios.get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`).then(response => {
      this.setState({ rates: response.data.rates });
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

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRates() {
    axios.get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`).then(response => {
      this.setState({ rates: response.data.rates, showFeed: true });
    });
  }

  render() {
    const { base, target, rates, convert, text, textLength, showFeed } = this.state;
    return (
      <View style={styles.background}>
        <StatusBar translucent hidden />
        <Text style={styles.titleText}>Kōkan Rates</Text>
        <TextTicker
          ref={ref => (this.tickerRef = ref)}
          style={styles.scrollText}
          duration={100000}
          marqueeOnMount={false}
          loop
          repeatSpacer={0}
        >
          {showFeed
            ? Object.keys(this.state.rates).map(key => {
                return `${this.state.base}-${key} ${this.state.rates[key]}  |  `;
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
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                fontFamily: 'SpaceMono-Regular'
              }}
            >
              {this.state.base}
            </Text>
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
                onChangeText={value =>
                  this.setState({
                    text: value
                  })
                }
                value={text}
                onFocus={() => {
                  this.setState({
                    convert: false,
                    textLength: 13,
                    text: text.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1')
                  });
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  this.setState({
                    convert: text !== '',
                    textLength: 17,
                    text: text !== '' ? parseFloat(text).toLocaleString('en') : ''
                  });
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
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                fontFamily: 'SpaceMono-Regular'
              }}
            >
              {this.state.target}
            </Text>
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
                    this.setState({ base: prop.acro, showFeed: false }, () => {
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
                    this.setState({ base: prop.acro, showFeed: false }, () => {
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
