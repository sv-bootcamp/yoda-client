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
import ErrorMeta from '../../utils/ErrorMeta';
import LinearGradient from 'react-native-linear-gradient';
import LoginUtil from '../../utils/LoginUtil';
import ServerUtil from '../../utils/ServerUtil';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password1: '',
      password2: '',
    };

    LoginUtil.initCallback(this.onLoginSuccess, this.onServerFail);
  }

  componentWillMount() {
    if (this.props.session === undefined) {
      LoginUtil.hasToken();
    }
  }

  onLoginSuccess(result) {
    if (result === undefined) {
      Actions.login();
    } else {
      Actions.generalInfo();
    }
  }

  onServerFail(error) {
    if (error.code !== ErrorMeta.ERR_NONE) {
      alert(error.msg);
    }
  }

  render() {
    let onChangeEmail = (text) => { this.state.email = text; };
    let onChangePassword1 = (text) => { this.state.password1 = text; };
    let onChangePassword2 = (text) => { this.state.password2 = text; };
    let createAccount = () => this.createAccount();

    return (

      //  Render the screen on View.
      <View style={styles.container}>
        <View style={styles.mainLogo}>
          <Image source={require('../../resources/splash_icon_1x.png')} />
        </View>

        {/* Render facebook login button */}
        <TouchableWithoutFeedback onPress={LoginUtil.signInWithFacebook}>
          <View style={styles.facebookLoginContainer}>
            <Image style={styles.facebookLoginButton}
                   source={require('../../resources/fb.png')} />
            <Text style={styles.facebookLoginText}>Login with Facebook</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.hrContainer}>
          <View style={styles.hr}></View>
          <View><Text style={styles.hrText}>or</Text></View>
          <View style={styles.hr}></View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
                     ref="1"
                     returnKeyType="next"
                     placeholder="Email"
                     placeholderTextColor="#d8d8d8"
                     underlineColorAndroid="#efeff2"
                     onChangeText={onChangeEmail}
                     onSubmitEditing={() => this.focusNextField('2')} />
          <TextInput style={styles.input}
                     ref="2"
                     placeholder="Password"
                     secureTextEntry={true}
                     returnKeyType="next"
                     placeholderTextColor="#d8d8d8"
                     underlineColorAndroid="#efeff2"
                     onChangeText={onChangePassword1}
                     onSubmitEditing={() => this.focusNextField('3')} />
          <TextInput style={styles.input}
                     ref="3"
                     placeholder="Confirm password"
                     secureTextEntry={true}
                     placeholderTextColor="#d8d8d8"
                     underlineColorAndroid="#efeff2"
                     onChangeText={onChangePassword2} />
        </View>


        <TouchableWithoutFeedback onPress={createAccount}>
          <LinearGradient
            colors={['#44acff', '#07e4dd']}
            start={[0.0, 0.0]} end={[1.0, 1.0]}
            style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>CREATE ACCOUNT</Text>
          </LinearGradient>
        </TouchableWithoutFeedback>

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomTextLeft}>Do you have an account? </Text>
          <TouchableWithoutFeedback onPress={() => Actions.login()}>
            <View>
              <Text style={styles.bottomTextRight}>Log in</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  createAccount() {
    let emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailFilter.test(this.state.email) === false) {
      this.alert('Please input your correct email.');
      return;
    }

    if (this.state.password1 === '') {
      this.alert('Please input your password.');
      return;
    }

    if (this.state.password2 === '') {
      this.alert('Please input your password for comparison.');
      return;
    }

    if (this.state.password1 != this.state.password2) {
      this.alert('Please input your password correctly');
      return;
    }

    ServerUtil.initCallback(this.onServerSuccess, this.onServerFail);
    ServerUtil.createAccount(this.state.email, this.state.password1);
  }

  onServerSuccess(result) {
    alert(JSON.stringify(result));
  }

  focusNextField(refNo) {
    this.refs[refNo].focus();
  }

  alert(msg) {
    Alert.alert('Sign In', msg);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mainLogo: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookLoginContainer: {
    flexDirection: 'row',
    marginTop: 67,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookLoginButton: {
    width: 15,
    height: 15,
  },
  facebookLoginText: {
    marginLeft: 20,
    fontSize: 15,
    color: '#4460a0',
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
  subTextContainer: {
    marginTop: 10,
  },
  subText: {
    fontSize: 12,
    color: '#44acff',
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTextLeft: {
    fontSize: 12,
    color: '#a6aeae',
  },
  bottomTextRight: {
    fontSize: 12,
    color: '#44acff',
  },
});

module.exports = Login;
