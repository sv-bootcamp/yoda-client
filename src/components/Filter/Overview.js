import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '../../utils/CheckBox';
import LinearGradient from 'react-native-linear-gradient';
import Progress from '../Shared/Progress';
import Text from '../Shared/UniText';
import UserUtil from '../../utils/UserUtil';
import { Actions, Scene, }  from 'react-native-router-flux';
import { Options } from '../SignUp/SignUpMETA';

const window = Dimensions.get('window');

class Overview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: Options,
      checked: [],
      checkedAll: false,
      needRefresh: true,
    };
    for (i = 0; i < this.state.options.length; i++) {
      this.state.checked.push(false);
    }
  }

  // Update checkbox state
  updateCheckBox(answerIdx, optionIdx, isFreeForm, isChecked) {
    this.state.checked[optionIdx] = !this.state.checked[optionIdx];
    this.forceUpdate();
  }

  // Update checkbox state
  selectAllCheckBox(answerIdx, optionIdx, isFreeForm, isChecked) {
    this.state.checkedAll = !this.state.checkedAll;
    for (let i = 0; i < this.state.checked.length; i++)
    this.state.checked[i] = this.state.checkedAll;

    this.forceUpdate();
  }

  getOptionSet() {
    return this.state.options.map(
        (option, idx) => (
            <CheckBox key={idx}
              iconSize={15}
              iconStyle={styles.iconStyle}
              labelStyle={(idx !== this.state.options.length - 1) ?
              styles.labelStyle : styles.labelStyleLast }
              checked={this.state.checked[idx]}
              label={this.state.options[idx]}
              optionIdx={idx}
              onUpdate={this.updateCheckBox.bind(this)}
            />
        )
    );
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text allowFontScaling={false} style={styles.subTitleText}>
            {'Expertise'}
          </Text>
        </View>
        <View style ={styles.body}>
          {this.getOptionSet()}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    padding: 30,
  },
  header: {
    flex: 1,
    marginBottom: 10,
  },
  body: {
    flex: 1,
    borderColor: '#f0f0f2',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 15,
  },
  scrollViewContainer: {
    flex: 1,
  },
  btnContainer: {
    flex: 1,
    zIndex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    height: 45,
    width: 230,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#2e3031',
  },
  subTitleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#a6aeae',
  },
  buttonText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 16,
  },
  iconStyle: {
    width: 30,
    height: 50,
  },
  labelStyle: {
    height: 50,
    justifyContent: 'center',
    borderBottomColor: '#efeff2',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  labelStyleLast: {
    height: 50,
    justifyContent: 'center',
    borderBottomColor: 'transparent',
  },
});

module.exports = Overview;
