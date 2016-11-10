import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Select,
  Option,
  OptionList,
  updatePosition
} from '../../utils/dropdown/index';
import Dropdown from 'react-native-dropdown-android';
import LinearGradient from 'react-native-linear-gradient';
import Progress from '../Shared/Progress';
import { Actions, Scene, }  from 'react-native-router-flux';
import data from './CareerMETA';

class CareerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        'What area do you work in?',
        'What roles do you work in?',
        'Years of work experience',
        'Last Educational Background?',
      ],
      selected: ['', '', '', ''],
      option: ['', '', '', ''],
      selectOP: '',
      clearFlag: false,
    };

    this.state.option[0] = data.area;
    this.state.option[1] = [];
    this.state.option[2] = data.years;
    this.state.option[3] = data.education_background;
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      for (idx = 0; idx < this.state.questions.length; idx++) {
        updatePosition(this.refs['SELECT' + idx]);
        updatePosition(this.refs['OPTION' + idx]);
      }
    }
  }

  getOptionList(index) {
    this.state.selectOP = index;
    this.forceUpdate();
    return this.refs['OPTION' + String(index)];
  }

  onSelect(province, idx) {
    this.state.selectOP = idx;
    this.state.selected[idx] = province;

    if (idx === 0) {
      for (i = 0; i < data.role.length; i++) {
        if (data.role[i].area === this.state.selected[0]) {
          this.state.option[1] = data.role[i].list;
          this.state.clearFlag = true;
          break;
        }
      }
    }

    this.forceUpdate();
  }

  getOptionSet(index) {
    return this.state.option[index].map(
      (area, idx) => <Option key={idx}>{area}</Option>
    );
  }

  getQuestionSet() {
    return this.state.questions.map(
        (question, idx) => {
          let clear = false;
          let zIdx = (this.state.selectOP === idx)  ? 200 : 100;
          let activate = (this.state.selected[0] === '' && idx === 1) ? false : true;
          if (this.state.clearFlag && idx === 1) {
            this.state.clearFlag = false;
            clear = true;
          }

          if (Platform.OS === 'android') {
            return (
              <View key={idx} style={[styles.questionContainer, { zIndex: zIdx }]}>
                <Text style={styles.questionText}>{this.state.questions[idx]}</Text>
                <View key={idx} style={[styles.dropdownContainerAndroid]}>
                  <Dropdown
                    style={{ height: 40, width: Dimensions.get('window').width - 60 }}
                    values={this.state.option[idx]}
                    onChange={(data) => {
                      this.onSelect(data.value, idx);
                    }}/>

                </View>
              </View>
              );
          } else {
            return (
              <View key={idx} style={[styles.questionContainer, { zIndex: zIdx }]}>
                <Text style={styles.questionText}>{this.state.questions[idx]}</Text>
                <View style={[styles.dropdownContainer]}>
                  <Select
                    ref={'SELECT' + idx}
                    clear={clear}
                    activate={activate}
                    index={idx}
                    width={Dimensions.get('window').width - 60}
                    defaultValue={' '}
                    optionListRef={this.getOptionList.bind(this)}
                    onSelect={this.onSelect.bind(this)}>
                    {this.getOptionSet(idx)}
                    </Select>
                    <OptionList ref={'OPTION' + idx} index={idx}/>
                </View>
              </View>
            );
          }
        }
      );
  }

  onUploadCallback() {
    Actions.expertInfo({ me: this.props.me });
  }

  render() {
    return (
      <View style ={styles.container}>
        <Progress level={4} step={2} />
        <ScrollView contentContainerStyle ={styles.scrollViewcontainer}>
          <View style={styles.header}>
            <Text style={styles.titleText}>What do you do?</Text>
            <Text style={styles.subTitleText}>Let us know your career background.</Text>
          </View>
          <View style={styles.body}>
            {this.getQuestionSet()}
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress = {this.onUploadCallback.bind(this)}>
              <LinearGradient style={styles.btnStyle}
                start={[0.9, 0.5]} end={[0.0, 0.5]} locations={[0, 0.75]}
                colors={['#07e4dd', '#44acff']}>
                <Text style={styles.buttonText}>NEXT</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollViewcontainer: {
    flex: 1,
  },
  header: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d6dada',
  },
  body: {
    flex: 4,
    marginLeft: 30,
    marginRight: 30,
    zIndex: 100,
  },
  questionContainer: {
    marginBottom: 20,
  },
  dropdownContainer: {
    marginTop: 10,
  },
  dropdownContainerAndroid: {
    marginTop: 10,
    borderColor: '#efeff2',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 2,
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
    color: '#2e3031',
  },
  subTitleText: {
    fontFamily: 'opensans',
    fontSize: 12,
    color: '#2e3031',
    marginTop: 10,
  },
  questionText: {
    fontFamily: 'opensans',
    fontSize: 12,
    color: '#a6aeae',
    fontWeight: 'bold',
  },
  buttonText: {
    fontFamily: 'SFUIText-Bold',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 16,
  },
});

module.exports = CareerInfo;
