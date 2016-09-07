import {
 DeviceEventEmitter,
 Alert,
 AsyncStorage,
} from 'react-native';

import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

import LinkedInLogin from './linkedin-login';
import YodaMeta from './YodaMeta';

class LoginUtil {

  constructor() {
    this.successCallback = null;
    this.errorCallback = null;
  }

  // Initialize callback to get result
  initCallback(success, error) {
    this.successCallback = success;
    this.errorCallback = error;
  }

  // Register info data to use LinkedIn SDK
  initLinkedIn() {
    LinkedInLogin.init(
      YodaMeta.redirectUrl,
      YodaMeta.clientId,
      YodaMeta.clientSecret,
      YodaMeta.state,
      YodaMeta.scopes);
  }

  // Register listeners to use LinkedIn SDK Login, LoginError
  initEvent() {
    DeviceEventEmitter.addListener(
      'linkedinLogin',
      this.onLoginSuccessLI
    );

    DeviceEventEmitter.addListener(
      'linkedinLoginError',
      this.onLoginErrorLI
    );
  }

  //Error codes
  onError(errCode) {
    let result = { code: errCode };
    if (errCode === YodaMeta.ERR_NONE) {
      result.msg = '';
    } else if (errCode === YodaMeta.ERR_FB_LOGIN) {
      result.msg = 'Login error from Linkedin';
    } else if (errCode === YodaMeta.ERR_LI_LOGIN) {
      result.msg = 'Login error from Facebook';
    } else if (errCode === YodaMeta.ERR_TOKEN_INVALID) {
      result.msg = 'Your token has been expired.';
    } else if (errCode === YodaMeta.ERR_NO_USER_DATA) {
      result.msg = 'Cannot fetch user data';
    } else if (errCode === YodaMeta.ERR_APP_FAIL) {
      result.msg = 'Error has occured from web';
    } else if (errCode === YodaMeta.ERR_SERVER_FAIL) {
      result.msg = 'Server error. Try again';
    }

    this.errorCallback(result);
  }

  // Sign In with Facebook.
  signInWithFacebook() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then(
      loginUtil.onLoginSuccessFB,
      loginUtil.onLoginErrorFB
    );
  }

  onLoginSuccessFB(result) {
    if (result.isCancelled) {
      loginUtil.onError(YodaMeta.ERR_FB_LOGIN);
    } else {
      AccessToken.getCurrentAccessToken()
      .then((data) => {
        AsyncStorage.setItem('loginType', YodaMeta.LOGIN_TYPE_FB);
        loginUtil.fetchData(YodaMeta.LOGIN_TYPE_FB, data.accessToken.toString());
      })
      .catch((error) => {
        loginUtil.onError(YodaMeta.ERR_APP_FAIL);
      });
    }
  }

  onLoginErrorFB(error) {
    loginUtil.onError(YodaMeta.ERR_FB_LOGIN);
  }

  //Sign In with LinkedIn.
  signInWithLinkedIn() {
    LinkedInLogin.login();
  }

  onLoginSuccessLI(result) {
    AsyncStorage.setItem('loginType', YodaMeta.LOGIN_TYPE_LI);
    loginUtil.fetchData(YodaMeta.LOGIN_TYPE_LI, result.accessToken);
  }

  onLoginErrorLI(error) {
    loginUtil.onError(YodaMeta.ERR_LI_LOGIN);
  }

  fetchData(type, token) {
    let formBody = this.makeFormBody(type, token);
    AsyncStorage.setItem('token', token);

    fetch(YodaMeta.host + YodaMeta.API_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.successCode === 1) {
        this.successCallback(result);
      } else {
        this.onError(YodaMeta.ERR_TOKEN_INVALID);
      }
    }).catch((error) => {
      this.onError(YodaMeta.ERR_SERVER_FAIL);
    });
  }

  makeFormBody(type, token) {
    let formBody = 'platform_type=' + type;
    formBody += '&access_token=' + token;
    return formBody;
  }
}

const loginUtil = new LoginUtil();

module.exports = loginUtil;
