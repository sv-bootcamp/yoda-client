import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { dimensions } from './Shared/Dimensions';
import Text from './Shared/UniText';

class EditProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fromEditProps = {
      me: this.props.me,
      backButtonImage: leftButtonGrey,
      type: ActionConst.PUSH,
      fromEdit: true,
      rightButtonTextStyle: {
        color: '#44acff',
      },
    };

    return (
      <View style={[styles.container]}>
        <TouchableOpacity style={styles.menu}
          onPress={() => Actions.generalInfo(fromEditProps)}>
          <Text style={styles.menuText}>General information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu}
          onPress={() => Actions.careerInfo(fromEditProps)}>
          <Text style={styles.menuText}>Career background</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu}
          onPress={() => Actions.expertInfo(fromEditProps)}>
          <Text style={styles.menuText}>My expertise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu}
          onPress={() => Actions.personality(fromEditProps)}>
          <Text style={styles.menuText}>My personality</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const leftButtonGrey = require('../resources/icon-arrow-left-grey.png');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    ...Platform.select({
      ios: {
        marginTop: dimensions.heightWeight * 64,
      },
      android: {
        marginTop: dimensions.heightWeight * 54,
      },
    }),
  },
  menu: {
    height: dimensions.heightWeight * 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#efeff2',
  },
  menuText: {
    color: '#2e3031',
    fontSize: dimensions.fontWeight * 14,
    marginLeft: dimensions.widthWeight * 30,
  },
});

module.exports = EditProfile;
