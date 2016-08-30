
import React, { Component } from 'react';
import {
 StyleSheet,
 Text,
 View,
 Navigator,
 DeviceEventEmitter,
 TouchableHighlight,
 Image,
} from 'react-native';
import {
  LoginButton,
  AccessToken,
} from 'react-native-fbsdk';
import LinkedInLogin from './utils/linkedin-login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.initLinkedIn();
  }

  componentWillMount() {
    var navigator = this.props.navigator;
  }

  // Initialize LinkedIn tokens
  initLinkedIn() {

    // This variable(redirectUrl) can assigned anything. It just need for executing login module.
    let redirectUrl = 'http://localhost';
    let clientId = '78831o5pn1vg4p';
    let clientSecret = 'ioMEK1Qu77xqxKyu';
    let state = 'DCEeFWf45A53qdfKef424';
    let scopes = ['r_basicprofile', 'r_emailaddress', 'rw_company_admin'];
    LinkedInLogin.init(redirectUrl, clientId, clientSecret, state, scopes);
  }

  signinWithLinkedIn() {
    LinkedInLogin.login();
  }

  componentWillMount() {
    this.initEvent();
  }

  // Fetching data from LinkedIn
  initEvent() {
    DeviceEventEmitter.addListener('LinkedInLoginError', (error) => {
      console.log('LinkedInLoginError!');
    });

    DeviceEventEmitter.addListener('linkedinLogin', (data) => {
      LinkedInLogin.setSession(data.accessToken, data.expiresOn);
      LinkedInLogin.getProfile();
    });

    DeviceEventEmitter.addListener('linkedinGetRequest', (resData) => {
      const data = JSON.parse(resData.data);
      if (data.values) {
        console.log(data.values);
        resolve(data.values);
      } else {
        reject('No profile image found');
      }
    });

    DeviceEventEmitter.addListener('linkedinGetRequestError', (error) => {
      console.log('LinkedInGetRequestError!');
    });
  }

  render() {
    console.log('render');
    return (

          //  Render the screen on View.
           <View style={styles.container}>

             {/* Render facebook login button */}
             <LoginButton
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      alert('Login has error: ' + result.error);
                    } else if (result.isCancelled) {
                      alert('Login is cancelled.');
                    } else {
                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          alert(data.accessToken.toString());
                        }
                    );
                    }
                  }
              }
              onLogoutFinished={() => alert('Logout.')}/>

            {/* Render linkedin login buttion */}
            <TouchableHighlight onPress={this.signinWithLinkedIn}>
              <Image
                source={require('../resources/Linkedin_SignIn_btn.png')} />
            </TouchableHighlight>
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
  welcome: {
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Login;
