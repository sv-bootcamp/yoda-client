import React, { Component } from 'react';
import {
  Image,
  Picker,
  ScrollView,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import ModalPicker from 'react-native-modal-picker'
import styles from './Styles';

const Item = Picker.Item;

class EduForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      name: this.props.name,
      startYear: this.props.startYear,
      endYear: this.props.endYear,
      subject: this.props.subject,
    };
  }

  render() {
    if (this.state.editMode) {
      return this.renderEdit();
    } else {
      return this.renderView();
    }
  }

  renderEdit() {
    let PickerItems = this.getPickerItems();
    let onChangeName = (text) => this.onChangeName(text);
    let onChangeSubject = (text) => this.onChangeSubject(text);
    let onChangeStartYear = (option) => this.onChangeStartYear(option.label);
    let onChangeEndYear = (option) => this.onChangeEndYear(option.label);
    let toggleEdit = () => this.toggleEdit();

    return (
      <View style={[styles.formEditView, { borderBottomColor: '#a6aeae' }]}>
        <View>
          <TextInput style={[styles.formName, styles.formEditName]}
                     defaultValue={this.state.name}
                     underlineColorAndroid="#a6aeae"
                     placeholder="Name" placeholderTextColor="#a6aeae"
                     onEndEditing={toggleEdit}
                     onChangeText={onChangeName} />
        </View>
        <View>
          <TextInput style={[styles.formName, styles.formEditName]}
                     defaultValue={this.state.subject}
                     underlineColorAndroid="#a6aeae"
                     placeholder="Subject" placeholderTextColor="#a6aeae"
                     onEndEditing={toggleEdit}
                     onChangeText={onChangeSubject} />
        </View>
        <View style={styles.flexR}>
          <ModalPicker
            data={PickerItems}
            initValue={this.state.startYear}
            onChange={onChangeStartYear} />
          <View>
            <Text style={styles.formDate}>{' - '}</Text>
          </View>
          <ModalPicker
            data={PickerItems}
            initValue={this.state.endYear}
            onChange={onChangeEndYear} />
          <TouchableWithoutFeedback onPress={toggleEdit}>
            <View style={{ flex: 1 }}>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  // Get picker items(year for education)
  getPickerItems() {
    let yearList = [];
    let now = new Date();
    for (let i = 1980; i <= now.getFullYear(); i++) {
      yearList.push({ key: i, label: i + '' });
    }

    return yearList.reverse();
  }

  onChangeName(text) {
    this.state.name = text;
    this.props.onChangeText('school', 'name', this.props.id, text);
  }

  onChangeSubject(text) {
    this.state.subject = text;
    this.props.onChangeText('concentration', 'name', this.props.id, text);
  }

  onChangeStartYear(year) {
    this.props.onChangeText('startYear', 'name', this.props.id, year);
    this.setState({
      startYear: year,
      editMode: !this.state.editMode,
    });
  }

  onChangeEndYear(year) {
    this.props.onChangeText('endYear', 'name', this.props.id, year);
    this.setState({
      endYear: year,
      editMode: !this.state.editMode,
    });
  }

  renderView() {
    return (
      <ScrollView
        style={styles.flexR}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.formView}>
          <View style={styles.flexR}>
            <View style={styles.editL}>
              <Text style={styles.formName}>{this.state.name}</Text>
            </View>
            <View style={styles.editR}>
              <TouchableWithoutFeedback onPress={() => this.toggleEdit()}>
                <Image style={styles.editBtn}
                       source={require('../../resources/icon-detail-edit.png')} />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.formNameContainer}>
            <Text style={styles.formName}>{this.state.subject}</Text>
          </View>
          <View style={styles.flexR}>
            <Text style={styles.formDate}>{this.state.startYear}</Text>
            <View>
              <Text style={styles.formDate}>{' - '}</Text>
            </View>
            <Text style={styles.formDate}>{this.state.endYear}</Text>
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

  toggleEdit() {
    this.setState(
      {
        editMode: !this.state.editMode,
      }
    );
  }

}

module.exports = EduForm;
