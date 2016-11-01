import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import FindPassword from './FindPassword';

class FindPassStep1 extends Component {
  render() {
    return (
      <FindPassword title="Please input your email address"
                    inputHint="Email"
                    buttonText="Send Code"
                    isFinal={false}
                    onPress={() => Actions.findPassStep2()} />
    );
  }
}

module.exports = FindPassStep1;
