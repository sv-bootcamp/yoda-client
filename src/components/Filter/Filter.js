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
import CheckBox from '../../utils/CheckBox';
import Dropdown from 'react-native-dropdown-android';
import LinearGradient from 'react-native-linear-gradient';
import Overview from './Overview';
import Text from '../Shared/UniText';
import UserUtil from '../../utils/UserUtil';
import { Actions, Scene, }  from 'react-native-router-flux';
import { CareerData, Options } from '../SignUp/SignUpMETA';

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
      careerData: [],
      checked: [],
      selected: [],
      option: [],
      selectOP: '',
      clearFlag: false,
      options: Options,
      overviewChecked: [],
      needRefresh: true,
    };
    this.state.careerData = CareerData.role.slice();
    this.state.option[0] = CareerData.area.slice();
    this.state.option[1] = [];
    this.state.option[2] = CareerData.years.slice();
    this.state.option[3] = CareerData.education_background.slice();

    let allList = [];
    for (i = 0; i < this.state.careerData.length; i++) {
      for (j = 0; j < this.state.careerData[i].list.length; j++)
        allList.push(this.state.careerData[i].list[j]);
    }

    let all = {
      area: 'All',
      list: allList,
    };

    this.state.careerData.unshift(all);
    this.state.option[1] = this.state.careerData[0].list.slice();

    for (i = 0; i < this.state.option.length; i++) {
      if (i !== 1) {
        this.state.option[i].unshift('All');
        this.state.selected.push(this.state.option[i][0]);
      } else {
        this.state.option[i].unshift('All');
        this.state.selected.push(this.state.option[i][0]);
      }

      this.state.checked.push(true);
    }

    for (i = 0; i < this.state.options.length; i++) {
      this.state.overviewChecked.push(false);
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
    this.setState({ needRefresh: true });

    for (i = 0; i < this.state.checked.length; i++) {
      if (!this.state.checked[i]) {
        Alert.alert('System', 'Please select all');
        return;
      }
    }

    let career = {
      area: this.state.selected[0],
      role: this.state.selected[1],
      years: this.state.selected[2],
      education_background: this.state.selected[3],
    };

    let expertise = [];
    for (i = 0; i < this.state.overviewChecked.length; i++) {
      if (this.state.overviewChecked[i]) {
        expertise.push({
          select: this.state.options[i],
          index: i,
        });
      }
    }

    let body = { career, expertise };

    console.log(body);

    UserUtil.setFilter(this.onUploadCallback.bind(this), body);

  }

  onUploadCallback(result, error) {
    if (error) {
      alert(error);
    } else if (result) {
      console.log(result);
      Actions.pop();
    }
  }

  getOptionList(index) {
    this.state.selectOP = index;
    this.forceUpdate();
    return this.refs['OPTION' + String(index)];
  }

  onSelect(province, idx) {
    if (idx === 0 && province !== this.state.selected[idx]) {
      this.state.checked[1] = false;
      this.state.selected[1] = '';
    }

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

  // Update checkbox state
  updateCheckBox(answerIdx, optionIdx, isFreeForm, isChecked) {
    this.state.overviewChecked[optionIdx] = !this.state.overviewChecked[optionIdx];
    this.forceUpdate();
  }

  getOverviewOptionSet() {
    return this.state.options.map(
        (option, idx) => (
            <CheckBox key={idx}
              iconSize={15}
              iconStyle={styles.iconStyle}
              labelStyle={(idx !== this.state.options.length - 1) ?
              styles.labelStyle : styles.labelStyleLast }
              checked={this.state.overviewChecked[idx]}
              label={this.state.options[idx]}
              optionIdx={idx}
              onUpdate={this.updateCheckBox.bind(this)}
            />
        )
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
            <View style={styles.overViewContainer}>
              <View style={styles.header}>
                <Text allowFontScaling={false} style={styles.subTitleText}>
                  {'Expertise'}
                </Text>
              </View>
              <View style ={styles.body}>
                {this.getOverviewOptionSet()}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: 64,
      },
      android: {
        marginTop: 54,
      },
    }),
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
  overViewContainer: {
    flex: 4,
    padding: 30,
  },
});

module.exports = Filter;
