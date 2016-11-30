import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

class Intro extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.intro}
          sorce={require('../resources/splash_anim.gif')} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  intro: {
    width: 100,
  },
});

module.exports = Intro;
