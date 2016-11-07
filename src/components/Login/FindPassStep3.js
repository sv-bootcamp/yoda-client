import React, { Component } from 'react';
import { Alert, Text, TouchableWithoutFeedback, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ErrorMeta from '../../utils/ErrorMeta';
import FindPassword from './FindPassword';
import ServerUtil from '../../utils/ServerUtil';

class FindPassStep3 extends Component {
  constructor(props) {
    super(props);

    ServerUtil.initCallback(this.onServerSuccess, this.onServerFail);

    this.state = {
      password1: '',
      password2: '',
    };
  }

  render() {
    let onChangeText1 = (text) => { this.state.password1 = text; };
    let onChangeText2 = (text) => { this.state.password2 = text; };
    let resetPassword = () => this.resetPassword();

    console.log(Actions);
    return (
      <FindPassword title="Reset your password"
                    inputHint="New password"
                    inputHint2="Confirm password"
                    isFinal={true}
                    onChangeText={onChangeText1}
                    onChangeText2={onChangeText2}
                    onPress={resetPassword} />
    );
  }

  componentDidMount() {
    Actions.refresh({
      rightTitle: 'Save',
      onRight: () => this.resetPassword(),
    });
  }

  resetPassword() {
    if (this.state.password1 === '') {
      this.alert('Please input your password.');
    } else if (this.state.password2 === '') {
      this.alert('Please input your password for comparison.');
    } else if (this.state.password1 != this.state.password2) {
      this.alert('Please input your password correctly');
    } else {
      ServerUtil.resetPassword(this.props.email, this.state.password1);
    }
  }

  onServerSuccess(result) {
    alert(JSON.stringify(result));
  }

  onServerFail(error) {
    if (error.code !== ErrorMeta.ERR_NONE) {
      alert(error.msg);
    }
  }

  alert(msg) {
    Alert.alert('Forgot password', msg);
  }
}

module.exports = FindPassStep3;
