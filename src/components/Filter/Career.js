import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Option,
  OptionList,
  Select,
  updatePosition
} from '../../utils/dropdown/index';
import Dropdown from 'react-native-dropdown-android';
import LinearGradient from 'react-native-linear-gradient';
import Overview from './Overview';
import Progress from '../Shared/Progress';
import Text from '../Shared/UniText';
import UserUtil from '../../utils/UserUtil';
import { Actions, Scene, }  from 'react-native-router-flux';
import { CareerData } from '../SignUp/SignUpMETA';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        'Area',
        'Role',
        'Years of work experience',
        'Last Educational Background',
      ],
      checked: [],
      selected: [],
      option: [],
      selectOP: '',
      clearFlag: false,
      needRefresh: true,
    };

    this.state.option[0] = CareerData.area;
    this.state.option[1] = [];
    this.state.option[2] = CareerData.years;
    this.state.option[3] = CareerData.education_background;
    for (i = 0; i < this.state.option.length; i++) {
      this.state.checked.push(false);
      this.state.selected.push('');
      this.state.option[i].unshift('All');
    }

    if (Platform.OS === 'android') {
      this.state.option[1] = CareerData.role[0].list;
      this.state.selected[0] = CareerData.area[0];
      this.state.selected[1] = CareerData.role[0].list[0];
      this.state.selected[2] = CareerData.years[0];
      this.state.selected[3] = CareerData.education_background[0];

      this.state.checked[0] = true;
      this.state.checked[1] = true;
      this.state.checked[2] = true;
      this.state.checked[3] = true;
    }

  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      for (idx = 0; idx < this.state.questions.length; idx++) {
        updatePosition(this.refs['SELECT' + idx]);
        updatePosition(this.refs['OPTION' + idx]);
      }
    }

    Actions.refresh({ rightTitle: 'Save', onRight: this.onSave.bind(this) });
  }

  componentWillReceiveProps(props) {
    if (this.state.needRefresh) {
      Actions.refresh({
        rightTitle: 'Save',
        onRight: this.onSave.bind(this),
        onBack: () => {
          this.setState({ needRefresh: true });
          Actions.pop();
        },
      });
      this.setState({ needRefresh: false });
    }
  }

  onSave() {
    Actions.pop();
  }

  getOptionList(index) {
    this.state.selectOP = index;
    this.forceUpdate();
    return this.refs['OPTION' + String(index)];
  }

  onSelect(province, idx) {
    if (idx === 0 && province !== this.state.selected[idx])
      this.state.checked[1] = false;

    this.state.selectOP = idx;
    this.state.selected[idx] = province;
    this.state.checked[idx] = true;

    if (idx === 0) {
      for (i = 0; i < CareerData.role.length; i++) {
        if (CareerData.role[i].area === this.state.selected[0]) {
          this.state.option[1] = CareerData.role[i].list;
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
                    selected={this.state.option[idx].indexOf(this.state.selected[idx])}
                    onChange={(CareerData) => {
                      this.onSelect(CareerData.value, idx);
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
                    value={this.state.selected[idx]}
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

  render() {
    return (
      <View style ={styles.container}>
        <ScrollView>
          <View style={styles.careerBody}>
            {this.getQuestionSet()}
          </View>
          <View style={styles.overviewBody}>
            <Overview/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  careerBody: {
    flex: 2,
    marginLeft: 30,
    marginRight: 30,
    zIndex: 100,
  },
  overviewBody: {
    flex: 1,
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
    fontSize: 18,
    color: '#2e3031',
  },
  subTitleText: {
    fontSize: 12,
    color: '#2e3031',
    marginTop: 10,
  },
  questionText: {
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
});

module.exports = Filter;
