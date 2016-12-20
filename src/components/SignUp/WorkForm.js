import React, { Component } from 'react';
import {
  Alert,
  Image,
  Modal,
  Picker,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './Styles';
import Text from '../Shared/UniText';

const Item = Picker.Item;

class WorkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      employer: this.props.employer,
      position: this.props.position,
      startDate: this.getYearMonth(this.props.start),
      endDate: this.getYearMonth(this.props.end),
    };
  }

  getYearMonth(data) {
    let result = {
      year: '',
      month: '',
    };

    if (!data) {
      return result;
    }

    const dateInfo = data.split('-');
    result.year = dateInfo[0] || '0000';
    result.month = dateInfo[1] || '00';
    return result;
  }

  onChangePosition(text) {
    this.state.position = text;
    this.props.onChangeText('position', 'name', this.props.id, text);
  }

  onChangeName(text) {
    this.state.employer = text;
    this.props.onChangeText('employer', 'name', this.props.id, text);
  }

  onChangeStartYear(year) {
    const date = year + '-' + this.state.startDate.month;
    this.props.onChangeText('start_date', '', this.props.id, year);
    this.state.startDate.year = year;
    this.setState({});
  }

  onChangeStartMonth(month) {
    const monthStr = month.length === 1 ? '0' + month : month;
    const date = this.state.startDate.year + '-' + monthStr;
    this.props.onChangeText('start_date', '', this.props.id, date);
    this.state.startDate.month = monthStr;
    this.setState({});
  }

  onChangeEndYear(year) {
    const date = year + '-' + this.state.endDate.month;
    this.props.onChangeText('end_date', '', this.props.id, year);
    this.state.endDate.year = year;
    this.setState({});
  }

  onChangeEndMonth(month) {
    const monthStr = month.length === 1 ? '0' + month : month;
    const date = this.state.endDate.year + '-' + monthStr;
    this.props.onChangeText('end_date', '', this.props.id, date);
    this.state.endDate.month = monthStr;
    this.setState({});
  }

  // Get picker items(year for education)
  getPickerYearItems() {
    const yearList = [];
    const now = new Date();
    for (let i = 1950; i <= now.getFullYear(); i += 1) {
      yearList.push(i + '');
    }

    yearList.reverse();
    return yearList.map(
      (year, idx) => <Item key={idx} label={year} value={year} style={styles.formDate} />
    );
  }

  getPickerMonthItems() {
    const monthList = [];
    for (let i = 1; i <= 12; i += 1) {
      monthList.push(i + '');
    }

    return monthList.map(
      (month, idx) => <Item key={idx} label={month} value={month} style={styles.formDate} />
    );
  }

  toggleEdit() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  renderEdit() {
    const PickerYearItems = this.getPickerYearItems();
    const PickerMonthItems = this.getPickerMonthItems();
    const onChangePosition = text => this.onChangePosition(text);
    const onChangeName = text => this.onChangeName(text);
    const onChangeStartYear = year => this.onChangeStartYear(year);
    const onChangeStartMonth = month => this.onChangeStartMonth(month);
    const onChangeEndYear = year => this.onChangeEndYear(year);
    const onChangeEndMonth = month => this.onChangeEndMonth(month);
    const toggleEdit = () => this.toggleEdit();

    return (
      <Modal
        animationType={'fade'}
        transparent
        visible
        onRequestClose={toggleEdit}
      >
        <View style={styles.modalContainer}>
          <View style={styles.formEditView}>
            <View style={styles.formEditBottomLine}>
              <TextInput
                style={[styles.formName, styles.formEditName]}
                defaultValue={this.state.position}
                underlineColorAndroid="rgba(255, 255, 255, 0)"
                placeholder="Position"
                placeholderTextColor="#ddd"
                onChangeText={onChangePosition}
              />
            </View>
            <View style={styles.formEditBottomLine}>
              <TextInput
                style={[styles.formName, styles.formEditName]}
                defaultValue={this.state.employer}
                underlineColorAndroid="rgba(255, 255, 255, 0)"
                placeholder="Company name"
                placeholderTextColor="#ddd"
                onChangeText={onChangeName}
              />
            </View>
            <View style={styles.flexR}>
              <Picker
                style={styles.formEditYear}
                selectedValue={this.state.startDate.year}
                onValueChange={onChangeStartYear}
              >
                {PickerYearItems}
              </Picker>
              <Picker
                style={styles.formEditYear}
                selectedValue={this.state.startDate.month.replace('0', '')}
                onValueChange={onChangeStartMonth}
              >
                {PickerMonthItems}
              </Picker>
            </View>
            <View style={styles.flexR}>
              <Picker
                style={styles.formEditYear}
                selectedValue={this.state.endDate.year}
                onValueChange={onChangeEndYear}
              >
                {PickerYearItems}
              </Picker>
              <Picker
                style={styles.formEditYear}
                selectedValue={this.state.endDate.month.replace('0', '')}
                onValueChange={onChangeEndMonth}
              >
                {PickerMonthItems}
              </Picker>
            </View>
            <View style={[styles.flexR, { marginTop: 15, justifyContent: 'flex-end' }]}>
              <TouchableOpacity onPress={toggleEdit}>
                <Text style={[styles.doneText, { color: '#BEBEBE' }]}>Close</Text>
              </TouchableOpacity>
              <Text>          </Text>
              <TouchableOpacity onPress={toggleEdit}>
                <Text style={styles.doneText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderView() {
    return (
      <ScrollView
        style={styles.flexR}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.formView}>
          <View style={styles.flexR}>
            <View style={styles.editL}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.formName}
              >
                {this.state.position}
              </Text>
              <Text
                numberOfLines={1}
                style={styles.formName}
              >
                {this.state.employer}
              </Text>
            </View>
            <View style={styles.editR}>
              <TouchableWithoutFeedback onPress={() => this.toggleEdit()}>
                <Image
                  style={styles.editBtn}
                  source={require('../../resources/icon-detail-edit.png')}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.flexR}>
            <Text style={styles.formDate}>
              {this.state.startDate.year + '-' + this.state.startDate.month}
            </Text>
            <View>
              <Text style={styles.formDate}>{' ~ '}</Text>
            </View>
            <Text style={styles.formDate}>
              {this.state.endDate.year + '-' + this.state.endDate.month}
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => this.props.onDelete(this.props.id)}>
          <View style={styles.deleteView}>
            <Text style={styles.deleteText}>Delete</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }

  render() {
    if (this.state.editMode) {
      return (
        <View>
          { this.renderView() }
          { this.renderEdit() }
        </View>
      );
    }

    return this.renderView();
  }
}

module.exports = WorkForm;
