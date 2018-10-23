import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  //ScrollView,
  FlatList,
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
      base: 'EUR',
      target: 'USD',
      expanded: true,
      text2: '',
      convert: false,
      text: '',
      rotateDone: true,
      iconName: 'view-grid',
      gridRates: [],
      gridRates2: [],
      openMenu: false,
      active: 'base',
      list: false,
      showFeed: true,
      textLength: 13,
      date: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-'),
      time: new Date().toLocaleTimeString().replace('/.*(d{2}:d{2}:d{2}).*/', '$1'),
      rates: [],
      feedRates: []
    };

    this.getRates = this.getRates.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeS = this.onChangeS.bind(this);
    this.animate = this.animate.bind(this);
    this.animateMenu = this.animateMenu.bind(this);
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.searchCurrencies = this.searchCurrencies.bind(this);

    this.activeAnim = new Animated.Value(0);
    this.menuAnim = new Animated.Value(0);
  }

  componentDidMount() {
    axios
      .all([
        axios.get(`http://www.floatrates.com/daily/${this.state.base}.json`),
        axios.get('http://www.floatrates.com/daily/cve.json')
      ])
      .then(
        axios.spread((response1, response2) => {
          this.setState({
            rates: Object.values(response1.data),
            feedRates: Object.values(response1.data),
            gridRates: Object.values(response2.data),
            gridRates2: Object.values(response2.data)
          });
          this.tickerRef.startAnimation();
        })
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

  onChangeS(value) {
    this.textInput.setNativeProps({ text2: value });
    this.setState({ text2: value });
  }

  getRates() {
    const obj = [{ code: this.state[this.state.active], rate: 1 }];
    axios.get(`http://www.floatrates.com/daily/${this.state.base}.json`).then(response => {
      const rates = Object.values(response.data);
      Array.prototype.push.apply(rates, obj);
      this.setState({ rates, convert: true });
    });
  }

  searchCurrencies() {
    const { gridRates, text2 } = this.state;
    const result = gridRates.filter(
      prop => prop.name.includes(text2) || prop.code.includes(text2.toUpperCase())
    );
    this.setState({ gridRates: result });
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
      this.setState({ openMenu: !this.state.openMenu, list: !this.state.list, rotateDone: true });
    });
  }

  keyExtractor(item) {
    return item.code;
  }

  renderItem(item) {
    return (
      <View style={styles.currContainer}>
        {item.index <= 3 ? (
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.currTextBox,
              this.state.list
                ? {
                    height: Metrics.screenHeight * 0.07,
                    width: Metrics.screenWidth * 0.9,
                    borderRadius: 0
                  }
                : null
            ]}
            onPress={() => {
              this.setState({ [`${this.state.active}`]: item.item.code, convert: false }, () => {
                this.getRates();
              });
            }}
          >
            {this.state.list ? (
              <View
                style={{
                  height: Metrics.screenHeight * 0.07,
                  width: Metrics.screenWidth * 0.9,
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexDirection: 'row'
                }}
              >
                <Text style={styles.currText}>{item.item.name}</Text>
                <Text style={styles.currText}>{item.item.code}</Text>
              </View>
            ) : (
              <Text style={styles.currText}>{item.item.code}</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.currTextBox,
              this.state.list
                ? {
                    height: Metrics.screenHeight * 0.07,
                    width: Metrics.screenWidth * 0.9,
                    borderRadius: 0
                  }
                : null
            ]}
            onPress={() => {
              this.setState({ [`${this.state.active}`]: item.item.code, convert: false }, () => {
                this.getRates();
              });
            }}
          >
            {this.state.list ? (
              <View
                style={{
                  height: Metrics.screenHeight * 0.07,
                  width: Metrics.screenWidth * 0.9,
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexDirection: 'row'
                }}
              >
                <Text style={[styles.currText, { color: 'white' }]}>
                  {item.item.name === 'Bosnia and Herzegovina convertible mark'
                    ? 'Bosnia and Herzegovina'
                    : item.item.name}
                </Text>
                <Text style={[styles.currText, { color: 'white' }]}>{item.item.code}</Text>
              </View>
            ) : (
              <Text style={[styles.currText, { color: 'white' }]}>{item.item.code}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }

  render() {
    const { base, target, rates, convert, text, textLength, showFeed } = this.state;

    const translateY = this.activeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [Metrics.screenHeight * 0.259, Metrics.screenHeight * 0.385],
      extrapolate: 'clamp'
    });

    const flip = this.menuAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '0deg'],
      extrapolate: 'clamp'
    });

    /*     const drop = this.menuAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
      extrapolate: 'clamp'
    }); */

    return (
      <View style={styles.background}>
        <StatusBar hidden />
        <TouchableOpacity
          activeOpacity={1}
          style={styles.menuBox}
          onPress={
            this.state.rotateDone
              ? () => {
                  this.animateMenu(!this.state.openMenu);
                  this.setState({
                    iconName: this.state.iconName === 'view-grid' ? 'view-stream' : 'view-grid',
                    rotateDone: false
                  });
                }
              : null
          }
        >
          <AnimatedIcon
            name={this.state.iconName}
            size={25}
            color="white"
            style={{ elevation: 5, transform: [{ rotate: flip }] }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.menuBox, { right: 0 }]}
          onPress={() => {}}
        >
          <AnimatedIcon name="settings" size={25} color="white" style={{ elevation: 5 }} />
        </TouchableOpacity>
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
            ? this.state.feedRates.map(prop => {
                return `${'EUR'}-${prop.code} ${parseFloat(prop.rate).toFixed(4)}  |  `;
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
              <Text style={styles.baseText}>{this.state.base}</Text>
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
              <Text style={styles.targetText}>{this.state.target}</Text>
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
                      rates[rates.findIndex(x => x.code === this.state.target)].rate *
                      Number(text.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'))
                    ).toLocaleString('en', { minimumFractionDigits: 5 })
                  : '...'}
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          data={this.state.gridRates}
          extraData={this.state.gridRates}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          key={this.state.list}
          numColumns={this.state.list ? 1 : 5}
          overScrollMode="never"
          indicatorStyle="white"
          initialNumToRender={25}
          style={styles.currBox}
        />
        <View
          style={[
            styles.searchButton,
            { width: this.state.list ? '92%' : '82%', left: this.state.list ? '4%' : '9%' }
          ]}
          activeOpacity={1}
        >
          <Icon name="magnify" size={22} color="black" />
          <TextInput
            maxLength={50}
            placeholder="Search Currencies"
            underlineColorAndroid="rgba(255,255,255, 0.0)"
            style={styles.textInput}
            onChangeText={value => this.onChangeS(value)}
            onSubmitEditing={() => {
              this.setState({ gridRates: this.state.gridRates2 }, () => {
                this.searchCurrencies();
              });
            }}
          />
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>
            Date: {this.state.date} | {this.state.time} GMT
          </Text>
        </View>
      </View>
    );
  }
}
