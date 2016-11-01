import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import FindPassword from './FindPassword';

class FindPassStep3 extends Component {
  render() {
    return (
      <FindPassword title="Reset your password"
                    inputHint="New password"
                    inputHint2="Confirm password"
                    isFinal={true}
                    onPress={() => alert('save')} />
    );
  }
}

module.exports = FindPassStep3;
