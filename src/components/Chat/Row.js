import React, { Component } from 'react';
import {
  BackAndroid,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { dimensions } from '../Shared/Dimensions';
import moment from 'moment/min/moment.min';
import Text from '../Shared/UniText';

export default class Row extends Component {
  constructor(props) {
    super(props);

    if (props.dataSource.members[0].userId == props.myId) {
      this.me = props.dataSource.members[0];
      this.opponent = props.dataSource.members[1];
    } else {
      this.me = props.dataSource.members[1];
      this.opponent = props.dataSource.members[0];
    }

    this.goToChat = this.goToChat.bind(this);
    this.state = {
      channel: props.dataSource,
      me: this.me,
      opponent: this.opponent,
      lastMessageInfo: props.dataSource.lastMessage,
      unreadCount: props.dataSource.unreadMessageCount,
    };
  }

  componentWillReceiveProps(props) {
    if (props.dataSource.members[0].userId == props.myId) {
      this.me = props.dataSource.members[0];
      this.opponent = props.dataSource.members[1];
    } else {
      this.me = props.dataSource.members[1];
      this.opponent = props.dataSource.members[0];
    }

    this.setState({
      channel: props.dataSource,
      me: this.me,
      opponent: this.opponent,
      lastMessageInfo: props.dataSource.lastMessage,
      unreadCount: props.dataSource.unreadMessageCount,
    });
  }

  goToChat() {
    Actions.chatPage({
      title: this.state.opponent.nickname,
      me: this.state.me,
      opponent: this.state.opponent,
    });
  }

  renderUnreadCount() {
    if (this.state.unreadCount != 0) {
      return (
        <View style={styles.unreadCountContainer}>
          <Text style={styles.unreadCountText}>
            {this.state.unreadCount}
          </Text>
        </View>
      );
    }

    return null;
  }

  getTimestamp() {
    if (this.state.lastMessageInfo) {
      const createdAt = this.state.lastMessageInfo.createdAt;
      return moment(Date.now()).startOf('day').isSame(moment(createdAt).startOf('day')) ?
        moment(createdAt).format('LT') :
        moment(createdAt).format('MMM DD');
    }
  }

  render() {
    return (
      <TouchableHighlight underlayColor='lightgray' onPress={this.goToChat}>
        <View style={styles.row}>
          <Image style={styles.photo}
            source={{ uri: this.state.opponent.profileUrl }}/>
          <View style={styles.userInformation}>
            <View style={styles.leftSection}>
              <Text style={styles.name}>
                {this.state.opponent.nickname}
              </Text>
              <Text ellipsizeMode={'tail'} numberOfLines = {1}  style={styles.lastMessage}>
                {this.state.lastMessageInfo ? this.state.lastMessageInfo.message : ''}
              </Text>
            </View>
            <View style={styles.rightSection}>
              <View style={styles.rightTopSection}>
                <Text style={styles.lastTimestamp}>
                  {this.getTimestamp()}
                </Text>
                <Image
                  style={styles.onboardingImage}
                  source={require('../../resources/indicator_right.png')}
                />
              </View>
              {this.renderUnreadCount()}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  photo: {
    height: dimensions.fontWeight * 40,
    width: dimensions.fontWeight * 40,
    marginTop: dimensions.heightWeight * 15,
    marginBottom: dimensions.heightWeight * 15,
    marginLeft: dimensions.widthWeight * 15,
    marginRight: dimensions.widthWeight * 15,
    borderRadius: dimensions.fontWeight * 20,
  },
  userInformation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#f0f0f2',
  },

  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  name: {
    fontSize: dimensions.fontWeight * 14,
    fontWeight: 'bold',
    marginTop: dimensions.heightWeight * 18,
    color: '#494b4c',
  },
  lastMessage: {
    fontSize: dimensions.fontWeight * 12,
    marginTop: dimensions.heightWeight * 8,
    marginBottom: dimensions.heightWeight * 18,
    fontWeight: 'normal',
    color: '#a6aeae',
  },
  rightSection: {
    width: dimensions.widthWeight * 90,
    alignItems: 'flex-end',
    paddingRight: dimensions.widthWeight * 15,
  },
  rightTopSection: {
    marginTop: dimensions.heightWeight * 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastTimestamp: {
    fontSize: dimensions.fontWeight * 10,
    fontWeight: 'normal',
    color: '#a6aeae',
  },
  unreadCountContainer: {
    width: dimensions.widthWeight * 31,
    height: dimensions.heightWeight * 20,
    marginTop: dimensions.heightWeight * 17,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fd5b52',
  },
  unreadCountText: {
    fontSize: dimensions.fontWeight * 12,
    color: '#ffffff',
    letterSpacing: -0.3,
    backgroundColor: 'transparent',
  },
  onboardingImage: {
    width: dimensions.widthWeight * 8,
    height: dimensions.heightWeight * 13,
    marginLeft: dimensions.widthWeight * 10,
    resizeMode: 'contain',
  },
});
