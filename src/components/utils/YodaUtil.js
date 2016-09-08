import { AsyncStorage } from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import ErrorMeta from './ErrorMeta';
import UrlMeta from './UrlMeta';
import LoginMeta from './LoginMeta';

class YodaUtil {

  constructor() {
    successCallback = null;
    errorCallback = null;
  }

  // Set two callbacks to get result
  initCallback(success, error) {
    this.successCallback = success;
    this.errorCallback = error;
  }

  // Check token
  hasToken() {
    AsyncStorage.getItem('token', (err, result) => {
      if (result === null) {
        this.onError(ErrorMeta.ERR_NONE);
      } else {
        this.successCallback();
      }
    });
  }

  // Error messages
  onError(errCode) {
    let result = { code: errCode };

    if (errCode === ErrorMeta.ERR_NONE) {
      result.msg = '';
    } else if (errCode === ErrorMeta.ERR_TOKEN_INVALID) {
      result.msg = 'Token has been expired. Try again';
    } else if (errCode === ErrorMeta.ERR_NO_LOGIN_TYPE) {
      result.msg = 'Login again';
    } else if (errCode === ErrorMeta.ERR_SERVER_FAIL) {
      result.msg = 'Server error. Try again';
    }

    this.errorCallback(result);
  }

  // Get all user lists for testing. Won't be used later
  getAllList() {
    this.requestToServer('GET', UrlMeta.API_ALL, '');
  }

  // Get user lists except me
  getMentorList() {
    this.requestToServer('GET', UrlMeta.API_MENTOR, '');
  }

  // Get my profile
  getMyProfile() {
    this.requestToServer('GET', UrlMeta.API_ME, '');
  }

  // Get other user's profile
  getOthersProfile(userid) {
    this.requestToServer('GET', UrlMeta.API_ME, userid);
  }

  // Get activity list(request, received)
  getActivityList() {
    this.requestToServer('GET', UrlMeta.API_ACTIVITY, '');
  }

  // Request to mentor
  sendMentoringRequest(montorId, content) {
    let paramList = [mentorId, content];
    this.requestToServer('POST', UrlMeta.API_MENTOR_REQ, paramList);
  }

  // Accept request
  acceptRequest(montorId) {
    let paramList = [mentorId, 1];
    this.requestToServer('POST', UrlMeta.API_MENTOR_RESP, paramList);
  }

  // Reject request
  rejectRequest(montorId) {
    let paramList = [mentorId, 0];
    this.requestToServer('POST', UrlMeta.API_MENTOR_RESP, paramList);
  }

  // Request to server
  requestToServer(method, apiType, urlEtc, paramList) {
    AsyncStorage.multiGet(['loginType', 'token'], (err, stores) => {
      let type = stores[0][1];
      let token = stores[1][1];

      if (token === null || token === undefined || token === '') {
        this.onError(ErrorMeta.ERR_NO_LOGIN_TYPE);
        return;
      }

      if (type == LoginMeta.LOGIN_TYPE_FB || type == LoginMeta.LOGIN_TYPE_LI) {
        let url = UrlMeta.host + apiType + urlEtc;
        let formBody = this.makeFormBody(method, token, apiType, paramList);
        this.fetchData(url, method, formBody);
      } else {
        this.onError(ErrorMeta.ERR_NO_LOGIN_TYPE);
      }
    });
  }

  makeFormBody(httpMethod, token, apiType, paramList) {
    let formBody = 'access_token=' + token;

    if (apiType === UrlMeta.API_MENTOR_REQ) {
      formBody += '&metor_id=' + paramList[0];
      formBody += '&content=' + paramList[1];
    } else if (apiType === UrlMeta.API_MENTOR_RESP) {
      formBody += '&metor_id=' + paramList[0];
      formBody += '&option=' + paramList[1];
    }

    if (httpMethod == 'GET') {
      return '?' + formBody;
    } else {
      return formBody;
    }
  }

  fetchData(url, httpMethod, formBody) {
    let reqSet = this.getReqSet(httpMethod, formBody);
    if (httpMethod == 'GET') {
      url += formBody;
    }

    fetch(url, reqSet)
    .then((response) => response.json())
    .then((result) => {
      if (result.successCode === 0) {
        this.onError(ErrorMeta.ERR_TOKEN_INVALID);
      } else {
        this.successCallback(result);
      }
    })
    .catch((error) => {
      this.onError(ErrorMeta.ERR_SERVER_FAIL);
    });
  }

  getReqSet(httpMethod, formBody) {
    let reqSet = {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    if (httpMethod == 'PUT') {
      reqSet.body = formBody;
    }

    return reqSet;
  }
}

const yodaUtil = new YodaUtil();
module.exports = yodaUtil;
