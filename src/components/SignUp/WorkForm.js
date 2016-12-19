import React, { Component } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from './Styles';
import Text from '../Shared/UniText';

class WorkForm extends Component {
  constructor(props) {
    super(props);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    this.state = {
      editMode: false,
      employer: this.props.employer,
      position: this.props.position,
      start: this.props.start || (year - 3) + '-' + month + '-' + date,
      end: this.props.end || 'present',
    };
  }

  onChangePosition(text) {
    this.state.position = text;
    this.props.onChangeText('position', 'name', this.props.id, text);
  }

  onChangeName(text) {
    this.state.employer = text;
    this.props.onChangeText('employer', 'name', this.props.id, text);
  }

  onStartDateChange(date) {
    this.state.start = date;
    this.props.onChangeText('start_date', null, this.props.id, date);
    this.setState({ start: date });
  }

  onEndDateChange(date) {
    this.state.end = date;
    this.props.onChangeText('end_date', null, this.props.id, date);
    this.setState({ end: date });
  }

  toggleEdit() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  renderEdit() {
    const onChangePosition = text => this.onChangePosition(text);
    const onChangeName = text => this.onChangeName(text);
    const onStartDateChange = date => this.onStartDateChange(date);
    const onEndDateChange = date => this.onEndDateChange(date);

    return (
      <Modal
        animationType={'fade'}
        transparent
        visible
        onRequestClose={() => { Alert.alert('Profile', 'Modal has been closed.'); }}
      >
        <View style={styles.modalPadding} />
        <View style={styles.formEditView}>
          <View style={styles.formEditBottomLine}>
            <TextInput
              style={[styles.formName, styles.formEditName]}
              defaultValue={this.state.position}
              underlineColorAndroid="#a6aeae"
              placeholder="Position" placeholderTextColor="#a6aeae"
              onChangeText={onChangePosition}
            />
          </View>
          <View style={styles.formEditBottomLine}>
            <TextInput
              style={[styles.formName, styles.formEditName]}
              defaultValue={this.state.employer}
              underlineColorAndroid="#a6aeae"
              placeholder="Name" placeholderTextColor="#a6aeae"
              onChangeText={onChangeName}
            />
          </View>
          <View style={styles.flexR}>
            <DatePicker
              style={{ width: 100 }}
              date={this.state.start}
              showIcon={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{ dateInput: styles.formEditDate }}
              onDateChange={onStartDateChange}
            />
            <View style={{ marginTop: 10, marginRight: 25 }}>
              <Text>{'-'}</Text>
            </View>
            <DatePicker
              style={{ width: 100 }}
              date={this.state.end}
              showIcon={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{ dateInput: styles.formEditDate }}
              onDateChange={onEndDateChange}
            />
            <TouchableWithoutFeedback onPress={() => this.toggleEdit()}>
              <View style={styles.modalCancel}>
                <Text style={styles.doneText}>Close</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.modalPadding} />
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
          <View>
            <Text style={styles.formDate}>
              {this.state.start + ' - ' + this.state.end}
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
