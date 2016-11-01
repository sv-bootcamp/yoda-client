import React, { Component } from 'react';
import {
 Alert,
 StyleSheet,
 Text,
 TextInput,
 TouchableWithoutFeedback,
 View,
} from 'react-native';

class FindPassStep1 extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      //  Render the screen on View.
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
                     placeholder={this.props.inputHint}
                     placeholderTextColor="#d8d8d8"
                     underlineColorAndroid="#efeff2" />
        </View>
        {this.props.isFinal ? this.renderInput() : this.renderButton()}
      </View>
    );
  }

  renderButton() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{this.props.buttonText}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderInput() {
    return (
      <View style={styles.inputContainer2}>
        <TextInput style={styles.input}
                   placeholder={this.props.inputHint2}
                   placeholderTextColor="#d8d8d8"
                   underlineColorAndroid="#efeff2" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleContainer: {
    marginTop: 101,
  },
  title: {
    color: '#2e3031',
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 161,
  },
  input: {
    width: 251,
    marginLeft: 18,
    marginRight: 18,
  },
  inputContainer2: {
    marginTop: 30,
  },
  buttonContainer: {
    marginTop: 40,
  },
  button: {
    width: 240,
    height: 45,
    borderWidth: 1,
    borderColor: '#44acff',
    borderRadius: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#44acff',
    fontSize: 16,
  },
});

module.exports = FindPassStep1;
