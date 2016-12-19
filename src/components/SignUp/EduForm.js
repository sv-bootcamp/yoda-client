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

class EduForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      name: this.props.name,
      startYear: this.props.start,
      endYear: this.props.end,
      subject: this.props.subject,
    };
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
    this.props.onChangeText('start_year', 'name', this.props.id, year);
    this.setState({ startYear: year });
  }

  onChangeEndYear(year) {
    this.props.onChangeText('year', 'name', this.props.id, year);
    this.setState({ endYear: year });
  }

  // Get picker items(year for education)
  getPickerItems() {
    const yearList = [];
    const now = new Date();
    for (let i = 1980; i <= now.getFullYear(); i += 1) {
      yearList.push(i + '');
    }

    yearList.reverse();
    return yearList.map(
      (year, idx) => <Item key={idx} label={year} value={year} style={styles.formDate} />
    );
  }

  toggleEdit() {
    this.setState({ editMode: !this.state.editMode });
  }

  renderEdit() {
    const PickerItems = this.getPickerItems();
    const onChangeName = text => this.onChangeName(text);
    const onChangeSubject = text => this.onChangeSubject(text);
    const onChangeStartYear = year => this.onChangeStartYear(year);
    const onChangeEndYear = year => this.onChangeEndYear(year);
    const toggleEdit = () => this.toggleEdit();

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
              defaultValue={this.state.name}
              underlineColorAndroid="rgba(255, 255, 255, 0)"
              placeholder="Name"
              placeholderTextColor="#a6aeae"
              onChangeText={onChangeName}
            />
          </View>
          <View style={styles.formEditBottomLine}>
            <TextInput
              style={[styles.formName, styles.formEditName]}
              defaultValue={this.state.subject}
              underlineColorAndroid="rgba(255, 255, 255, 0)"
              placeholder="Subject"
              placeholderTextColor="#a6aeae"
              onChangeText={onChangeSubject}
            />
          </View>
          <View style={styles.flexR}>
            <Picker
              style={styles.formEditYear}
              selectedValue={this.state.startYear}
              onValueChange={onChangeStartYear}
            >
              {PickerItems}
            </Picker>
            <View style={{ justifyContent: 'center' }}><Text>{'  -  '}</Text></View>
            <Picker
              style={styles.formEditYear}
              selectedValue={this.state.endYear}
              onValueChange={onChangeEndYear}
            >
              {PickerItems}
            </Picker>
            <TouchableOpacity onPress={toggleEdit}>
              <View style={styles.modalCancel}>
                <Text style={styles.doneText}>Close</Text>
              </View>
            </TouchableOpacity>
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
              <Text style={styles.formName}>{this.state.name}</Text>
            </View>
            <View style={styles.editR}>
              <TouchableOpacity onPress={() => this.toggleEdit()}>
                <Image
                  style={styles.editBtn}
                  source={require('../../resources/icon-detail-edit.png')}
                />
              </TouchableOpacity>
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

module.exports = EduForm;
