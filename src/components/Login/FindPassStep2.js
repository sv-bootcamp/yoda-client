import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import FindPassword from './FindPassword';

class FindPassStep2 extends Component {
  render() {
    return (
      <FindPassword title="Please input your code"
                    inputHint="Code"
                    buttonText="Find password"
                    isFinal={false}
                    onPress={() => Actions.findPassStep3()} />
    );
  }
}

module.exports = FindPassStep2;
