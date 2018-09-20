import React, { Component } from 'react';
import { Text, View, StatusBar, ScrollView } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import axios from 'axios';

// Styles
import styles from './Styles/LaunchScreenStyles';
import { Metrics } from '../Themes';

const currencies = [
  {
    name: 'US Dollar',
    acro: 'USD'
  },
  {
    name: 'Pound Sterling',
    acro: 'GBP'
  },
  {
    name: 'Euro',
    acro: 'EUR'
  },
  {
    name: 'Japanese Yen',
    acro: 'JPY'
  },
  {
    name: 'Bulgarian Lev',
    acro: 'BGN'
  },
  {
    name: 'Czech Koruna',
    acro: 'CZK'
  },
  {
    name: 'Danish Krone',
    acro: 'DKK'
  },
  {
    name: 'Hungarian Forint',
    acro: 'HUF'
  },
  {
    name: 'Polish Zloty',
    acro: 'PLN'
  },
  {
    name: 'Romanian Leu',
    acro: 'RON'
  },
  {
    name: '	Swedish Krona',
    acro: 'SEK'
  },
  {
    name: 'Swiss Franc',
    acro: 'CHF'
  },
  {
    name: 'Icelandic Krona',
    acro: 'ISK'
  },
  {
    name: 'Norwegian Krone',
    acro: 'NOK'
  },
  {
    name: '	Croatian Kunar',
    acro: 'HRK'
  },
  {
    name: 'Russian Rouble',
    acro: 'RUB'
  },
  {
    name: 'Turkish Lira',
    acro: 'TRY'
  },
  {
    name: 'Australian Dollar',
    acro: 'AUD'
  },
  {
    name: 'Brazilian Real',
    acro: 'BRL'
  },
  {
    name: 'Canadian Dollar',
    acro: 'CAD'
  },
  {
    name: 'Chinese yuan Renminbi',
    acro: 'CNY'
  },
  {
    name: 'Hong Kong Dollar',
    acro: 'HKD'
  },
  {
    name: 'Indonesian Rupiah',
    acro: 'IDR'
  },
  {
    name: 'Israeli Shekel',
    acro: 'ILS'
  },
  {
    name: 'Indian Rupee',
    acro: 'INR'
  },
  {
    name: 'South Korean Won',
    acro: 'KRW'
  },
  {
    name: 'Mexican Peso',
    acro: 'MXN'
  },
  {
    name: 'Malaysian Ringgit',
    acro: 'MYR'
  },
  {
    name: 'New Zealand Dollar',
    acro: 'NZD'
  },
  {
    name: 'Philippine Piso',
    acro: 'PHP'
  },
  {
    name: 'Singapore Dollar',
    acro: 'SGD'
  },
  {
    name: 'Thai Baht',
    acro: 'THB'
  },
  {
    name: 'South African Rand',
    acro: 'ZAR'
  }
];

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base: 'EUR',
      target: 'USD',
      date: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-'),
      time: new Date().toLocaleTimeString().replace('/.*(d{2}:d{2}:d{2}).*/', '$1'),
      rates: {}
    };
  }

  componentDidMount() {
    axios.get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`).then(response => {
      this.setState({ rates: response.data.rates });
    });
    this.interval = setInterval(
      () =>
        this.setState({
          time: new Date().toLocaleTimeString().replace('/.*(d{2}:d{2}:d{2}).*/', '$1')
        }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <View style={styles.background}>
        <StatusBar translucent hidden />
        <Text style={styles.titleText}>Kōkan Rates</Text>
        <TextTicker ref="feed" style={styles.scrollText} duration={60000} loop repeatSpacer={0}>
          {Object.keys(this.state.rates).map(key => {
            return `${this.state.base}-${key} ${this.state.rates[key]}  |  `;
          })}
        </TextTicker>
        <ScrollView
          style={{
            height: Metrics.screenHeight * 0.2,
            width: Metrics.screenWidth,
            marginTop: Metrics.screenHeight * 0.3
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
                <Text
                  style={{
                    color: '#00FF7B',
                    fontSize: 18,
                    fontFamily: 'SpaceMono-Regular',
                    paddingBottom: 15,
                    paddingTop: 5,
                    paddingLeft: 20,
                    paddingRight: 20
                  }}
                >
                  {prop.acro}
                </Text>
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'SpaceMono-Regular',
                    paddingBottom: 15,
                    paddingTop: 5,
                    paddingLeft: 20,
                    paddingRight: 20
                  }}
                >
                  {prop.acro}
                </Text>
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
