import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '../../utils/CheckBox';
import LinearGradient from 'react-native-linear-gradient';
import Progress from '../Shared/Progress';
import { Actions, Scene, }  from 'react-native-router-flux';
import data from './CareerMETA';

const window = Dimensions.get('window');

class ExpertInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: [
        'Study abroad',
        'Get a new job (e.g., Interview, job search..) ',
        'Portfolio & Resume',
        'Start up',
        'Career change',
        'Networking',
        'Soft skills (e.g., Communication..)',
      ],
      checked: [],
    };

    for (i = 0; i < this.state.options.length; i++) {
      this.state.checked.push(false);
    }

    console.log(this.state.checked);
  }

  // Update checkbox state
  updateCheckBox(answerIdx, optionIdx, isFreeForm, isChecked) {
    this.state.checked[optionIdx] = !this.state.checked[optionIdx];
    this.forceUpdate();
  }

  _getOptionSet() {
    return this.state.options.map(
        (option, idx) => (
            <CheckBox key={idx}
              iconStyle={styles.iconStyle}
              labelStyle={styles.labelStyle}
              checked={this.state.checked[idx]}
              label={this.state.options[idx]}
              optionIdx={idx}
              onUpdate={this.updateCheckBox.bind(this)}
              />
        )
    );
  }

  onUploadCallback() {
    Actions.personality({ me: this.props.me });
  }

  render() {

    return (
      <View style={styles.container}>
        <Progress level={4} step={3} />
        <View style={styles.header}>
          <Text allowFontScaling={false} style={styles.titleText}>
            {'Add all Keywords that\nyou can help others with.'}
          </Text>
          <Text allowFontScaling={false} style={styles.subTitleText}>
            {'We use this information to\nrecommend the most fit advisor.'}
          </Text>
        </View>
        <View style ={styles.body}>
          <ScrollView>
            {this._getOptionSet()}
          </ScrollView>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress = {this.onUploadCallback.bind(this)} >
            <LinearGradient style={styles.btnStyle}
              start={[0.9, 0.5]} end={[0.0, 0.5]} locations={[0, 0.75]}
              colors={['#07e4dd', '#44acff']}>
              <Text style={styles.buttonText}>NEXT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

    </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 64,
      },
      android: {
        marginTop: 54,
      },
    }),
  },
  header: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d6dada',
  },
  body: {
    flex: 3,
    borderTopColor: '#efeff2',
    borderTopWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
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
    fontFamily: 'opensans',
    fontSize: 18,
    textAlign: 'center',
    color: '#2e3031',
  },
  subTitleText: {
    fontFamily: 'opensans',
    fontSize: 12,
    textAlign: 'center',
    color: '#2e3031',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'SFUIText-Bold',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 16,
  },
  iconStyle: {
    width: 50,
    height: 50,
  },
  labelStyle: {
    height: 50,
    justifyContent: 'center',
    borderBottomColor: '#efeff2',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
});

module.exports = ExpertInfo;
