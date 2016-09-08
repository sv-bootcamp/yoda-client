
import React, { Component } from 'react';
import {
 StyleSheet,
 Text,
 View,
 Navigator,
 Image,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';

import ErrorMeta from './utils/ErrorMeta';
import YodaUtil from './utils/YodaUtil';

class SplashPage extends Component {

  constructor(props) {
    super(props);

    YodaUtil.initCallback(
    (result) => this.onServerSuccess(result),
    (error) => this.onServerFail(error)
  );
  }

  componentWillMount() {

    // Delay 1sec for next screen
    setTimeout(() => {
        YodaUtil.hasToken();
      }, 1000);
  }

  // Token already exists on the server
  onServerSuccess(result) {
    Actions.main();
  }

  // If the token is not validate and has an error
  onServerFail(error) {
    if (error.code !== ErrorMeta.ERR_NONE) {
      alert(JSON.stringify(error.msg));
    }

    Actions.login();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.splashImg}
          source={require('../resources/splash_icon_1x.png')} />
      </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  splashImg: {
    flex: 1,
    resizeMode: 'contain',
  },
});

module.exports = SplashPage;