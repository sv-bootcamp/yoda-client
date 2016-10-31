import React, { Component } from 'react';
import {
 Alert,
 Image,
 StyleSheet,
 Text,
 TextInput,
 TouchableWithoutFeedback,
 TouchableHighlight,
 View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ErrorMeta from '../utils/ErrorMeta';
import LinearGradient from 'react-native-linear-gradient';
import LoginUtil from '../utils/LoginUtil';

class Login extends Component {

  constructor(props) {
    super(props);
    LoginUtil.initCallback(this.onLoginSuccess, this.onLoginFail);
  }

  componentWillMount() {
    if (this.props.session === undefined) {
      LoginUtil.hasToken();
    }
  }

  render() {
    return (

      //  Render the screen on View.
      <View style={styles.container}>
        <View style={styles.mainLogo}>
          <Image source={require('../resources/splash_icon_1x.png')} />
        </View>

        {/* Render facebook login button */}
        <TouchableWithoutFeedback onPress={LoginUtil.signInWithFacebook}>
          <Image style={styles.facebookLoginButton}
                 source={require('../resources/login-fb.png')} />
        </TouchableWithoutFeedback>

        <View style={styles.hrContainer}>
          <View style={styles.hr}></View>
          <View><Text style={styles.hrText}>or</Text></View>
          <View style={styles.hr}></View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
                     placeholder="Email"
                     placeholderTextColor="#d8d8d8"
                     underlineColorAndroid="#F5FCFF" />
          <TextInput style={styles.input}
                     placeholder="Password"
                     placeholderTextColor="#d8d8d8"
                     underlineColorAndroid="#F5FCFF" />
        </View>


        <TouchableWithoutFeedback onPress={() => this.regist()}>
          <LinearGradient
            colors={['#44acff', '#07e4dd']}
            start={[0.0, 0.0]} end={[1.0, 1.0]}
            style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>LOG IN</Text>
          </LinearGradient>
        </TouchableWithoutFeedback>

        <Text style={styles.subText}>Forgot password?</Text>
      </View>
    );
  }

  onLoginSuccess(result) {
    if (result === undefined) {
      Actions.login();
    } else {
      Actions.generalInfo();
    }
  }

  onLoginFail(error) {
    if (error.code !== ErrorMeta.ERR_NONE) {
      alert(error.msg);
    }
  }

  // Token already exists on the server
  onServerSuccess(result) {
    if (result === undefined) {
      Actions.login();
    } else {
      Actions.main();
    }
  }

  onServerFail(error) {
    if (error.code !== ErrorMeta.ERR_NONE) {
      alert(JSON.stringify(error.msg));
    }

    Actions.login();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mainLogo: {
    marginTop: 144.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookLoginButton: {
    marginTop: 67,
    width: 240,
  },
  hrContainer: {
    flexDirection: 'row',
    width: 175,
    marginTop: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hr: {
    flex: 1,
    width: 106,
    height: 1,
    backgroundColor: '#efeff2',
  },
  hrText: {
    marginLeft: 14,
    marginRight: 14,
    color: '#d8d8d8',
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  input: {
    width: 251,
    height: 45,
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#efeff2',
  },
  loginBtn: {
    width: 240,
    height: 45,
    borderRadius: 100,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    marginTop: 10,
    fontSize: 12,
    color: '#44acff',
  },
});

module.exports = Login;
