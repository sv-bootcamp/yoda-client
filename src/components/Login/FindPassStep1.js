import React, { Component } from 'react';
import {
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ErrorMeta from '../../utils/ErrorMeta';
import FindPassword from './FindPassword';
import ServerUtil from '../../utils/ServerUtil';

class FindPassStep1 extends Component {
  constructor(props) {
    super(props);

    ServerUtil.initCallback(this.onSuccess, this.onError);

    this.state = {
      email: '',
    };
  }

  render() {
    let onChangeText = (text) => {
      this.state.email = text;
    };

    let requestSecretCode = () => {
      let emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailFilter.test(this.state.email)) {
        ServerUtil.reqeustSecretCode(this.state.email);
      } else {
        Alert.alert(
          'Sign In',
          'Please input your correct email.',
        );
      }
    };

    return (
      <FindPassword title="Please input your email address"
                    inputHint="Email"
                    buttonText="Send Code"
                    isFinal={false}
                    onChangeText={onChangeText}
                    onPress={requestSecretCode} />
    );
  }

  onSuccess(result) {
    alert(result);
    //Actions.findPassStep2();
  }

  onError(error) {
    if (error.code != ErrorMeta.ERR_NONE) {
      Alert.alert(error.msg);
    }
  }
}

module.exports = FindPassStep1;
